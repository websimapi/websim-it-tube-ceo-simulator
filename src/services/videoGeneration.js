import { queueAIRequest } from '../utils/aiQueue.js';
import { VIDEOS, VIDEO_TYPES } from '../data/content.js';

// NOTE: requestQueue internal check is difficult here as it's inside aiQueue.js and not exported.
// We can assume if queueAIRequest is called, it handles queuing.
// However, the original logic skipped AI if queue was backed up. 
// Ideally we would export queue length getter from aiQueue.js but for now we'll skip that check 
// or implement a simple try/catch fallback strategy.

export async function generateVideo(trend, mood) {
    // 40% chance to attempt AI generation for unique variety
    if (Math.random() < 0.4) {
        try {
            return await generateAIVideo(trend, mood);
        } catch (e) {
            console.warn("AI generation failed or timed out, using static generator.", e);
        }
    }
    return generateStaticVideo(trend);
}

// Function to call the LLM for unique video ideas
async function generateAIVideo(trend, mood) {
    const examples = VIDEOS.sort(() => 0.5 - Math.random()).slice(0, 3);

    const systemPrompt = `You are the chaotic engine of "It Tube", a satirical video platform.
    Generate a SINGLE unique, funny, weird, or cursed video card object in JSON format.

    Context:
    - Current Platform Trend: ${trend || "Random"}
    - Current Algorithm Mood: ${mood || "NEUTRAL"}

    Style Guide:
    - Titles should be clickbaity, absurd, or screaming.
    - Creators should have stereotypical username handles.
    - Types must be one of: ${VIDEO_TYPES.join(', ')}.
    - Risk is 0-100 (0 = safe/boring, 100 = illegal/dangerous/cursed).
    - Views can be "12", "15M", "3.2B", etc.

    Reference Examples:
    ${JSON.stringify(examples.map(e => ({ title: e.title, creator: e.creator, type: e.type, risk: e.risk })))}

    Output ONLY valid JSON matching this schema:
    {
        "title": "string",
        "views": "string",
        "creator": "string",
        "type": "string",
        "risk": number
    }`;

    const completion = await queueAIRequest(() => window.websim.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
        ],
        json: true
    }));

    const data = JSON.parse(completion.content);

    // Hydrate the rest of the object
    const isTrending = Math.random() > 0.7;
    let title = data.title;

    if (trend && isTrending && !title.toLowerCase().includes(trend.toLowerCase())) {
         title = `[${trend.toUpperCase()}] ${title}`;
    }

    // Generate Thumbnail Image
    let thumbnailUrl = null;
    try {
        const imageResult = await queueAIRequest(() => window.websim.imageGen({
            prompt: `YouTube video thumbnail for "${title}" by ${data.creator}, style: ${data.type}, chaotic, vibrant, 4k, trending on artstation`,
            aspect_ratio: "16:9"
        }));
        thumbnailUrl = imageResult.url;
    } catch (e) {
        console.warn("AI Image gen failed:", e);
    }

    return {
        id: Math.random().toString(36).substr(2, 9),
        title: title,
        views: data.views || "0",
        creator: data.creator || "Anon",
        thumbnailColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
        thumbnailUrl: thumbnailUrl,
        type: VIDEO_TYPES.includes(data.type) ? data.type : "meme",
        risk: typeof data.risk === 'number' ? data.risk : 50,
        revenue: Math.floor(Math.random() * 50) + 10,
        isTrending: isTrending,
        isAI: true // Marker for UI if we want to show it
    };
}

export function generateStaticVideo(trend) {
    const base = VIDEOS[Math.floor(Math.random() * VIDEOS.length)];
    const isTrending = Math.random() > 0.7;

    let title = base.title;
    if (trend && isTrending) {
        title = `[${trend.toUpperCase()}] ${title}`;
    }

    return {
        id: Math.random().toString(36).substr(2, 9),
        title: title,
        views: base.views,
        creator: base.creator,
        thumbnailColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
        thumbnailUrl: null,
        type: base.type,
        risk: base.risk, // 0-100 likelihood of being "cursed" or harmful
        revenue: Math.floor(Math.random() * 50) + 10,
        isTrending: isTrending,
        isAI: false
    };
}