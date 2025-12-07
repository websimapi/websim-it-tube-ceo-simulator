import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMMENTS } from "../generators.js";
function VideoPlayer({ video, onClose }) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoComments, setVideoComments] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    const shuffled = [...COMMENTS].sort(() => 0.5 - Math.random());
    setVideoComments(shuffled.slice(0, 5));
    const generateAudio = async () => {
      setLoadingAudio(true);
      try {
        const scriptCompletion = await window.websim.chat.completions.create({
          messages: [
            { role: "system", content: "You are a content creator. Write a ONE sentence opening hook for your video. High energy, funny, or weird. Spoken text only." },
            { role: "user", content: `Video: ${video.title} by ${video.creator} (${video.type})` }
          ]
        });
        const script = scriptCompletion.content;
        const tts = await window.websim.textToSpeech({
          text: script,
          voice: "en-male"
          // Simple default
        });
        setAudioUrl(tts.url);
      } catch (e) {
        console.error("Audio Gen Failed", e);
      } finally {
        setLoadingAudio(false);
      }
    };
    generateAudio();
  }, [video]);
  useEffect(() => {
    if (!isPlaying) {
      audioRef.current?.pause();
      return;
    }
    if (audioUrl && audioRef.current && audioRef.current.paused && progress < 100) {
      audioRef.current.play().catch((e) => console.log("Play blocked", e));
    }
    if (progress >= 100) return;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, 100);
    return () => clearInterval(timer);
  }, [isPlaying, progress, audioUrl]);
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxDEV("audio", { ref: audioRef, src: audioUrl }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 72,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 },
        className: "w-full max-w-2xl bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl flex flex-col max-h-[90vh]",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 border-b border-gray-800 flex justify-between items-center bg-gray-800", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-green-500 truncate mr-4", children: [
              "Watching: ",
              video.title
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 82,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-bold text-sm", children: "\u2715 CLOSE" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 83,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 81,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "aspect-video bg-black relative overflow-hidden group cursor-pointer", onClick: () => setIsPlaying(!isPlaying), children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 transition-colors duration-1000", style: { backgroundColor: isPlaying ? video.thumbnailColor : "#1f2937" } }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 88,
              columnNumber: 21
            }, this),
            video.thumbnailUrl ? /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                animate: {
                  scale: isPlaying ? [1, 1.1] : 1
                },
                transition: { repeat: Infinity, duration: 10, repeatType: "reverse", ease: "linear" },
                className: "absolute inset-0 bg-cover bg-center",
                style: { backgroundImage: `url(${video.thumbnailUrl})` }
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 92,
                columnNumber: 26
              },
              this
            ) : /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-0 flex items-center justify-center",
                children: /* @__PURE__ */ jsxDEV(
                  motion.div,
                  {
                    animate: {
                      rotate: isPlaying ? [0, -5, 5, -5, 5, 0] : 0,
                      scale: isPlaying ? [1, 1.2, 0.9, 1.1] : 1,
                      x: isPlaying ? [0, -10, 10, 0] : 0
                    },
                    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                    className: "text-9xl select-none filter drop-shadow-lg",
                    children: [
                      video.type === "prank" && "\u{1F921}",
                      video.type === "education" && "\u{1F9E0}",
                      video.type === "asmr" && "\u{1F442}",
                      video.type === "conspiracy" && "\u{1F441}\uFE0F",
                      video.type === "scam" && "\u{1F4B8}",
                      video.type === "science" && "\u{1F9EA}",
                      video.type === "reaction" && "\u{1F632}",
                      video.type === "meme" && "\u{1F5FF}"
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "<stdin>",
                    lineNumber: 105,
                    columnNumber: 29
                  },
                  this
                )
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 101,
                columnNumber: 25
              },
              this
            ),
            !isPlaying && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 z-10", children: /* @__PURE__ */ jsxDEV("div", { className: "text-6xl text-white opacity-80", children: "\u25B6" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 129,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 128,
              columnNumber: 25
            }, this),
            loadingAudio && isPlaying && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-[10px] font-mono px-2 py-1 rounded border border-white/20 animate-pulse z-20", children: "\u{1F50A} GENERATING AUDIO..." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 135,
              columnNumber: 26
            }, this),
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-0 pointer-events-none z-10",
                style: {
                  background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                  backgroundSize: "100% 2px, 3px 100%"
                }
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 141,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity opacity-0 group-hover:opacity-100 z-20", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "h-1 bg-gray-600 rounded-full mb-2 cursor-pointer relative overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  className: "h-full bg-red-600",
                  initial: { width: 0 },
                  animate: { width: `${progress}%` },
                  transition: { type: "tween", ease: "linear", duration: 0.1 }
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 151,
                  columnNumber: 29
                },
                this
              ) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 150,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-white text-sm font-bold font-mono", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsxDEV("button", { onClick: (e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }, children: isPlaying ? "\u23F8" : "\u25B6" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 160,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    "00:",
                    progress.toString().padStart(2, "0"),
                    " / 00:99"
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 163,
                    columnNumber: 33
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 159,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  video.views,
                  " views"
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 165,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 158,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 149,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 87,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4 bg-gray-900 no-scrollbar", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white mb-1 font-sans leading-tight", children: video.title }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 172,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-4 border-b border-gray-800 pb-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg", children: video.creator[0] }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 174,
                columnNumber: 26
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-white text-sm font-bold", children: video.creator }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 178,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-xs", children: "1M subscribers" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 179,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 177,
                columnNumber: 26
              }, this),
              /* @__PURE__ */ jsxDEV("button", { className: "ml-auto bg-gray-200 hover:bg-white text-black px-4 py-2 rounded-full text-sm font-bold uppercase transition-colors", children: "Subscribe" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 181,
                columnNumber: 26
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 173,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-gray-400 font-bold mb-3 text-sm uppercase tracking-wider", children: [
                "Comments (",
                videoComments.length,
                ")"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 185,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: videoComments.map((comment, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500", style: { animationDelay: `${i * 100}ms` }, children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 189,
                  columnNumber: 37
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-gray-300 text-xs font-bold", children: [
                      "User_",
                      Math.floor(Math.random() * 9999)
                    ] }, void 0, true, {
                      fileName: "<stdin>",
                      lineNumber: 192,
                      columnNumber: 45
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600 text-xs", children: "2 hours ago" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 193,
                      columnNumber: 45
                    }, this)
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 191,
                    columnNumber: 41
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 text-sm leading-snug", children: comment }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 195,
                    columnNumber: 41
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 190,
                  columnNumber: 37
                }, this)
              ] }, i, true, {
                fileName: "<stdin>",
                lineNumber: 188,
                columnNumber: 33
              }, this)) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 186,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 184,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 171,
            columnNumber: 17
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 74,
        columnNumber: 13
      },
      this
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 70,
    columnNumber: 9
  }, this);
}
export {
  VideoPlayer
};
