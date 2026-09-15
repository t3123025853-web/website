import "./CozyHero.css";
import GradientText from "./GradientText";
import TextType from "./TextType";
import CountUp from "./CountUp";

export default function CozyHero() {
  return (
    <section className="cozy-hero" id="top" aria-labelledby="cozy-hero-title">
      <div className="cozy-heading-layer">
        <p className="cozy-eyebrow cozy-fade-up cozy-delay-100">FULL-RANGE PET SUPPLIES · GLOBAL B2B SOURCING</p>
        <h1 id="cozy-hero-title" aria-label="Everything Your Pet Business Needs">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="cozy-gradient-headline"
          >
            <span className="cozy-typed-headline">
              <span className="cozy-typed-headline-reserve" aria-hidden="true">
                <span className="cozy-headline-line">Everything</span>
                <span className="cozy-headline-line">Your Pet Business Needs</span>
              </span>
              <TextType
                as="span"
                className="cozy-text-type"
                text={["Everything\nYour Pet Business Needs"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                variableSpeed={undefined}
                onSentenceComplete={undefined}
              />
            </span>
          </GradientText>
        </h1>
        <p className="cozy-subtitle cozy-fade-up cozy-delay-700">
          Curated pet products, flexible customization, and practical sourcing support for importers,
          distributors, and online wholesalers.
        </p>
      </div>

      <aside className="cozy-video-window cozy-fade-up cozy-delay-700" aria-label="Yiwu Summer pet product video">
        <div className="cozy-video-frame">
          <video
            src="/media/pet-product-showreel-v2.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Pet product collection and sourcing showcase"
          />
        </div>
        <div className="cozy-video-caption">
          <span><i aria-hidden="true" /> Product Showreel</span>
          <small>00:40</small>
        </div>
      </aside>

      <div className="cozy-photo-row" aria-label="Yiwu Summer pet product sourcing highlights">
        <article className="cozy-photo cozy-solid-panel cozy-solid-mint cozy-photo-reveal cozy-delay-800">
          <img
            className="cozy-panel-pet cozy-panel-dachshund"
            src="/hero/dachshund-panel.webp"
            alt="Brown dachshund resting its paws on the product range panel"
          />
          <div className="cozy-panel-copy">
            <span className="cozy-panel-kicker">Curated Assortment</span>
            <strong className="cozy-panel-number" aria-label="2,000 plus">
              <CountUp
                from={0}
                to={2000}
                separator=","
                direction="up"
                duration={0.5}
                className="count-up-text"
                onStart={undefined}
                onEnd={undefined}
              />
              <span aria-hidden="true">+</span>
            </strong>
            <h2>Pet Product SKUs</h2>
            <p>Practical choices across grooming, feeding, bedding, toys, and everyday pet care.</p>
            <a className="gradient-button" href="/products#product-categories">
              <span className="gradient-text">Browse the range <span aria-hidden="true">→</span></span>
            </a>
          </div>
        </article>

        <article className="cozy-photo cozy-solid-panel cozy-solid-green cozy-photo-reveal cozy-delay-600">
          <img
            className="cozy-panel-pet cozy-panel-golden"
            src="/hero/golden-retriever-card.webp"
            alt="Golden Retriever resting its paws on the selected products panel"
          />
          <div className="cozy-panel-copy cozy-panel-copy-light">
            <span className="cozy-panel-kicker">For Growing Pet Businesses</span>
            <h2>Selected Products, Ready for Your Market</h2>
            <p>Combine proven pet categories with flexible packaging and customization support.</p>
            <div className="cozy-panel-audience" aria-label="Target buyers">
              <span>Importers</span><span>Distributors</span><span>Online Wholesalers</span><span>Retail Buyers</span>
            </div>
            <div className="cozy-panel-actions">
              <a className="gradient-button" href="/products#product-categories">
                <span className="gradient-text">Browse Product Collections <span aria-hidden="true">→</span></span>
              </a>
              <a className="gradient-button" href="#contact">
                <span className="gradient-text">Submit Sourcing Requirements</span>
              </a>
            </div>
          </div>
        </article>

        <article className="cozy-photo cozy-solid-panel cozy-solid-peach cozy-photo-reveal cozy-delay-900">
          <img
            className="cozy-panel-pet cozy-panel-tabby"
            src="/hero/orange-tabby-panel.webp"
            alt="Orange tabby cat resting its paws on the global market panel"
          />
          <div className="cozy-panel-copy">
            <span className="cozy-panel-kicker">Global B2B Experience</span>
            <strong className="cozy-panel-number" aria-label="150 plus">
              <CountUp
                from={0}
                to={150}
                separator=","
                direction="up"
                duration={0.5}
                className="count-up-text"
                onStart={undefined}
                onEnd={undefined}
              />
              <span aria-hidden="true">+</span>
            </strong>
            <h2>Markets Served</h2>
            <p>Sourcing support for importers, distributors, and online wholesalers worldwide.</p>
            <a className="gradient-button" href="#about">
              <span className="gradient-text">View our experience <span aria-hidden="true">→</span></span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
