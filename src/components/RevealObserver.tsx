"use client";

import { useEffect } from "react";

// Ajoute .is-visible aux éléments [data-reveal] quand ils entrent dans l'écran.
export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -18% 0px" },
    );
    document.querySelectorAll("[data-reveal], [data-split]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
