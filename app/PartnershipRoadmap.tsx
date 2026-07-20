"use client";

import { useEffect, useRef, useState } from "react";

const process = [
  { step: "01", title: "Submit Sourcing Requirements", text: "Share the target products, sales markets, estimated order quantity, and channel positioning." },
  { step: "02", title: "Confirm Product Assortment", text: "Compare designs, colors, sizes, functions, and suitable packaging options." },
  { step: "03", title: "Review Customization Details", text: "Confirm the logo, packaging design, samples, commercial terms, and production schedule." },
  { step: "04", title: "Confirm the Order in Writing", text: "Proceed once all specifications and order details have been confirmed in writing." },
];

export default function PartnershipRoadmap() {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;
    const detectContact = () => {
      const roadmap = roadmapRef.current;
      const particle = roadmap?.querySelector<HTMLElement>(".process-route-line > span");
      const nodes = roadmap ? Array.from(roadmap.querySelectorAll<HTMLElement>(".process-node")) : [];

      if (particle && nodes.length) {
        const particleRect = particle.getBoundingClientRect();
        const particleX = particleRect.left + particleRect.width / 2;
        const particleY = particleRect.top + particleRect.height / 2;
        const particleRadius = particle.offsetWidth / 2;

        const touchedIndex = nodes.findIndex((node) => {
          const nodeRect = node.getBoundingClientRect();
          const nodeX = nodeRect.left + nodeRect.width / 2;
          const nodeY = nodeRect.top + nodeRect.height / 2;
          const originalOuterRadius = node.offsetWidth / 2 + 8;
          return Math.hypot(particleX - nodeX, particleY - nodeY) <= originalOuterRadius + particleRadius;
        });

        setActiveStep((current) => current === (touchedIndex >= 0 ? touchedIndex : null) ? current : (touchedIndex >= 0 ? touchedIndex : null));
      }

      frame = window.requestAnimationFrame(detectContact);
    };

    frame = window.requestAnimationFrame(detectContact);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="process-list process-roadmap" ref={roadmapRef} aria-label="Cooperation roadmap from sourcing requirements to order confirmation">
      <div className="process-route-line" aria-hidden="true"><span /></div>
      {process.map((item, index) => (
        <article className="process-stop" key={item.step}>
          <div className={"process-node" + (activeStep === index ? " is-energy-active" : "")} aria-hidden="true"><span>{item.step}</span></div>
          <div className="process-card"><small>STEP {item.step}</small><h3>{item.title}</h3><p>{item.text}</p></div>
        </article>
      ))}
    </div>
  );
}