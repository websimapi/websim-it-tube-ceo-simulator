import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { motion } from "framer-motion";
function VideoCard({ video, onAction, mood }) {
  const [status, setStatus] = useState("active");
  const handleAction = (action) => {
    setStatus(action);
    onAction(video, action);
  };
  if (status === "banned") {
    return /* @__PURE__ */ jsxDEV("div", { className: "w-full h-32 bg-red-900/50 border-2 border-red-500 rounded-lg flex items-center justify-center m-2 p-4 text-red-200 font-mono", children: "[CONTENT REMOVED BY OVERLORD]" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 14,
      columnNumber: 13
    }, this);
  }
  return /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.8 },
      className: `relative bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 ${video.isTrending ? "border-yellow-400" : "border-gray-700"} mb-4`,
      children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => onAction(video, "watch"),
            className: "h-32 w-full relative group cursor-pointer hover:opacity-90 transition-opacity bg-cover bg-center",
            style: {
              backgroundColor: video.thumbnailColor,
              backgroundImage: video.thumbnailUrl ? `url(${video.thumbnailUrl})` : void 0
            },
            children: [
              !video.thumbnailUrl && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("span", { className: "text-4xl filter drop-shadow-md", children: [
                video.type === "prank" && "\u{1F921}",
                video.type === "education" && "\u{1F9E0}",
                video.type === "asmr" && "\u{1F442}",
                video.type === "conspiracy" && "\u{1F441}\uFE0F",
                video.type === "scam" && "\u{1F4B8}",
                video.type === "science" && "\u{1F9EA}",
                video.type === "reaction" && "\u{1F632}",
                video.type === "meme" && "\u{1F5FF}"
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 38,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 37,
                columnNumber: 21
              }, this),
              video.risk > 50 && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-red-400 font-bold border border-red-500 animate-pulse", children: "\u26A0\uFE0F HIGH RISK" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 53,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-black/60 rounded-full flex items-center justify-center border-2 border-white", children: /* @__PURE__ */ jsxDEV("span", { className: "text-white text-xl ml-1", children: "\u25B6" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 61,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 60,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 59,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 28,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-white text-lg leading-tight mb-1 font-sans", children: video.title }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 68,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs text-gray-400 mb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: video.creator }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 70,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              video.views,
              " views"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 71,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 69,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 mt-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleAction("monetize"),
                disabled: status !== "active",
                className: `flex-1 py-2 rounded font-bold text-sm transition-colors ${status === "monetized" ? "bg-green-500 text-black" : "bg-gray-700 hover:bg-green-600 text-green-400"}`,
                children: status === "monetized" ? "$$$" : "MONETIZE"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 76,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleAction("banned"),
                className: "flex-1 py-2 rounded font-bold text-sm bg-gray-700 hover:bg-red-600 text-red-400 transition-colors",
                children: "BAN"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 88,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 75,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 67,
          columnNumber: 13
        }, this),
        status === "monetized" && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { scale: 2, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-500 text-green-500 font-black text-2xl p-2 rotate-12 bg-black/80 rounded",
            children: "AD FRIENDLY"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 99,
            columnNumber: 17
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 21,
      columnNumber: 9
    },
    this
  );
}
export {
  VideoCard
};
