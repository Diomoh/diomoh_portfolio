"use client";

import { useEffect, useState } from "react";

const INTERVAL = 3200;

// Mots qui se succèdent : le suivant descend du haut et pousse l'actuel vers le bas, lentement.
export default function RotatingWords({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), INTERVAL);
    return () => clearInterval(id);
  }, [words.length]);

  const prev = (index - 1 + words.length) % words.length;

  return (
    <span className={`-my-[0.12em] inline-grid overflow-hidden py-[0.12em] align-bottom ${className}`} aria-live="polite">
      {words.map((w, i) => (
        <span
          key={w}
          aria-hidden={i !== index}
          // Le mot actif et le précédent glissent ensemble (le nouveau pousse l'ancien vers le bas) ;
          // les mots en attente repartent en haut sans transition pour ne pas traverser la zone visible.
          className={`col-start-1 row-start-1 whitespace-nowrap ${
            i === index
              ? "translate-y-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              : i === prev
                ? "translate-y-[140%] transition-transform duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                : "invisible -translate-y-[140%] transition-none"
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
