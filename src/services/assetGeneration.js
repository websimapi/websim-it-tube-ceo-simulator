import { queueAIRequest } from '../utils/aiQueue.js';
import { VOICES } from '../voices.js';

// Helper to fully enrich a video with assets (audio, layers) for playback
export async function enrichVideoWithAssets(video) {
    // If already enriched, return
    if (video.assets) return video;

    const assets = {
        script: "",
        audioUrl: null,
        subjectUrl: null,
        bgUrl: video.thumbnailUrl // Default to thumbnail
    };

    try {
        // 1. Select Voice and Generate Script
        const voiceOptions = VOICES.filter(v => v.type === 'default').map(v => `"${v.name}"`).join(', ');

        const completion = await queueAIRequest(() => window.websim.chat.completions.create({
            messages: [
                 { 
                     role: "system", 
                     content: `You are generating assets for a parody YouTube video.
                     1. Write a chaotic, 1-sentence opening line for a YouTuber intro. BE SHORT, HIGH ENERGY.
                     2. Select the best matching voice name for this creator from: ${voiceOptions}.
                     
                     Respond in JSON only:
                     {
                        "script": "string",
                        "voiceName": "string"
                     }` 
                 },
                 { role: "user", content: `Video Title: ${video.title}, Creator: ${video.creator}, Type: ${video.type}` }
            ],
            json: true
        }));

        const result = JSON.parse(completion.content);
        assets.script = result.script;

        // Find the voice ID based on the name selected by AI
        const selectedVoice = VOICES.find(v => v.name === result.voiceName) || VOICES[0];
        
        console.log(`AI selected voice: ${selectedVoice.name} for ${video.creator}`);

        // 2. Generate TTS & Upload
        const tts = await queueAIRequest(() => window.websim.textToSpeech({
            text: assets.script,
            voice: selectedVoice.voice_id
        }));
        
        // Upload logic
        const ttsResponse = await fetch(tts.url);
        const ttsBlob = await ttsResponse.blob();
        assets.audioUrl = await window.websim.upload(ttsBlob);

        // 3. Generate Transparent Asset (Layer)
        const imgPrompt = `A single high quality sticker cutout element related to "${video.title}". Isolated on empty background, transparent background, png style.`;
        
        const imgRes = await queueAIRequest(() => window.websim.imageGen({
            prompt: imgPrompt,
            transparent: true,
            aspect_ratio: "1:1"
        }));
        
        // Upload logic
        const imgResponse = await fetch(imgRes.url);
        const imgBlob = await imgResponse.blob();
        assets.subjectUrl = await window.websim.upload(imgBlob);

        // 4. Generate Background if none exists
        if (!assets.bgUrl) {
             const bgRes = await queueAIRequest(() => window.websim.imageGen({
                prompt: `Abstract distorted video background for "${video.title}", dark, digital noise, 4k`,
                aspect_ratio: "16:9"
            }));
            assets.bgUrl = bgRes.url;
        }
        
    } catch (e) {
        console.error("Asset Gen Failed", e);
    }

    return { ...video, assets };
}