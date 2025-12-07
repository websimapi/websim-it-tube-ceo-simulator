import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useState, useRef } from "react";
import { db } from "./db.js";
import { VideoCard } from "./components/VideoCard.jsx";
import { VideoPlayer } from "./components/VideoPlayer.jsx";
import { generateVideo, generateStaticVideo, MOODS, TRENDS } from "./generators.js";
import confetti from "canvas-confetti";
const MAX_VIDEOS = 10;
const ALGO_TICK_RATE = 1e4;
function App() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [videos, setVideos] = useState([]);
  const [notification, setNotification] = useState(null);
  const [watchingVideo, setWatchingVideo] = useState(null);
  const sfxCash = useRef(new Audio("sfx_cash.mp3"));
  const sfxBan = useRef(new Audio("sfx_demonitize.mp3"));
  const sfxGlitch = useRef(new Audio("sfx_glitch.mp3"));
  useEffect(() => {
    const initGame = async () => {
      const data = await db.init();
      setStats(data.slot_1);
      setPlatform(data.slot_2);
      const initialVideos = Array(5).fill(null).map(() => generateStaticVideo(data.slot_2.activeTrend));
      setVideos(initialVideos);
      setLoading(false);
    };
    initGame();
  }, []);
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      handleAlgoEvent();
    }, ALGO_TICK_RATE);
    return () => clearInterval(interval);
  }, [loading, platform, stats]);
  const handleAlgoEvent = async () => {
    if (Math.random() > 0.6) {
      const moodKeys = Object.keys(MOODS);
      const newMood = moodKeys[Math.floor(Math.random() * moodKeys.length)];
      const newTrend = TRENDS[Math.floor(Math.random() * TRENDS.length)];
      const newPlatformState = {
        ...platform,
        mood: newMood,
        activeTrend: newTrend
      };
      setPlatform(newPlatformState);
      await db.update(2, newPlatformState);
      playSound(sfxGlitch);
      showNotification(`ALGO UPDATE: Now feeling ${newMood}! Trend: ${newTrend}`);
      await addNewVideo(newTrend);
    }
  };
  const addNewVideo = async (trend) => {
    const newVid = await generateVideo(trend, platform?.mood || "NEUTRAL");
    setVideos((prev) => [newVid, ...prev].slice(0, MAX_VIDEOS));
  };
  const playSound = (ref) => {
    if (!ref.current) return;
    ref.current.currentTime = 0;
    ref.current.play().catch((e) => {
      if (e.name !== "NotAllowedError") {
        console.log("Audio play failed", e);
      }
    });
  };
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3e3);
  };
  const handleVideoAction = async (video, action) => {
    if (action === "watch") {
      setWatchingVideo(video);
      return;
    }
    let moneyChange = 0;
    let repChange = 0;
    let chaosChange = 0;
    if (action === "banned") {
      playSound(sfxBan);
      if (video.risk > 50) {
        repChange += 5;
        moneyChange += 10;
      } else {
        repChange -= 10;
        chaosChange += 5;
        showNotification("Users hated that ban!");
      }
    } else if (action === "monetize") {
      playSound(sfxCash);
      if (platform.mood === "DYSTOPIAN" && video.type !== "education") {
        moneyChange -= 50;
        showNotification("Corporate Fined You!");
      } else if (platform.mood === "MEME" && video.type === "meme") {
        moneyChange += video.revenue * 3;
        confetti();
      } else {
        moneyChange += video.revenue;
      }
      if (video.risk > 80) {
        chaosChange += 20;
        showNotification("Dangerous video monetized! Chaos rising!");
      }
    }
    const newStats = {
      ...stats,
      money: stats.money + moneyChange,
      reputation: Math.max(0, Math.min(100, stats.reputation + repChange)),
      chaos: Math.max(0, Math.min(100, stats.chaos + chaosChange))
    };
    setStats(newStats);
    await db.update(1, newStats);
    if (newStats.chaos >= 100) {
      triggerServerMeltdown();
    }
    setTimeout(() => addNewVideo(platform.activeTrend), 1e3);
  };
  const triggerServerMeltdown = async () => {
    playSound(sfxGlitch);
    alert("SERVER MELTDOWN! CHAOS REACHED 100%. RESETTING REPUTATION.");
    const newStats = { ...stats, chaos: 0, reputation: 10, money: stats.money / 2 };
    setStats(newStats);
    await db.update(1, newStats);
  };
  if (loading) return /* @__PURE__ */ jsxDEV("div", { className: "flex h-screen items-center justify-center text-2xl font-mono text-green-500", children: "BOOTING IT_TUBE v1.0..." }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 162,
    columnNumber: 25
  }, this);
  const currentMoodData = MOODS[platform.mood];
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col h-full max-w-md mx-auto bg-gray-900 shadow-2xl overflow-hidden border-x border-gray-700 relative", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "crt-overlay absolute inset-0 z-50 pointer-events-none" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 168,
      columnNumber: 13
    }, this),
    watchingVideo && /* @__PURE__ */ jsxDEV(
      VideoPlayer,
      {
        video: watchingVideo,
        onClose: () => setWatchingVideo(null)
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 172,
        columnNumber: 17
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("header", { className: "bg-gray-800 p-2 border-b border-gray-600 z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-2", children: [
        /* @__PURE__ */ jsxDEV("img", { src: "ittube_logo.png", alt: "It Tube", className: "h-8 object-contain" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 181,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-green-400 text-xl", children: [
          "$",
          Math.floor(stats.money)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 182,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 180,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2 text-xs font-mono mb-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-black/50 p-1 rounded", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-gray-400", children: "REP" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 187,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "h-1 bg-gray-700 mt-1", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-blue-500 transition-all", style: { width: `${stats.reputation}%` } }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 189,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 188,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 186,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-black/50 p-1 rounded", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-gray-400", children: "CHAOS" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 193,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "h-1 bg-gray-700 mt-1", children: /* @__PURE__ */ jsxDEV("div", { className: "h-full bg-red-500 transition-all", style: { width: `${stats.chaos}%` } }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 195,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 194,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 192,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `bg-black/50 p-1 rounded border ${currentMoodData.color.replace("bg-", "border-")}`, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-gray-400", children: "ALGO" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 199,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "truncate font-bold", children: platform.mood }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 200,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 198,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 185,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-black p-1 text-center text-xs text-yellow-400 font-mono animate-pulse", children: [
        "MANDATORY TREND: ",
        platform.activeTrend.toUpperCase()
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 204,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 179,
      columnNumber: 13
    }, this),
    notification && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-32 left-0 right-0 z-40 flex justify-center pointer-events-none", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce", children: notification }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 212,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 211,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDEV("main", { className: "flex-1 overflow-y-auto p-4 no-scrollbar relative z-0", children: [
      stats.chaos > 80 && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 pointer-events-none bg-red-500/10 z-0 animate-pulse" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 222,
        columnNumber: 21
      }, this),
      videos.map((v) => /* @__PURE__ */ jsxDEV(
        VideoCard,
        {
          video: v,
          onAction: handleVideoAction,
          mood: platform.mood
        },
        v.id,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 226,
          columnNumber: 21
        },
        this
      )),
      /* @__PURE__ */ jsxDEV("div", { className: "text-center text-gray-600 mt-8 mb-20 font-mono text-sm", children: [
        "-- END OF FEED --",
        /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 235,
          columnNumber: 38
        }, this),
        "WAITING FOR CREATORS..."
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 234,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 219,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("footer", { className: "bg-gray-800 p-2 border-t border-gray-600 z-10", children: /* @__PURE__ */ jsxDEV("div", { className: "flex justify-around", children: [
      /* @__PURE__ */ jsxDEV("button", { className: "flex flex-col items-center text-gray-400 hover:text-white", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "\u{1F3E0}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 244,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs", children: "Feed" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 245,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 243,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("button", { className: "flex flex-col items-center text-gray-400 hover:text-white", onClick: () => showNotification("Inbox locked by Admin"), children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "\u{1F4E9}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 248,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs", children: "Inbox" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 249,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 247,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ jsxDEV("button", { className: "flex flex-col items-center text-gray-400 hover:text-white", onClick: () => showNotification("Shop requires Level 5"), children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "\u{1F6D2}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 252,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs", children: "Shop" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 253,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 251,
        columnNumber: 21
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 242,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 241,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 167,
    columnNumber: 9
  }, this);
}
export {
  App as default
};
