"use client";

import { useRef, useState } from "react";

type PanelId = "global" | "custom" | "service";

const panels = [
  { id: "global" as PanelId, number: "01", title: "Global Market Experience", text: "Our service network reaches 150+ countries, with key markets across the Americas, Europe, and Southeast Asia." },
  { id: "custom" as PanelId, number: "02", title: "Flexible Customization Support", text: "OEM, ODM, and in-stock wholesale options are available. The standard sampling cycle is 7 days, and sample fees may be credited toward bulk orders." },
  { id: "service" as PanelId, number: "03", title: "Ongoing Customer Support", text: "We serve 700+ customers annually, with a recorded 45% repeat purchase rate supported by an experienced supply chain and service team." },
];

const customSlides = [
  { src: "/about/custom-case-dark.png", label: "Branding and Packaging Case Studies" },
  { src: "/about/custom-case-brands.png", label: "Multi-Market Brand Customization Cases" },
  { src: "/about/custom-case-crafts.png", label: "Five Customization Techniques" },
];
const globalEnergySource = { x: 678.7, y: 266.9 };
const globalEnergyRoutes = [
  { id: "north-america-1", x: 222.7, y: 178.6, duration: 5.8, delay: -1.2 },
  { id: "north-america-2", x: 241.5, y: 223.9, duration: 5.5, delay: -3.1 },
  { id: "north-america-3", x: 241.6, y: 261.5, duration: 5.3, delay: -2.2 },
  { id: "central-america", x: 355.6, y: 348.6, duration: 5.0, delay: -3.8 },
  { id: "south-america", x: 322.8, y: 399.7, duration: 5.5, delay: -4.4 },
  { id: "europe-1", x: 470.3, y: 178.5, duration: 4.2, delay: -1.7 },
  { id: "europe-2", x: 505.2, y: 195.1, duration: 4.0, delay: -2.9 },
  { id: "europe-2b", x: 569.3, y: 204.9, duration: 3.7, delay: -0.5 },
  { id: "europe-3", x: 464.4, y: 214.4, duration: 4.3, delay: -3.5 },
  { id: "europe-4", x: 486.7, y: 231.3, duration: 3.9, delay: -1.1 },
  { id: "europe-5", x: 447.0, y: 233.7, duration: 4.3, delay: -2.7 },
  { id: "mediterranean", x: 533.2, y: 240.9, duration: 3.7, delay: -2.3 },
  { id: "middle-east", x: 585.6, y: 257.9, duration: 3.4, delay: -.8 },
  { id: "central-asia", x: 618.7, y: 277.2, duration: 3.2, delay: -2.4 },
  { id: "russia", x: 660.3, y: 168.8, duration: 3.3, delay: -1.6 },
  { id: "south-asia", x: 724.1, y: 260.4, duration: 3.0, delay: -2.1 },
  { id: "africa", x: 505.1, y: 397.8, duration: 4.5, delay: -3.2 },
  { id: "japan", x: 735.2, y: 378.4, duration: 3.9, delay: -1.4 },
  { id: "australia", x: 813.6, y: 409.1, duration: 4.8, delay: -3.7 },
];

export default function AboutExperience() {
  const [active, setActive] = useState<PanelId>("global");
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const detailRef = useRef<HTMLDivElement>(null);

  const selectPanel = (id: PanelId) => {
    setActive(id);
    window.requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  const changeSlide = (step: number) => {
    setDirection(step > 0 ? "next" : "prev");
    setSlide((current) => (current + step + customSlides.length) % customSlides.length);
  };

  return (
    <>
      <div className="about-values about-values-interactive" aria-label="Company capability sections">
        {panels.map((panel) => (
          <button className={`about-value-button${active === panel.id ? " is-active" : ""}`} type="button" key={panel.id} aria-pressed={active === panel.id} onClick={() => selectPanel(panel.id)}>
            <span className="about-value-number">{panel.number}</span>
            <span className="about-value-copy"><strong>{panel.title}</strong><small>{panel.text}</small></span>
            <span className="about-value-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <div className="about-detail-stage" ref={detailRef}>
        {active === "global" && (
          <section className="about-detail-panel global-market-panel global-original-panel" aria-labelledby="global-panel-title">
            <div className="about-panel-heading global-panel-heading">
              <div><span>GLOBAL REACH · 01</span><h3 id="global-panel-title">Global Markets</h3></div>
              <p>Explore our global market map, including the complete country list and pet-themed visual elements.</p>
            </div>
            <figure className="global-original-frame">
              <img src="/about/global-market.jpg" alt="Yiwu Summer global market map and key partner countries" />
              <svg className="global-energy-network" viewBox="0 0 967 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <filter id="global-energy-glow" x="-200%" y="-200%" width="400%" height="400%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  {globalEnergyRoutes.map((route) => (
                    <path id={`energy-${route.id}`} d={`M ${globalEnergySource.x} ${globalEnergySource.y} L ${route.x} ${route.y}`} key={route.id} />
                  ))}
                </defs>

                {globalEnergyRoutes.map((route) => (
                  <path className="global-energy-route" d={`M ${globalEnergySource.x} ${globalEnergySource.y} L ${route.x} ${route.y}`} key={`line-${route.id}`} />
                ))}

                <g className="global-energy-source" transform={`translate(${globalEnergySource.x} ${globalEnergySource.y})`}>
                  <circle className="global-energy-source-ring global-energy-source-ring-one" r="12" />
                  <circle className="global-energy-source-ring global-energy-source-ring-two" r="12" />
                  <circle className="global-energy-source-core" r="6" />
                </g>

                {globalEnergyRoutes.map((route) => (
                  <g key={"energy-flow-" + route.id}>
                    <path className="global-electric-current global-electric-current-glow" pathLength="100" d={"M " + globalEnergySource.x + " " + globalEnergySource.y + " L " + route.x + " " + route.y}>
                      <animate attributeName="stroke-dashoffset" from="0" to="-100" dur={route.duration + "s"} begin={route.delay + "s"} repeatCount="indefinite" />
                    </path>
                    <path className="global-electric-current global-electric-current-core" pathLength="100" d={"M " + globalEnergySource.x + " " + globalEnergySource.y + " L " + route.x + " " + route.y}>
                      <animate attributeName="stroke-dashoffset" from="0" to="-100" dur={route.duration + "s"} begin={route.delay + "s"} repeatCount="indefinite" />
                    </path>
                    <circle className="global-energy-arrival" cx={route.x} cy={route.y} r="4">
                      <animate attributeName="r" values="4;4;7;10" keyTimes="0;.78;.9;1" dur={route.duration + "s"} begin={route.delay + "s"} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;0;.5;0" keyTimes="0;.78;.9;1" dur={route.duration + "s"} begin={route.delay + "s"} repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}
              </svg>
            </figure>
          </section>
        )}

        {active === "custom" && (
          <section className="about-detail-panel custom-panel" aria-labelledby="custom-panel-title">
            <div className="about-panel-heading">
              <div><span>CUSTOMIZATION · 02</span><h3 id="custom-panel-title">Brand Customization from Product to Packaging</h3></div>
              <p>Use the arrow buttons to explore logo, packaging, tag, and production technique cases.</p>
            </div>
            <div className="flipbook-shell">
              <button type="button" className="book-control book-prev" onClick={() => changeSlide(-1)} aria-label="Previous case">←</button>
              <div className="flipbook" aria-live="polite">
                <span className="book-spine" aria-hidden="true" />
                <figure className={`book-page book-page-${direction}`} key={`${slide}-${direction}`}>
                  <img src={customSlides[slide].src} alt={customSlides[slide].label} />
                  <figcaption><span>{String(slide + 1).padStart(2, "0")} / 03</span>{customSlides[slide].label}</figcaption>
                </figure>
              </div>
              <button type="button" className="book-control book-next" onClick={() => changeSlide(1)} aria-label="Next case">→</button>
            </div>
            <div className="book-dots" aria-label="Select a customization case">
              {customSlides.map((item, index) => (
                <button key={item.src} type="button" className={index === slide ? "is-active" : ""} onClick={() => { setDirection(index > slide ? "next" : "prev"); setSlide(index); }} aria-label={`View customization case ${index + 1}`} />
              ))}
            </div>
          </section>
        )}

        {active === "service" && (
          <section className="about-detail-panel service-panel" aria-labelledby="service-panel-title">
            <div className="service-panel-copy">
              <span>AFTER-SALES · 03</span><h3 id="service-panel-title">Responsive Support Throughout the Sourcing Process</h3>
              <p>From sample approval and order communication to after-sales feedback, our service team follows each stage of the sourcing process. Buyer review examples are shown alongside.</p>
              <div className="service-facts"><strong>700+</strong><span>customers served annually</span><strong>45%</strong><span>recorded repeat purchase rate</span></div>
            </div>
            <div className="service-review-frame"><img src="/about/customer-reviews.jpg" alt="Overseas buyer review examples" /></div>
          </section>
        )}
      </div>
    </>
  );
}