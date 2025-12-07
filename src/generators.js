// Utilities for generating chaos

export const VIDEOS = [
    { title: "I ATE A 50LB GUMMY BEAR", views: "1.2M", creator: "SugarRush", type: "prank", risk: 20 },
    { title: "Teaching my cat Quantum Physics", views: "402", creator: "ProfessorPaws", type: "education", risk: 5 },
    { title: "ASMR: Screaming into a jar", views: "500k", creator: "QuietPls", type: "asmr", risk: 10 },
    { title: "Is the Earth actually a Donut?", views: "8.9M", creator: "TruthSeeker", type: "conspiracy", risk: 80 },
    { title: "HOW TO GET FREE MONEY (REAL)", views: "50", creator: "TotallyLegit", type: "scam", risk: 95 },
    { title: "Unboxing a Radioactive Rock", views: "2M", creator: "GlowBoy", type: "science", risk: 70 },
    { title: "Reacting to Reacting to Reactions", views: "300k", creator: "MetaMike", type: "reaction", risk: 10 },
    { title: "10 Hours of silence broken by a horn", views: "4M", creator: "TrollKing", type: "meme", risk: 30 },
];

export const COMMENTS = [
    "First!",
    "This is why aliens won't talk to us.",
    "My ears are bleeding, 10/10.",
    "Is this real?",
    "Algorithm brought me here.",
    "Sub 4 Sub???",
    "Delete this."
];

export const MOODS = {
    NEUTRAL: { text: "Normal-ish", color: "bg-blue-500", desc: "Just business as usual." },
    ANGRY: { text: "RAGE MODE", color: "bg-red-600", desc: "The Algorithm hates everything. Bans are 2x effective." },
    MEME: { text: "MEME LORD", color: "bg-pink-500", desc: "Silly videos earn 3x money." },
    DYSTOPIAN: { text: "CORPORATE", color: "bg-gray-800", desc: "Only educational content is monetized. Fun is illegal." }
};

export const TRENDS = [
    "Cats", "Fire", "Slime", "Apology Videos", "Geometry", "Silence"
];

export function generateVideo(trend) {
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
        type: base.type,
        risk: base.risk, // 0-100 likelihood of being "cursed" or harmful
        revenue: Math.floor(Math.random() * 50) + 10,
        isTrending: isTrending
    };
}