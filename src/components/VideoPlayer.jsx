import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Player } from "@websim/remotion/player";
import { VideoComposition } from "./Composition.jsx";
import { COMMENTS, enrichVideoWithAssets } from "../generators.js";
function VideoPlayer({ video, onClose }) {
  const [videoComments, setVideoComments] = useState([]);
  const [enrichedVideo, setEnrichedVideo] = useState(video);
  const [loadingAssets, setLoadingAssets] = useState(true);
  useEffect(() => {
    const shuffled = [...COMMENTS].sort(() => 0.5 - Math.random());
    setVideoComments(shuffled.slice(0, 5));
    const prepareAssets = async () => {
      setLoadingAssets(true);
      try {
        const updated = await enrichVideoWithAssets(video);
        setEnrichedVideo(updated);
      } catch (e) {
        console.error("Failed to enrich video", e);
      } finally {
        setLoadingAssets(false);
      }
    };
    prepareAssets();
  }, [video]);
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxDEV(
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
            lineNumber: 42,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-bold text-sm", children: "\u2715 CLOSE" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 43,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 41,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "aspect-video bg-black relative overflow-hidden flex items-center justify-center", children: loadingAssets ? /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-4xl animate-spin mb-4", children: "\u{1F4BF}" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 50,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-green-400 blink", children: "GENERATING CONTENT..." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 51,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-gray-500 mt-2", children: "Uploading Assets to Server..." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 52,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 49,
          columnNumber: 25
        }, this) : /* @__PURE__ */ jsxDEV(
          Player,
          {
            component: VideoComposition,
            inputProps: { video: enrichedVideo, assets: enrichedVideo.assets },
            durationInFrames: 450,
            fps: 30,
            compositionWidth: 1280,
            compositionHeight: 720,
            controls: true,
            autoPlay: true,
            loop: true,
            style: {
              width: "100%",
              height: "100%"
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 55,
            columnNumber: 25
          },
          this
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 47,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4 bg-gray-900 no-scrollbar", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white mb-1 font-sans leading-tight", children: video.title }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 75,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-4 border-b border-gray-800 pb-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg", children: video.creator[0] }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 77,
              columnNumber: 26
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-white text-sm font-bold", children: video.creator }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 81,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-xs", children: "1M subscribers" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 82,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 80,
              columnNumber: 26
            }, this),
            /* @__PURE__ */ jsxDEV("button", { className: "ml-auto bg-gray-200 hover:bg-white text-black px-4 py-2 rounded-full text-sm font-bold uppercase transition-colors", children: "Subscribe" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 84,
              columnNumber: 26
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 76,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-gray-400 font-bold mb-3 text-sm uppercase tracking-wider", children: [
              "Comments (",
              videoComments.length,
              ")"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 88,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: videoComments.map((comment, i) => /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500", style: { animationDelay: `${i * 100}ms` }, children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 92,
                columnNumber: 37
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-0.5", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-gray-300 text-xs font-bold", children: [
                    "User_",
                    Math.floor(Math.random() * 9999)
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 95,
                    columnNumber: 45
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600 text-xs", children: "2 hours ago" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 96,
                    columnNumber: 45
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 94,
                  columnNumber: 41
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 text-sm leading-snug", children: comment }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 98,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 93,
                columnNumber: 37
              }, this)
            ] }, i, true, {
              fileName: "<stdin>",
              lineNumber: 91,
              columnNumber: 33
            }, this)) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 89,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 87,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 74,
          columnNumber: 17
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 34,
      columnNumber: 13
    },
    this
  ) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 33,
    columnNumber: 9
  }, this);
}
export {
  VideoPlayer
};
