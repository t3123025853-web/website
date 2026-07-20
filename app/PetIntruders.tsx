"use client";

import { useEffect, useRef } from "react";

export default function PetIntruders() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const productSection = document.querySelector<HTMLElement>(".product-section");
    const dog = root?.querySelector<HTMLImageElement>(".product-dog-intruder");
    if (!root || !productSection || !dog) return;

    let scrollFrame = 0;
    const updateDogScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const pageTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const startAt = Math.max(0, productSection.offsetTop - window.innerHeight * 0.58);
        const finishAt = Math.max(startAt + 1, documentHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, (pageTop - startAt) / (finishAt - startAt)));
        const dogHeight = dog.getBoundingClientRect().height || 420;
        const minimumTop = Math.min(150, Math.max(96, window.innerHeight * 0.16));
        const maximumTop = Math.max(minimumTop, window.innerHeight - dogHeight + 10);
        const localTop = minimumTop + (maximumTop - minimumTop) * progress;

        root.style.setProperty("--dog-scroll-top", `${localTop.toFixed(1)}px`);
        root.classList.toggle("is-visible", pageTop >= startAt - 20);
      });
    };

    window.addEventListener("scroll", updateDogScroll, { passive: true });
    window.addEventListener("resize", updateDogScroll, { passive: true });
    updateDogScroll();

    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", updateDogScroll);
      window.removeEventListener("resize", updateDogScroll);
    };
  }, []);

  return (
    <div className="pet-intruders global-dog-follower" ref={rootRef} aria-hidden="true">
      <img className="product-dog-intruder" src="/pets/dog-peek.png" alt="" />
    </div>
  );
}