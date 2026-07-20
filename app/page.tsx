import PawTrail from "./PawTrail";
import AboutExperience from "./AboutExperience";
import HeaderActions from "./HeaderActions";
import PetIntruders from "./PetIntruders";
import PartnershipRoadmap from "./PartnershipRoadmap";

const featuredProducts = [
  {
    number: "01",
    title: "Pet Grooming Glove Collection",
    english: "Mesh Cleaning & Massage Gloves",
    text: "Multiple mesh constructions and color options for cleaning, massage, and loose-hair care applications.",
    images: ["/products/pet-glove-yellow-clean.png", "/products/cat-paw-glove-grey.png", "/products/pet-glove-black-clean.png"],
    alt: "Black-and-yellow, grey cat-paw, and black pet grooming gloves",
    tone: "peach",
  },
  {
    number: "02",
    title: "Pet Pin Brush",
    english: "Oval-Head Grooming Brush",
    text: "An oval brush head and blue non-slip handle designed for everyday grooming and loose-hair removal.",
    images: ["/products/pet-pin-brush-source.png"],
    alt: "Blue-and-white pet pin brush product cutout",
    tone: "sky",
  },
  {
    number: "03",
    title: "Double-Sided Metal Comb",
    english: "Dual-Tooth Grooming Comb",
    text: "Blue and pink handle options with two tooth spacings for flexible grooming assortments.",
    images: ["/products/pet-double-comb-clean-2.png"],
    alt: "Blue and pink double-sided metal pet combs",
    tone: "mint",
  },
  {
    number: "04",
    title: "Pet Deshedding Brush",
    english: "Wide-Head Deshedding Tool",
    text: "A white-and-grey wide-head deshedding tool for everyday loose-hair care for cats and dogs.",
    images: ["/products/pet-deshedding-brush-cutout.png"],
    alt: "White-and-grey wide-head pet deshedding brush",
    tone: "stone",
  },
];
const partnerPlatforms = [
  { name: "Alibaba.com", slug: "alibaba" },
  { name: "Amazon", slug: "amazon" },
  { name: "Lazada", slug: "lazada" },
  { name: "eBay", slug: "ebay" },
  { name: "SHEIN", slug: "shein" },
  { name: "TikTok Shop", slug: "tiktok" },
  { name: "TEMU", slug: "temu" },
  { name: "Shopee", slug: "shopee" },
];


const complianceDocuments = [
  { code: "CE EMC", title: "CE Electromagnetic Compatibility Certificate", market: "EU", image: "/certificates/ce-emc.webp" },
  { code: "CE LVD", title: "CE Low Voltage Safety Certificate", market: "EU", image: "/certificates/ce-lvd.webp" },
  { code: "FCC SDOC", title: "FCC Supplier Declaration of Conformity", market: "US", image: "/certificates/fcc-sdoc.webp" },
  { code: "UKCA EMC", title: "UKCA Electromagnetic Compatibility Certificate", market: "UK", image: "/certificates/ukca-emc.webp" },
  { code: "UKCA LVD", title: "UKCA Electrical Safety Certificate", market: "UK", image: "/certificates/ukca-lvd.webp" },
  { code: "CE RED", title: "CE Radio Equipment Compliance Document", market: "EU", image: "/certificates/ce-red.webp" },
];

export default function Home() {
  return (
    <main>
      <PawTrail />
      <PetIntruders />
      <div className="announcement"><span>FULL-RANGE PET SUPPLIES · GLOBAL B2B SOURCING</span><span className="announcement-note">YIWU · CHINA</span></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Yiwu Summer Homepage">
          <span className="brand-mark brand-logo" aria-hidden="true"><img src="/brand/summer-mark.png" alt="" /></span>
          <span><strong>YIWU SUMMER</strong><small>DAILY NECESSITIES CO., LTD.</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#products">Products</a><a href="#partnership">Cooperation Process</a><a href="#about">About Us</a><a href="#faq">FAQ</a>
        </nav>
        <HeaderActions />

      </header>

      <section className="hero hero-cleaning" id="top">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">PET GROOMING & CLEANING · B2B</p>
          <h1>Pet Grooming & Cleaning Products, <span>Made Easier to Source Online.</span></h1>
          <p className="hero-intro">Explore real products for grooming, deshedding, bathing, and massage, presented for importers, distributors, and online wholesalers in Europe and the Americas.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/products#product-categories">Browse Product Collections <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href="#contact">Submit Sourcing Requirements</a>
          </div>
          <div className="hero-buyer-row" aria-label="Target buyers">
            <span>Online Wholesalers</span><span>Importers</span><span>Pet Supply Distributors</span><span>Retail Buyers</span>
          </div>
        </div>

        <div className="hero-product-stage" aria-label="Cats, dogs, and a selection of pet grooming and cleaning products">
          <img className="hero-pets" src="/hero/cat-dog-studio.png" alt="Golden Retriever and American Shorthair cat in a pet care setting" />
          <img className="hero-product hero-new-pin" src="/products/pet-pin-brush-source.png" alt="Blue-and-white pet pin brush" />
          <img className="hero-product hero-new-bath" src="/products/pet-bath-brush-green.png" alt="Green refillable pet bath massage brush" />
          <img className="hero-product hero-new-glove-back" src="/products/pet-glove-black-back.png" alt="Back view of a black mesh pet grooming glove" />
          <img className="hero-product hero-new-glove-front" src="/products/pet-glove-yellow-front.png" alt="Black-and-yellow pet grooming glove" />
          <img className="hero-product hero-new-glove-paw" src="/products/cat-paw-glove-grey.png" alt="Grey cat-paw pet grooming glove" />
          <img className="hero-product hero-new-glove-side" src="/products/pet-glove-yellow-side.png" alt="Black-and-yellow contrast pet grooming glove" />
        </div>
      </section>

      <section className="trust-strip" aria-label="Product collection highlights">
        <p>10+ years of pet product manufacturing and trading experience in Yiwu, supporting multi-category sourcing and customization for international buyers.</p>
        <div><span>2000+ SKU</span><span>OEM / ODM</span><span>150+ Countries</span><span>7-Day Sampling</span><span>In-Stock Wholesale</span></div>
      </section>

      <section className="section product-section" id="products">
        <div className="section-heading product-heading">
          <div><p className="eyebrow">FEATURED CLEANING PRODUCTS</p><h2>Featured Pet Grooming & Cleaning Products</h2></div>
          <p>Close-up product presentation paired with clean pet-focused visuals. Materials, sizes, logos, packaging, MOQ, and lead times are confirmed for each inquiry.</p>
        </div>
        <div className="product-gallery featured-gallery clean-product-gallery">
          {featuredProducts.map((product, index) => (
            <article className={`product-card featured-product tone-${product.tone}`} key={product.number}>
              <div className={`product-visual${product.images.length > 1 ? " product-multi" : ""}`}>
                {product.images.map((src, imageIndex) => (
                  <img
                    className={product.images.length > 1 ? `multi-product multi-product-${imageIndex + 1}` : undefined}
                    src={src}
                    alt={imageIndex === 0 ? product.alt : ""}
                    loading={index < 2 ? "eager" : "lazy"}
                    key={src}
                  />
                ))}
              </div>
              <div className="product-card-copy">
                <span>{product.number}</span>
                <div><h3>{product.title}</h3><small>{product.english}</small><p>{product.text}</p></div>
                <a href="#contact" aria-label={`Inquire about ${product.title}`}>↗</a>
              </div>
            </article>
          ))}
        </div>
        <div className="product-note">
          <div><p className="note-label">Buyer Confirmation Checklist</p><h3>Confirm the details that affect online sales and landed sourcing costs.</h3></div>
          <ul><li>Product materials and dimensions</li><li>Color and logo options</li><li>Retail packaging or bulk-packing requirements</li><li>MOQ, samples, and lead time</li></ul>
          <a href="#contact">Submit Product Requirements →</a>
        </div>
      </section>

      <section className="section partner-platform-section" id="partners" aria-labelledby="partner-platform-title">
        <div className="section-heading compact-heading partner-platform-heading">
          <div><p className="eyebrow">COOPERATION PARTNER</p><h2 id="partner-platform-title">Supporting Diverse Online Sales Channels</h2></div>
          <p>Our platform examples cover major B2B, ecommerce, and social retail channels, helping overseas buyers plan product assortments, packaging, and listings for different markets.</p>
        </div>
        <div className="partner-platform-grid" aria-label="Partner platform examples">
          {partnerPlatforms.map((platform) => (
            <article className="partner-platform-card" key={platform.slug} tabIndex={0} aria-label={platform.name}>
              <img className="partner-platform-logo" src={`/partners/${platform.slug}.png`} alt={`${platform.name} platform logo`} />
              <strong>{platform.name}</strong>
            </article>
          ))}
        </div>
        <p className="partner-platform-note">These platforms are shown only as examples of channels our customers may operate. All trademarks belong to their respective owners.</p>
      </section>

      <section className="partnership" id="partnership">
        <div className="partnership-intro">
          <div className="partnership-title">
            <p className="eyebrow">Cooperation Process</p><h2>A Clear Process from Product Requirements to Order Confirmation.</h2>
          </div>
          <div className="partnership-summary">
            <p>Effective sourcing begins with clear requirements. We confirm product, packaging, and commercial details to reduce communication gaps during product selection and quotation.</p>
            <a className="button button-light" href="#contact">Submit Sourcing Requirements</a>
          </div>
        </div>
        <PartnershipRoadmap />
      </section>

      <section className="section about-section about-section-interactive" id="about">

        <div className="about-card">
          <p className="eyebrow">ABOUT YIWU SUMMER</p><h2>Practical Pet Product Sourcing Support for International Buyers.</h2>
          <p>Yiwu Summer Daily Necessities Co., Ltd. is based in Yiwu, Zhejiang, China. With more than 10 years of industry experience, we combine manufacturing and trading capabilities. Our portfolio focuses on pet supplies and selected gift items, including grooming tools, feeders, beds and mats, leashes, litter boxes, and pet toys.</p>
          <p>Company records indicate 1,000 m² of operating and production space, 5 production lines, and a portfolio of 2,000+ SKUs. We support OEM, ODM, in-stock wholesale, small-batch logo customization, and complimentary design support. Product-specific MOQ, packaging processes, and bulk-order lead times are confirmed for each inquiry.</p>
        </div>
        <AboutExperience />

        <div className="compliance-showcase" aria-labelledby="compliance-title">
          <div className="compliance-heading">
            <div><p className="eyebrow">CERTIFICATES & TEST DOCUMENTS</p><h3 id="compliance-title">Product Certificates & Test Documents</h3></div>
            <p>The following document images come from our existing product files and are displayed as complete pages. Certification scope, report version, and validity must be verified against the specific SKU, material, function, and destination market.</p>
          </div>
          <div className="compliance-marquee certificate-marquee" role="region" aria-label="Horizontal showcase of six product certificates and test documents">
            <div className="compliance-track certificate-track">
              {[...complianceDocuments, ...complianceDocuments].map((document, index) => (
                <article className="certificate-slide" key={`${document.code}-${index}`} aria-hidden={index >= complianceDocuments.length}>
                  <div className="certificate-page">
                    <img src={document.image} alt={index < complianceDocuments.length ? `${document.title} document page` : ""} loading={index < 3 ? "eager" : "lazy"} />
                    <span>Document Sample</span>
                  </div>
                  <div className="certificate-caption"><small>{document.market}</small><h4>{document.title}</h4><strong>{document.code}</strong></div>
                </article>
              ))}
            </div>
          </div>
          <p className="compliance-disclaimer">Compliance notice: documents shown on this page do not imply that every product is covered by the same certification. Formal purchasing decisions must be based on the applicable product, valid report, and original certificate.</p>
        </div>
        <div className="company-real-scenes" aria-labelledby="company-scenes-title">
          <div className="company-scenes-heading">
            <div>
              <p className="eyebrow">REAL COMPANY · REAL CAPABILITY</p>
              <h3 id="company-scenes-title">Real Office, Production & Warehouse Facilities</h3>
            </div>
            <p>From product selection and sampling to production, material management, and order preparation, these images present the daily operations of Yiwu Summer Daily Necessities Co., Ltd. and give international buyers a clearer view of our collaboration and fulfillment capabilities.</p>
          </div>

          <div className="company-scene-metrics" aria-label="Company capability overview">
            <span><strong>1,000 m²</strong><small>Operating & Production Space</small></span>
            <span><strong>5</strong><small>Production Lines</small></span>
            <span><strong>2000+</strong><small>SKU Portfolio</small></span>
            <span><strong>OEM / ODM</strong><small>Customization Support</small></span>
          </div>

          <div className="company-photo-wall">
            <figure className="company-photo company-photo-feature">
              <img src="/company/office-team.jpg" alt="Yiwu Summer office and business collaboration team" />
              <figcaption><span>01</span><strong>Office Collaboration</strong><small>Sales, design, and sourcing coordination</small></figcaption>
            </figure>
            <figure className="company-photo company-photo-tall">
              <img src="/company/product-showroom.jpg" alt="Pet product sample showroom" />
              <figcaption><span>02</span><strong>Product Showroom</strong><small>Multi-category pet product samples</small></figcaption>
            </figure>
            <figure className="company-photo company-photo-wide">
              <img src="/company/sewing-line.jpg" alt="Pet product sewing line" />
              <figcaption><span>03</span><strong>Sewing Production</strong><small>On-site processing and work-in-progress management</small></figcaption>
            </figure>
            <figure className="company-photo">
              <img src="/company/production-equipment.jpg" alt="Pet product production equipment" />
              <figcaption><span>04</span><strong>Production Equipment</strong><small>Material processing equipment</small></figcaption>
            </figure>
            <figure className="company-photo">
              <img src="/company/pattern-making.jpg" alt="Product sampling and pattern making in progress" />
              <figcaption><span>05</span><strong>Sampling & Development</strong><small>Pattern making and detail confirmation</small></figcaption>
            </figure>
            <figure className="company-photo company-photo-wide">
              <img src="/company/sewing-workshop.jpg" alt="Pet product production workshop" />
              <figcaption><span>06</span><strong>Production Workshop</strong><small>Sewing stations and production organization</small></figcaption>
            </figure>
            <figure className="company-photo">
              <img src="/company/material-rolls.jpg" alt="Factory raw material roll storage area" />
              <figcaption><span>07</span><strong>Raw Material Management</strong><small>Zoned storage for material rolls</small></figcaption>
            </figure>
            <figure className="company-photo">
              <img src="/company/workshop-materials.jpg" alt="Workshop work-in-progress and material handling area" />
              <figcaption><span>08</span><strong>Material Handling</strong><small>Work-in-progress and production material management</small></figcaption>
            </figure>
            <figure className="company-photo company-photo-wide">
              <img src="/company/fabric-storage.jpg" alt="Factory fabric and raw material storage area" />
              <figcaption><span>09</span><strong>Fabric Inventory</strong><small>Multi-color fabrics and raw material storage</small></figcaption>
            </figure>
            <figure className="company-photo">
              <img src="/company/warehouse-orders.jpg" alt="Warehouse order preparation area" />
              <figcaption><span>10</span><strong>Order Preparation</strong><small>Centralized management of outgoing orders</small></figcaption>
            </figure>
            <figure className="company-photo company-photo-wide">
              <img src="/company/container-shipping.jpg" alt="Container loading and warehouse shipping area" />
              <figcaption><span>11</span><strong>Warehousing & Shipping</strong><small>Container loading and shipment preparation</small></figcaption>
            </figure>
          </div>

        </div>

      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-heading"><p className="eyebrow">BUYER FAQ</p><h2>Questions to Confirm Before Quotation</h2><p>The exact answer depends on the product. Providing the following information in advance helps both parties define purchasing requirements more efficiently.</p></div>
        <div className="faq-list">
          <details><summary>Can colors, logos, or packaging be customized?</summary><p>Customization options depend on the selected product, order quantity, and artwork requirements. Please include your preferred colors, branding, and packaging format in the inquiry.</p></details>
          <details><summary>What is the minimum order quantity?</summary><p>MOQ varies by product and degree of customization and is confirmed together with the final specifications and packaging requirements.</p></details>
          <details><summary>Can buyers request samples?</summary><p>Sample availability, related charges, and delivery options are confirmed separately for each product.</p></details>
          <details><summary>What information is required for an accurate quotation?</summary><p>Please provide the product name or reference image, estimated quantity, destination country, required specifications, packaging format, and branding requirements.</p></details>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div><p className="eyebrow">START A CONVERSATION</p><h2>Tell Us What Your Market Needs.</h2><p>Please share the product style, estimated quantity, destination, packaging preferences, and customization requirements. This information helps us provide a more relevant first response.</p></div>
        <div className="inquiry-card">
          <span className="inquiry-label">INQUIRY INFORMATION CHECKLIST</span>
          <ul><li>Product name or reference image</li><li>Target market and destination</li><li>Estimated order quantity</li><li>Required specifications and colors</li><li>Logo and packaging requirements</li></ul>
          <div className="contact-placeholder"><strong>Contact Details to Be Confirmed</strong><p>Before launch, add the verified Alibaba.com store link, business email, telephone number, or WhatsApp contact.</p></div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark brand-logo" aria-hidden="true"><img src="/brand/summer-mark.png" alt="" /></span><span><strong>YIWU SUMMER</strong><small>DAILY NECESSITIES CO., LTD.</small></span></a>
        <p>Pet grooming and cleaning products for international B2B buyers.</p><p>© 2026 Yiwu Summer Daily Necessities Co., Ltd.</p>
      </footer>
    </main>
  );
}
