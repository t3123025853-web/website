"use client";

import { useEffect, useState } from "react";

type PetReaction = "idle" | "dog" | "cat" | "together";

export default function BrandPetLogo() {
  const [reaction, setReaction] = useState<PetReaction>("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sequence: Array<{ reaction: PetReaction; duration: number }> = [
      { reaction: "dog", duration: 1400 },
      { reaction: "cat", duration: 1400 },
      { reaction: "together", duration: 1900 },
      { reaction: "idle", duration: 900 },
    ];
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const playNext = () => {
      const step = sequence[index];
      setReaction(step.reaction);
      timer = setTimeout(() => {
        index = (index + 1) % sequence.length;
        playNext();
      }, step.duration);
    };

    timer = setTimeout(playNext, 650);
    return () => clearTimeout(timer);
  }, []);

  const dogLine = reaction === "cat" ? "READY TO PLAY?" : reaction === "together" ? "TOGETHER" : "HELLO, FRIEND";
  const catLine = reaction === "dog" ? "PURR-FECT" : reaction === "together" ? "BETTER CARE" : "ALWAYS";
  const motionLine = reaction === "dog"
    ? "PLAYFUL PRODUCTS"
    : reaction === "cat"
      ? "THOUGHTFUL DETAILS"
      : reaction === "together"
        ? "ONE BRAND · HAPPY TAILS"
        : "PET CARE IN MOTION";

  return (
    <div className={`brand-pet-logo is-${reaction}`}>
      <div className="brand-pet-orbit" aria-hidden="true">
        <span className="brand-orbit-pet brand-orbit-paw-one">🐾</span>
        <span className="brand-orbit-pet brand-orbit-paw-two">🐾</span>
        <span className="brand-orbit-pet brand-orbit-bone-one">🦴</span>
        <span className="brand-orbit-pet brand-orbit-bone-two">🦴</span>
      </div>
      <img src="/brand/alonrunlife-brand-lockup-transparent-v2.png" alt="AlonrunLife pet brand logo featuring a dog and cat" />

      <span className="brand-pet-bubble brand-pet-bubble-dog" aria-hidden="true">{dogLine}</span>
      <span className="brand-pet-bubble brand-pet-bubble-cat" aria-hidden="true">{catLine}</span>
      <span className="brand-pet-heart brand-pet-heart-one" aria-hidden="true">♥</span>
      <span className="brand-pet-heart brand-pet-heart-two" aria-hidden="true">♥</span>
      <span className="brand-pet-heart brand-pet-heart-three" aria-hidden="true">♥</span>
      <div className="brand-pet-motion-copy" aria-hidden="true">
        <span>ALONRUNLIFE IN MOTION</span>
        <strong key={reaction}>{motionLine}</strong>
      </div>
      <span className="sr-only">Animated AlonrunLife dog and cat brand logo.</span>
    </div>
  );
}
