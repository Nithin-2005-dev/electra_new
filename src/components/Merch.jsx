// app/merch/page.tsx (inside your reveal card)
"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/merch_reveal.json"; // or "/merch_reveal.json"

export function MerchRevealLottie() {
  // Respect reduced motion – disable autoplay if user opted out
  const prefersReduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-label="Merch reveal"
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(141,255,255,.32)",
        background: "#0b1420",
        height: "clamp(280px,48vw,460px)",
        boxShadow: "inset 0 0 30px rgba(0,255,255,.12)",
      }}
    >
      {!prefersReduce ? (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice", progressiveLoad: true }}
        />
      ) : (
        <div
          style={{
            inset: 0,
            position: "absolute",
            display: "grid",
            placeItems: "center",
            color: "#eaffff",
            fontWeight: 900,
            letterSpacing: 6,
            border: "1px dashed rgba(141,255,255,.6)",
            borderRadius: 999,
            width: 280,
            height: 56,
            margin: "auto",
            background: "rgba(20,247,255,.16)",
          }}
        >
          COMING SOON
        </div>
      )}
    </div>
  );
}
