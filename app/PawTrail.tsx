"use client";

import { useEffect, useRef } from "react";

export default function PawTrail() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!layer || !finePointer || reducedMotion) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let index = 0;

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (now - lastTime < 65 || distance < 32) return;

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;

      const mark = document.createElement("span");
      const isPaw = index++ % 3 !== 2;
      mark.className = `trail-item ${isPaw ? "trail-paw" : "trail-bone"}`;
      mark.textContent = isPaw ? "🐾" : "🦴";
      mark.style.left = `${event.clientX}px`;
      mark.style.top = `${event.clientY}px`;
      mark.style.setProperty("--trail-rotation", `${-24 + Math.random() * 48}deg`);
      layer.appendChild(mark);
      window.setTimeout(() => mark.remove(), 900);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return <div className="paw-trail-layer" ref={layerRef} aria-hidden="true" />;
}
