"use client";

import { useEffect, useState } from "react";
import recoveredProductsData from "./recovered-products.json";

type ProductItem = {
  name: string;
  english: string;
  image: string;
  tone: string;
};

type Category = {
  id: string;
  number: string;
  title: string;
  english: string;
  description: string;
  products: ProductItem[];
};

type RecoveredProduct = ProductItem & { categoryId: string };
const recoveredProducts = recoveredProductsData as RecoveredProduct[];
const recoveredFor = (categoryId: string): ProductItem[] =>
  recoveredProducts.filter((product) => product.categoryId === categoryId);

const categories: Category[] = [
  {
    id: "cleaning",
    number: "01",
    title: "Pet Grooming & Cleaning",
    english: "GROOMING & CLEANING",
    description: "Grooming, deshedding, cleaning, bathing, and massage products for cats and dogs.",
    products: [
      { name: "Pet Grooming Glove Collection", english: "Mesh Cleaning & Massage Gloves", image: "/products/pet-grooming-assortment-white.png", tone: "peach" },
      { name: "Pet Pin Brush", english: "Oval-Head Grooming Brush", image: "/products/pet-pin-brush-source.png", tone: "sky" },
      { name: "Double-Sided Metal Comb", english: "Dual-Tooth Grooming Comb", image: "/products/pet-double-comb-clean-2.png", tone: "mint" },
      { name: "Wide Grooming Brush", english: "Wide-Head Slicker Brush", image: "/products/pet-wide-slicker-clean-2.png", tone: "yellow" },
      { name: "Grey Cat-Paw Cleaning Glove", english: "Paw-Pattern Mesh Glove", image: "/products/cat-paw-glove-grey.png", tone: "peach" },
      { name: "Pet Bath Massage Brush", english: "Refillable Massage Brush", image: "/products/pet-bath-brush-green.png", tone: "mint" },
      ...recoveredFor("cleaning"),
    ],
  },
  { id: "feeding", number: "02", title: "Pet Feeding & Hydration", english: "FEEDERS & DRINKING", description: "Food bowls, water bowls, drinking systems, and everyday feeding accessories.", products: recoveredFor("feeding") },
  { id: "beds", number: "03", title: "Pet Beds & Mats", english: "SLEEP & COMFORT", description: "Pet beds, mats, cushions, and products designed for comfortable rest.", products: recoveredFor("beds") },
  { id: "leashes", number: "04", title: "Leashes, Harnesses & Collars", english: "WALKING & TRAVEL", description: "Leashes, harnesses, collars, and accessories for walking and travel.", products: recoveredFor("leashes") },
  { id: "toilets", number: "05", title: "Pet Toilets & Litter Boxes", english: "TOILET & LITTER", description: "Litter boxes, training toilets, and related hygiene accessories.", products: recoveredFor("toilets") },
  { id: "waste", number: "06", title: "Pet Waste Management", english: "WASTE & CLEANUP", description: "Waste pickup, bag storage, disposal, and cleanup products.", products: recoveredFor("waste") },
  { id: "toys", number: "07", title: "Pet Toys", english: "PLAY & ENRICHMENT", description: "Interactive, chewing, enrichment, and everyday play products.", products: recoveredFor("toys") },
  { id: "apparel", number: "08", title: "Pet Apparel", english: "APPAREL & ACCESSORIES", description: "Pet clothing, warming garments, and styling accessories.", products: recoveredFor("apparel") },
  { id: "others", number: "09", title: "Other Pet Supplies", english: "MORE PET PRODUCTS", description: "Additional pet products suitable for international wholesale channels.", products: recoveredFor("others") },
  { id: "christmas-gifts", number: "10", title: "Christmas Gifts for Pets", english: "SEASONAL GIFT COLLECTIONS", description: "Festive advent calendars, multi-piece toy assortments, and holiday gift sets for cats and dogs.", products: recoveredFor("christmas-gifts") },
];

export default function ProductCatalog() {
  const [selectedId, setSelectedId] = useState("cleaning");
  const selected = categories.find((category) => category.id === selectedId) ?? categories[0];

  useEffect(() => {
    const showLinkedCategory = () => {
      const hash = window.location.hash.replace("#", "");
      if (!categories.some((category) => category.id === hash)) return;

      setSelectedId(hash);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.querySelector(".catalog-gallery-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    };

    showLinkedCategory();
    window.addEventListener("hashchange", showLinkedCategory);
    return () => window.removeEventListener("hashchange", showLinkedCategory);
  }, []);

  const selectCategory = (id: string) => {
    setSelectedId(id);
    window.history.replaceState(null, "", "/products#" + id);
    window.requestAnimationFrame(() => {
      document.querySelector(".catalog-gallery-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <section className="catalog-category-section" id="product-categories" aria-labelledby="factory-selection-title">
        <div className="factory-quality-label" id="factory-selection-title">
          <span aria-hidden="true">◆</span> Factory-Selected Quality Pet Products <span aria-hidden="true">◆</span>
        </div>
        <div className="catalog-category-grid" role="list" aria-label="Pet product categories">
          {categories.map((category) => (
            <button
              type="button"
              role="listitem"
              key={category.id}
              className={"catalog-category-card" + (selectedId === category.id ? " is-active" : "")}
              aria-pressed={selectedId === category.id}
              aria-label={`Explore ${category.title}`}
              onClick={() => selectCategory(category.id)}
            >
              <span className="catalog-category-hover catalog-bt-1" aria-hidden="true" />
              <span className="catalog-category-hover catalog-bt-2" aria-hidden="true" />
              <span className="catalog-category-hover catalog-bt-3" aria-hidden="true" />
              <span className="catalog-category-hover catalog-bt-4" aria-hidden="true" />
              <span className="catalog-category-hover catalog-bt-5" aria-hidden="true" />
              <span className="catalog-category-hover catalog-bt-6" aria-hidden="true" />
              <span className="catalog-category-surface">
                <span className="catalog-category-number">{category.number}</span>
                <span className="catalog-category-copy">
                  <strong>{category.title}</strong>
                  <small>{category.english}</small>
                </span>
                <span className="catalog-category-arrow" aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="catalog-gallery-section" id="selected-category-products" aria-live="polite">
        <div className="catalog-gallery-heading">
          <div><span>{selected.number} · {selected.english}</span><h2>{selected.title}</h2></div>
          <p>{selected.description}</p>
        </div>

        {selected.products.length > 0 ? (
          <div className="catalog-product-grid">
            {selected.products.map((product, index) => (
              <article className={"catalog-product-card catalog-tone-" + product.tone} key={product.image}>
                <div className="catalog-product-visual"><img src={product.image} alt={product.name} /></div>
                <div className="catalog-product-copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{product.name}</h3><p>{product.english}</p></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <span>{selected.number}</span>
            <div>
              <strong>{selected.title} Collection Coming Soon</strong>
              <p>New wholesale products are being prepared. Contact our team for the current sourcing catalogue and available customization options.</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
