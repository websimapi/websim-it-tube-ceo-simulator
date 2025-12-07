import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
const VideoComposition = ({ video, assets }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const bgScale = interpolate(frame, [0, 300], [1.1, 1.3]);
  const subjectEnter = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 }
  });
  const textEnter = spring({
    frame: frame - 30,
    fps,
    config: { damping: 100, mass: 2 }
  });
  const glitchOffset = Math.sin(frame * 0.5) * 5;
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "black" }, children: [
    assets.bgUrl && /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: /* @__PURE__ */ jsxDEV(
      Img,
      {
        src: assets.bgUrl,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${bgScale})`,
          opacity: 0.6
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 30,
        columnNumber: 21
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 29,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: "10%",
      left: "50%",
      transform: `translateX(-50%) translateY(${Math.sin(frame / 10) * 20}px)`,
      width: "120%",
      height: "2px",
      background: "rgba(255,0,0,0.3)",
      boxShadow: "0 0 10px red"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 45,
      columnNumber: 18
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 44,
      columnNumber: 13
    }),
    assets.subjectUrl && /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ jsxDEV(
      Img,
      {
        src: assets.subjectUrl,
        style: {
          width: "50%",
          height: "auto",
          transform: `scale(${subjectEnter}) rotate(${Math.sin(frame / 20) * 5}deg)`,
          filter: "drop-shadow(0 0 20px rgba(0,255,0,0.5))"
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 60,
        columnNumber: 21
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 59,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: {
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 100,
      opacity: textEnter
    }, children: /* @__PURE__ */ jsxDEV("div", { style: {
      background: "black",
      padding: "20px",
      border: "4px solid white",
      transform: `translateX(${glitchOffset}px)`,
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsxDEV("h1", { style: {
        color: "white",
        fontFamily: "Impact, sans-serif",
        fontSize: "60px",
        margin: 0,
        textTransform: "uppercase",
        lineHeight: 1
      }, children: video.title }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 86,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("h2", { style: {
        color: "yellow",
        fontFamily: "monospace",
        fontSize: "30px",
        margin: 0
      }, children: video.creator }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 96,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 79,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 13
    }),
    assets.audioUrl && /* @__PURE__ */ jsxDEV(Audio, { src: assets.audioUrl }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 109,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: {
      background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
      backgroundSize: "100% 4px",
      pointerEvents: "none"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 113,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 26,
    columnNumber: 9
  });
};
export {
  VideoComposition
};
