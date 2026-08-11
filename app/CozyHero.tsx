import "./CozyHero.css";

export default function CozyHero() {
  return (
    <section className="cozy-hero" id="top" aria-labelledby="cozy-hero-title">
      <div className="cozy-heading-layer">
        <p className="cozy-eyebrow cozy-fade-up cozy-delay-100">FULL-RANGE PET SUPPLIES · GLOBAL B2B SOURCING</p>
        <h1 id="cozy-hero-title" aria-label="Everything Your Pet Business Needs">
          <span className="cozy-headline-line">
            <span className="cozy-word cozy-delay-200">Everything</span>
          </span>
          <span className="cozy-headline-line">
            <span className="cozy-word cozy-delay-300">Your</span>
            <span className="cozy-word cozy-delay-400">Pet</span>
            <span className="cozy-word cozy-delay-500">Business</span>
            <span className="cozy-word cozy-delay-600">Needs</span>
          </span>
        </h1>
        <p className="cozy-subtitle cozy-fade-up cozy-delay-700">
          Curated pet products, flexible customization, and practical sourcing support for importers,
          distributors, and online wholesalers.
        </p>
      </div>

      <div className="cozy-photo-row" aria-label="Yiwu Summer pet product sourcing highlights">
        <article className="cozy-photo cozy-solid-panel cozy-solid-mint cozy-photo-reveal cozy-delay-800">
          <img
            className="cozy-panel-pet cozy-panel-dachshund"
            src="/hero/dachshund-panel.webp"
            alt="Brown dachshund resting its paws on the product range panel"
          />
          <div className="cozy-panel-copy">
            <span className="cozy-panel-kicker">Curated Assortment</span>
            <strong className="cozy-panel-number">2,000+</strong>
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
            <strong className="cozy-panel-number">150+</strong>
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
