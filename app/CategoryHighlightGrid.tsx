"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PreviewProduct = { name: string; image: string };
type HighlightCategory = {
  id: string;
  name: string;
  image: string;
  tone: string;
  products: PreviewProduct[];
};
type PanelPosition = { left: number; top: number };

export default function CategoryHighlightGrid({ categories }: { categories: HighlightCategory[] }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<HighlightCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PreviewProduct | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const [position, setPosition] = useState<PanelPosition>({ left: 16, top: 16 });
  const panelRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openPreview = (category: HighlightCategory, element: HTMLElement) => {
    cancelClose();
    if (active?.id !== category.id) setSelectedProduct(null);
    setAnchor(element.getBoundingClientRect());
    setActive(category);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setActive(null);
      setSelectedProduct(null);
    }, 180);
  };

  useEffect(() => () => cancelClose(), []);

  useLayoutEffect(() => {
    if (!active || !anchor || !panelRef.current) return;

    const placePanel = () => {
      const panel = panelRef.current;
      if (!panel) return;

      const gap = 14;
      const edge = 16;
      const panelRect = panel.getBoundingClientRect();
      const maxLeft = Math.max(edge, window.innerWidth - panelRect.width - edge);
      const maxTop = Math.max(edge, window.innerHeight - panelRect.height - edge);
      const centeredLeft = anchor.left + anchor.width / 2 - panelRect.width / 2;
      const left = Math.min(maxLeft, Math.max(edge, centeredLeft));
      const fitsBelow = anchor.bottom + gap + panelRect.height <= window.innerHeight - edge;
      const fitsAbove = anchor.top - gap - panelRect.height >= edge;
      let top: number;

      if (fitsBelow) top = anchor.bottom + gap;
      else if (fitsAbove) top = anchor.top - panelRect.height - gap;
      else top = Math.min(maxTop, Math.max(edge, anchor.top + anchor.height / 2 - panelRect.height / 2));

      setPosition({ left, top });
    };

    placePanel();
    window.addEventListener("resize", placePanel);
    window.addEventListener("scroll", placePanel, true);
    return () => {
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", placePanel, true);
    };
  }, [active, anchor]);

  return (
    <>
      <div className="category-highlight-grid" aria-label="Pet product category highlights">
        {categories.map((category) => (
          <article className="category-highlight-entry" key={category.id}>
            <a
              className="category-highlight-item"
              href={`/products#${category.id}`}
              onPointerEnter={(event) => openPreview(category, event.currentTarget)}
              onPointerLeave={scheduleClose}
              onFocus={(event) => openPreview(category, event.currentTarget)}
              onBlur={scheduleClose}
            >
              <span className={`category-highlight-circle tone-${category.tone}`}>
                <img src={category.image} alt={`${category.name} representative product`} loading="lazy" />
              </span>
              <strong>{category.name}</strong>
              <small>View category <span aria-hidden="true">↗</span></small>
            </a>
          </article>
        ))}
      </div>

      {mounted && active && createPortal(
        <aside
          ref={panelRef}
          className="category-preview-panel category-preview-floating"
          style={{ left: position.left, top: position.top }}
          aria-label={`${active.name} product preview`}
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
          onFocus={cancelClose}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose();
          }}
        >
          <div className="category-preview-heading">
            <div><span>QUICK CATEGORY PREVIEW</span><strong>{active.name}</strong></div>
            <small>{active.products.length} products</small>
          </div>
          <div className="category-preview-products">
            {active.products.map((product, index) => (
              <button
                type="button"
                className="category-preview-product"
                key={`${product.image}-${index}`}
                onClick={() => setSelectedProduct(product)}
                aria-label={`Show inquiry contacts for ${product.name}`}
              >
                <span><img src={product.image} alt="" loading="lazy" /></span>
                <strong>{product.name}</strong>
              </button>
            ))}
          </div>
          <a className="category-preview-link" href={`/products#${active.id}`}>
            Explore the complete category <span aria-hidden="true">↗</span>
          </a>

          {selectedProduct && (
            <div className="category-product-contact" role="dialog" aria-label={`Inquiry contacts for ${selectedProduct.name}`}>
              <button
                type="button"
                className="category-contact-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Return to product preview"
              >
                ← Back to products
              </button>
              <div className="category-contact-product">
                <span><img src={selectedProduct.image} alt="" /></span>
                <div><small>PRODUCT INQUIRY</small><strong>{selectedProduct.name}</strong></div>
              </div>
              <div className="category-contact-details">
                <a
                  className="category-contact-whatsapp"
                  href={`https://wa.me/8619846619853?text=${encodeURIComponent(`Hello, I would like to inquire about ${selectedProduct.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <small>WhatsApp Number</small><strong>+86 19846619853</strong>
                </a>
                <a
                  className="category-contact-email"
                  href={`mailto:zhangyao@summerpet.com.cn?subject=${encodeURIComponent(`Inquiry about ${selectedProduct.name}`)}`}
                >
                  <small>Inquiry Email</small><strong>zhangyao@summerpet.com.cn</strong>
                </a>
              </div>
              <div className="category-contact-company">
                <span>Company</span><strong>Yiwu Summer Daily Necessities Co., Ltd.</strong>
              </div>
            </div>
          )}
        </aside>,
        document.body,
      )}
    </>
  );
}
