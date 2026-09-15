import ProductCatalog from "../ProductCatalog";
import HeaderActions from "../HeaderActions";
import recoveredProducts from "../recovered-products.json";

const categoryLabels: Record<string, string> = {
  cleaning: "Pet Grooming & Cleaning",
  feeding: "Pet Feeding & Hydration",
  beds: "Pet Beds & Mats",
  leashes: "Leashes, Harnesses & Collars",
  toilets: "Pet Toilets & Litter Boxes",
  waste: "Pet Waste Management",
  toys: "Pet Toys",
  apparel: "Pet Apparel",
  others: "Other Pet Supplies",
  "christmas-gifts": "Christmas Gifts for Pets",
};

const productCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Yiwu Summer B2B Pet Product Collection",
  numberOfItems: recoveredProducts.length,
  itemListElement: recoveredProducts.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      image: product.image,
      category: categoryLabels[product.categoryId] ?? "Pet Supplies",
      brand: { "@type": "Brand", name: "Yiwu Summer" },
      manufacturer: {
        "@type": "Organization",
        name: "Yiwu Summer Daily Necessities Co., Ltd.",
      },
    },
  })),
};

export default function ProductsPage() {
  return (
    <main className="catalog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productCollectionSchema).replace(/</g, "\\u003c") }}
      />
      <header className="catalog-header">
        <a className="brand" href="/" aria-label="Return to the Yiwu Summer homepage">
          <span className="brand-mark brand-logo brand-logo-complete" aria-hidden="true"><img src="/brand/alonrunlife-full-logo-transparent.png" alt="" /></span>
          <span><strong>YIWU SUMMER</strong><small>PRODUCT COLLECTION SPACE</small></span>
        </a>
        <div className="catalog-header-actions"><a className="catalog-back-link" href="/">← Back to Home</a><HeaderActions /></div>
      </header>
      <section className="catalog-hero">
        <img className="catalog-hero-pets" src="/hero/cat-dog-studio.png" alt="Golden Retriever and American Shorthair cat" />
        <div className="catalog-hero-shade" aria-hidden="true" />
        <div className="catalog-hero-copy">
          <p>YIWU SUMMER · B2B PET PRODUCT SOURCING</p>
          <h1>Pet Product Collection<br /><span>A Dedicated B2B Sourcing Space</span></h1>
          <p className="catalog-hero-intro">A curated selection of grooming, feeding, sleeping, walking, hygiene, apparel, and play products for importers, distributors, and online wholesalers.</p>
          <div className="catalog-hero-meta">
            <span><strong>10</strong><small>PRODUCT CATEGORIES</small></span>
            <a href="#product-categories">Browse Product Categories <b aria-hidden="true">↗</b></a>
          </div>
        </div>
        <div className="catalog-hero-caption"><span>FACTORY CURATED</span><small>Selected for global wholesale buyers</small></div>
      </section>
      <ProductCatalog />
      <footer className="catalog-footer"><a href="/">YIWU SUMMER</a><p>Yiwu Summer Daily Necessities Co., Ltd.</p><a href="/#contact">Submit Sourcing Requirements ↗</a></footer>
    </main>
  );
}
