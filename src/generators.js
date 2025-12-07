// Utilities for generating chaos

// --- AI Rate Limiter Queue ---
const requestQueue = [];
let isProcessingQueue = false;

const processQueue = async () => {
    if (isProcessingQueue || requestQueue.length === 0) return;
    isProcessingQueue = true;
    
    const { task, resolve, reject } = requestQueue.shift();
    
    try {
        const result = await task();
        resolve(result);
    } catch (e) {
        reject(e);
    }
    
    // Cooldown: 4 seconds between requests to prevent server overload
    setTimeout(() => {
        isProcessingQueue = false;
        processQueue();
    }, 4000);
};

// Wrapper to push tasks to queue
const queueAIRequest = (task) => {
    return new Promise((resolve, reject) => {
        requestQueue.push({ task, resolve, reject });
        processQueue();
    });
};

export const VIDEOS = [
    { title: "I ATE A 50LB GUMMY BEAR", views: "1.2M", creator: "SugarRush", type: "prank", risk: 20 },
    { title: "Teaching my cat Quantum Physics", views: "402", creator: "ProfessorPaws", type: "education", risk: 5 },
    { title: "ASMR: Screaming into a jar", views: "500k", creator: "QuietPls", type: "asmr", risk: 10 },
    { title: "Is the Earth actually a Donut?", views: "8.9M", creator: "TruthSeeker", type: "conspiracy", risk: 80 },
    { title: "HOW TO GET FREE MONEY (REAL)", views: "50", creator: "TotallyLegit", type: "scam", risk: 95 },
    { title: "Unboxing a Radioactive Rock", views: "2M", creator: "GlowBoy", type: "science", risk: 70 },
    { title: "Reacting to Reacting to Reactions", views: "300k", creator: "MetaMike", type: "reaction", risk: 10 },
    { title: "10 Hours of silence broken by a horn", views: "4M", creator: "TrollKing", type: "meme", risk: 30 },
    // Expanded Content
    { title: "24 HOURS in a HAUNTED IKEA (GONE WRONG)", views: "5.2M", creator: "NightOwl", type: "prank", risk: 45 },
    { title: "I built a house out of ramen noodles", views: "800k", creator: "CraftyCarl", type: "science", risk: 25 },
    { title: "Calling AMONG US IMPOSTOR at 3AM!!", views: "9M", creator: "SusGuy", type: "prank", risk: 30 },
    { title: "Why birds are government drones", views: "1.5M", creator: "WokeWalker", type: "conspiracy", risk: 75 },
    { title: "FREE ROBUX GENERATOR 2024 NO VIRUS", views: "120", creator: "ScamBot_X", type: "scam", risk: 99 },
    { title: "Hydraulic Press vs. My Dignity", views: "10M", creator: "CrushIt", type: "science", risk: 15 },
    { title: "ASMR: Aggressive Lettuce Eating", views: "200k", creator: "CronchQueen", type: "asmr", risk: 5 },
    { title: "Top 10 Numbers from 1 to 10", views: "5M", creator: "ListicleLarry", type: "education", risk: 0 },
    { title: "I mailed myself to Antarctica", views: "3.4M", creator: "BoxTraveler", type: "prank", risk: 60 },
    { title: "The MOON is a HOLOGRAM projection", views: "400k", creator: "SkyWatcher", type: "conspiracy", risk: 85 },
    { title: "Reacting to my own birth video", views: "1M", creator: "CringeMaster", type: "reaction", risk: 40 },
    { title: "Cooking steak in a toaster", views: "600k", creator: "ChefDisaster", type: "education", risk: 50 },
    { title: "DIY Nuclear Reactor (Tutorial)", views: "12k", creator: "AtomAdam", type: "science", risk: 90 },
    { title: "Investing in imaginary currency", views: "50k", creator: "CryptoKing", type: "scam", risk: 80 },
    { title: "ASMR: Nails on Chalkboard (10 Hours)", views: "1M", creator: "SoundSatan", type: "asmr", risk: 20 },
    { title: "Trying to pause an online game", views: "3M", creator: "AngryMom", type: "meme", risk: 10 },
    { title: "I turned my car into a pool", views: "7M", creator: "AutoAqua", type: "prank", risk: 55 },
    { title: "Aliens built the pyramids for storage", views: "2.2M", creator: "HistoryHacker", type: "conspiracy", risk: 65 },
    { title: "Send me $5 get $5000 back instantly", views: "10", creator: "PrinceWealth", type: "scam", risk: 100 },
    { title: "Mixing every chemical under my sink", views: "500k", creator: "ChemChaos", type: "science", risk: 95 },
    { title: "Try Not To Laugh (IMPOSSIBLE)", views: "15M", creator: "LaughFactory", type: "reaction", risk: 10 },
    { title: "Shrek but every word is 'Somebody'", views: "8M", creator: "MemeMachine", type: "meme", risk: 5 },
    { title: "Teaching goldfish to play soccer", views: "100k", creator: "AquaTrainer", type: "education", risk: 10 },
    { title: "I lived in a grocery store for a week", views: "4M", creator: "ShelfLife", type: "prank", risk: 40 },
    { title: "The color BLUE doesn't exist", views: "900k", creator: "SpectrumDenier", type: "conspiracy", risk: 70 },
    { title: "Download more RAM tutorial", views: "20M", creator: "OldWeb", type: "scam", risk: 60 },
    { title: "Will it Blend? - My iPhone", views: "6M", creator: "BlenderGuy", type: "science", risk: 30 },
    { title: "Reacting to paint drying", views: "50k", creator: "BoredReactor", type: "reaction", risk: 5 },
    { title: "Wide Putin Walking 10H", views: "11M", creator: "WideBoi", type: "meme", risk: 15 },
    { title: "Learning C++ in 3 minutes", views: "200k", creator: "CodeSpeed", type: "education", risk: 25 },
    { title: "Pranking the Police (JAIL VLOG)", views: "2M", creator: "BadIdeas", type: "prank", risk: 90 },
    { title: "Water is actually liquid ghost ectoplasm", views: "300k", creator: "HydroParanormal", type: "conspiracy", risk: 80 },
    { title: "Click here to claim your free yacht", views: "5", creator: "PhishNet", type: "scam", risk: 95 },
    { title: "Microscope view of a hot dog", views: "1.1M", creator: "MicroZoom", type: "science", risk: 10 },
    { title: "ASMR: Sticky Tape Unrolling", views: "700k", creator: "StickySound", type: "asmr", risk: 5 },
    { title: "Reacting to 'Taking a Break' videos", views: "500k", creator: "DramaAlert", type: "reaction", risk: 35 },
    { title: "Bee Movie but it speeds up every time", views: "3M", creator: "BeeLover", type: "meme", risk: 10 },
    { title: "How to breathe (Advanced Tutorial)", views: "10M", creator: "LifeHax", type: "education", risk: 0 },
    { title: "Spending $1,000,000 in 1 minute", views: "25M", creator: "MrWealthy", type: "prank", risk: 10 },
    { title: "The Internet is a simulation inside a simulation", views: "666k", creator: "MatrixMorpheus", type: "conspiracy", risk: 85 },
    { title: "Nigerian Prince needs YOUR help", views: "20", creator: "RoyalMail", type: "scam", risk: 90 },
    { title: "What happens if you microwave a microwave?", views: "4M", creator: "WaveMaster", type: "science", risk: 80 },
    { title: "ASMR: Roleplay - Mean Nurse", views: "800k", creator: "TingleDoc", type: "asmr", risk: 15 },
    { title: "First person to blink loses $10k", views: "1M", creator: "StareDown", type: "reaction", risk: 20 },
    { title: "Cat vibrating to techno music", views: "12M", creator: "VibeCat", type: "meme", risk: 5 },
    { title: "History of the paperclip", views: "50k", creator: "BoringDocs", type: "education", risk: 0 },
    { title: "I filled my swimming pool with Jell-O", views: "6M", creator: "Gelatinous", type: "prank", risk: 30 },
    { title: "Pigeons are surveillance cameras", views: "1.8M", creator: "BirdWatcher", type: "conspiracy", risk: 60 },
    { title: "Win a free iPhone 15 (Legit)", views: "100", creator: "AppleFan_99", type: "scam", risk: 85 },
    { title: "Growing a chicken in an egg without a shell", views: "15M", creator: "BioHacker", type: "science", risk: 40 },
    { title: "ASMR: Kinetic Sand Slicing", views: "2M", creator: "SandMan", type: "asmr", risk: 5 },
    { title: "Reacting to my hater's apology video", views: "900k", creator: "CloutChaser", type: "reaction", risk: 50 },
    { title: "Gnome meme 10 hours", views: "500k", creator: "Gnomed", type: "meme", risk: 10 },
    { title: "Speedrunning Wikipedia", views: "300k", creator: "WikiRacer", type: "education", risk: 5 },
    { title: "I survived 50 hours in VR", views: "2M", creator: "VirtualVince", type: "prank", risk: 35 },
    { title: "Oxygen is slowly killing us", views: "1.2M", creator: "BreathTruther", type: "conspiracy", risk: 55 },
    { title: "Crypto Doubler! Send ETH get 2x", views: "15", creator: "EthGiver", type: "scam", risk: 98 },
    { title: "Launching a toy rocket into space", views: "700k", creator: "RocketKid", type: "science", risk: 45 },
    { title: "ASMR: Ear Cleaning (Deep)", views: "1.5M", creator: "WaxRemover", type: "asmr", risk: 20 },
    { title: "Reacting to scary videos in the dark", views: "3M", creator: "ScaredyCat", type: "reaction", risk: 25 },
    { title: "Stonks Guy 3D Animation", views: "4M", creator: "MemeAnimator", type: "meme", risk: 10 },
    { title: "How to tie your shoes (Loop)", views: "100k", creator: "KnotMaster", type: "education", risk: 0 },
    { title: "Sneaking into a movie theater as a chair", views: "5M", creator: "StealthOps", type: "prank", risk: 70 },
    { title: "Australia doesn't exist", views: "800k", creator: "FlatEarther2", type: "conspiracy", risk: 90 },
    { title: "Free Gift Card Generator", views: "50", creator: "GiftBot", type: "scam", risk: 95 },
    { title: "Making a diamond from peanut butter", views: "3M", creator: "PressureCooker", type: "science", risk: 50 },
    { title: "ASMR: Whispering secret codes", views: "400k", creator: "SpyWhisper", type: "asmr", risk: 30 },
    { title: "Reacting to compilation of people falling", views: "10M", creator: "FailArmyReacts", type: "reaction", risk: 15 },
    { title: "Coffin Dance Astronomia 8-bit", views: "20M", creator: "PixelMeme", type: "meme", risk: 5 },
    { title: "Learn Quantum Computing in 10s", views: "50k", creator: "QubitQuick", type: "education", risk: 10 },
    { title: "Calling boss 'Baby' prank", views: "1M", creator: "JobLess", type: "prank", risk: 60 },
    { title: "Clouds are actually cotton candy factories", views: "200k", creator: "SweetSky", type: "conspiracy", risk: 40 },
    { title: "Verify your account immediately", views: "5", creator: "Admin_Support", type: "scam", risk: 100 },
    { title: "Tesla coil plays Megalovania", views: "2M", creator: "ZapMusic", type: "science", risk: 20 },
    { title: "ASMR: Typing on a mechanical keyboard", views: "600k", creator: "ClickClack", type: "asmr", risk: 5 },
    { title: "Reacting to my old cringy videos", views: "2M", creator: "GrowthMindset", type: "reaction", risk: 10 },
    { title: "Shooting Stars meme compilation", views: "5M", creator: "SpaceRaider", type: "meme", risk: 5 },
    { title: "How to boil water", views: "10M", creator: "CookingBasics", type: "education", risk: 0 },
    { title: "Surviving 24h in a freezer", views: "3M", creator: "Iceman", type: "prank", risk: 85 },
    { title: "Trees communicate via WiFi", views: "500k", creator: "NatureNet", type: "conspiracy", risk: 50 },
    { title: "Claim your inheritance now", views: "10", creator: "LawyerSmith", type: "scam", risk: 95 },
    { title: "Slow motion water balloon to face", views: "8M", creator: "SloMoGuysClone", type: "science", risk: 10 },
    { title: "ASMR: Hair Brushing", views: "1M", creator: "TangleFree", type: "asmr", risk: 5 },
    { title: "Reacting to K-Pop for the first time", views: "4M", creator: "MusicReactor", type: "reaction", risk: 15 },
    { title: "Crab Rave 10 hours", views: "15M", creator: "RaveMaster", type: "meme", risk: 5 },
    { title: "Philosophy of Spongebob", views: "2M", creator: "DeepDive", type: "education", risk: 5 },
    { title: "Destroying my friend's car then buying a new one", views: "10M", creator: "RichFriend", type: "prank", risk: 40 },
    { title: "The sun is cold, they just heat the telescopes", views: "100k", creator: "ColdSun", type: "conspiracy", risk: 90 },
    { title: "Password inspector - send me yours", views: "2", creator: "SecurityCheck", type: "scam", risk: 100 },
    { title: "Dry ice bomb experiment", views: "500k", creator: "BoomScience", type: "science", risk: 85 },
];

import { VOICES } from './voices.js';

export const COMMENTS = [
    "First!",
    "This is why aliens won't talk to us.",
    "My ears are bleeding, 10/10.",
    "Is this real?",
    "Algorithm brought me here.",
    "Sub 4 Sub???",
    "Delete this.",
    "I'm reporting this.",
    "Who is watching in 2024?",
    "Notification squad where you at?",
    "This changed my life.",
    "Underrated channel.",
    "Why is this in my recommended?",
    "Can you do a face reveal?",
    "Fake.",
    "Scripted.",
    "I was eating while watching this...",
    "RIP headphone users.",
    "Mom get the camera!",
    "This deserves more views.",
    "Cringe.",
    "Based.",
    "Song name?",
    "Darude - Sandstorm",
    "I clicked so fast I broke my mouse.",
    "Edit: Thanks for the likes guys!",
    "Don't read more, just watch.",
    "Make part 2 please!",
    "Legend.",
    "The quality of this content is questionable.",
    "I felt my brain cells dying.",
    "Why?",
    "Just why?",
    "Okay, this is epic.",
    "I can't believe you did that.",
    "Police have been notified.",
    "Wait, is that legal?",
    "My dog watched this and now he's barking in binary.",
    "Instructions unclear, got stuck in ceiling fan.",
    "0:42 was the best part.",
    "2x speed is the only way to watch this.",
    "Subbed.",
    "Unsubbed.",
    "Resubbed.",
    "This video cured my boredom.",
    "This video caused my boredom.",
    "Imagine watching this at 3am.",
    "Youtube is broken.",
    "I am the 1000th viewer!",
    "Nice editing.",
    "What software do you use?",
    "Collab with me?",
    "Check out my channel for free cookies.",
    "Bot comment.",
    "Another one.",
    "Here before 1M views.",
    "This is art.",
    "Modern art.",
    "Abstract art.",
    "Trash.",
    "Gold.",
    "Diamond.",
    "My eyes!",
    "Turn on captions for a surprise.",
    "The ending shocked me.",
    "Clickbait.",
    "Not clickbait.",
    "100% real no fake.",
    "Source: Trust me bro.",
    "Big if true.",
    "Small if false.",
    "I have no words.",
    "Speechless.",
    "Comment.",
    "Reply.",
    "Thread.",
    "Ratio.",
    "L.",
    "W.",
    "F.",
    "GG.",
    "WP.",
    "EZ.",
    "Noob.",
    "Pro.",
    "Hacker.",
    "God mode.",
    "Admin pls ban.",
    "Mod check.",
    "Vibe check.",
    "Drip check.",
    "Sheesh.",
    "Busgin.",
    "Respectfully.",
    "Disrespectfully.",
    "Understandable, have a nice day.",
    "Sir this is a Wendy's.",
    "Emotional damage.",
    "I need bleach for my eyes.",
    "Wholesome.",
    "Cursed.",
    "Blursed."
];

export const MOODS = {
    NEUTRAL: { text: "Normal-ish", color: "bg-blue-500", desc: "Just business as usual." },
    ANGRY: { text: "RAGE MODE", color: "bg-red-600", desc: "The Algorithm hates everything. Bans are 2x effective." },
    MEME: { text: "MEME LORD", color: "bg-pink-500", desc: "Silly videos earn 3x money." },
    DYSTOPIAN: { text: "CORPORATE", color: "bg-gray-800", desc: "Only educational content is monetized. Fun is illegal." }
};

export const TRENDS = [
    "Cats", "Fire", "Slime", "Apology Videos", "Geometry", "Silence", 
    "Hydraulic Press", "100 Layers", "Fidget Spinners", "Bottle Flip", 
    "Ice Bucket", "Mannequin", "Planking", "Harlem Shake", "Dab", 
    "Floss", "T-Pose", "Area 51", "Tide Pods", "Floor is Lava",
    "Cinnamon Challenge", "Ghost Pepper", "ASMR", "Mukbang", "Unboxing",
    "Pranks", "Life Hacks", "DIY", "Gaming", "Vlogs", "Storytime",
    "Conspiracy", "Crypto", "NFTs", "AI", "Metaverse", "Space",
    "Deep Sea", "Tiny Homes", "Van Life", "Morning Routine", "Night Routine",
    "What I Eat", "Workout", "Yoga", "Meditation", "Motivation",
    "Finance", "Politics", "Drama", "Tea", "Exposed", "Cancelled"
];

const VIDEO_TYPES = ["prank", "education", "asmr", "conspiracy", "scam", "science", "reaction", "meme"];

export async function generateVideo(trend, mood) {
    // Check queue health - if backlog is too high, skip AI to prevent lags
    if (requestQueue.length > 3) {
        return generateStaticVideo(trend);
    }

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