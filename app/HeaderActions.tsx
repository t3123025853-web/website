"use client";

import { useEffect, useRef, useState } from "react";

type OpenContact = "whatsapp" | "inquiry" | null;

export default function HeaderActions() {
  const [open, setOpen] = useState<OpenContact>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutside = (event: PointerEvent) => {
      if (!actionsRef.current?.contains(event.target as Node)) setOpen(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggle = (contact: Exclude<OpenContact, null>) => setOpen((current) => current === contact ? null : contact);

  return (
    <div className="header-actions" ref={actionsRef}>
      <div className={`header-contact whatsapp-contact${open === "whatsapp" ? " is-open" : ""}`}>
        <button className="whatsapp-button" type="button" aria-expanded={open === "whatsapp"} aria-controls="whatsapp-contact-popover" onClick={() => toggle("whatsapp")}>
          <span className="whatsapp-icon" aria-hidden="true">☎</span><span className="whatsapp-label">WhatsApp</span>
        </button>
        <div className="header-contact-popover whatsapp-popover" id="whatsapp-contact-popover" role="status" aria-hidden={open !== "whatsapp"}>
          <span>WhatsApp Number</span><strong>+86 19846619853</strong>
        </div>
      </div>
      <div className={`header-contact inquiry-contact${open === "inquiry" ? " is-open" : ""}`}>
        <button className="header-cta" type="button" aria-expanded={open === "inquiry"} aria-controls="inquiry-contact-popover" onClick={() => toggle("inquiry")}>
          <span className="inquiry-icon" aria-hidden="true">✉</span><span>Send Inquiry</span>
        </button>
        <div className="header-contact-popover inquiry-popover" id="inquiry-contact-popover" role="status" aria-hidden={open !== "inquiry"}>
          <span>Inquiry Email</span><strong>zhangyao@summerpet.com.cn</strong>
        </div>
      </div>
    </div>
  );
}