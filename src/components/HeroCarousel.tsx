"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Content } from "@/content/fr";
import { ArrowRight } from "./icons";

const DURATION = 6000;

// Carrousel du hero : message de bienvenue, puis bloc Projets. Pause au survol.
export default function HeroCarousel({ welcome, projects }: { welcome: Content["hero"]["welcome"]; projects: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % 2), DURATION);
    return () => clearTimeout(id);
  }, [index, paused]);

  const words = welcome.title.slice(0, welcome.title.length - welcome.highlight.length).trim().split(" ");

  const slide = (i: number) =>
    `col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
      index === i ? "translate-x-0 opacity-100" : `pointer-events-none opacity-0 ${i < index ? "-translate-x-8" : "translate-x-8"}`
    }`;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid grid-cols-[minmax(0,1fr)]">
        {/* Bloc 1 : bienvenue */}
        <div className={`${slide(0)} h-full`} aria-hidden={index !== 0}>
          <div key={index} className="flex h-full flex-col items-start justify-start text-left lg:justify-center">
            <p className="font-display text-[clamp(30px,3.2vw,50px)] leading-[1.12] font-semibold tracking-[-0.04em]">
              {words.map((w, k) => (
                <span key={k} className="fade-up inline-block pr-[0.25em]" style={{ animationDelay: `${k * 70}ms` }}>
                  {w}
                </span>
              ))}
              <span className="fade-up rounded-md bg-primary px-[0.15em] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]" style={{ animationDelay: `${words.length * 70}ms` }}>
                {welcome.highlight}
              </span>
            </p>
            <p className="fade-up mt-5 max-w-[46ch] text-base leading-relaxed text-white/65" style={{ animationDelay: `${(words.length + 2) * 70}ms` }}>
              {welcome.text}
            </p>
          </div>
        </div>

        {/* Bloc 2 : projets */}
        <div className={slide(1)} aria-hidden={index !== 1}>
          {projects}
        </div>
      </div>

      {/* Boutons communs aux deux blocs */}
      <div className="fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: "900ms" }}>
        <a href="#contact" data-guide="hero" className="group inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pr-1.5 pl-5 text-sm font-semibold text-white transition hover:bg-white hover:text-ink">
          {welcome.ctaPrimary}
          <span className="grid size-9 place-items-center rounded-full bg-white text-primary transition group-hover:bg-primary group-hover:text-white">
            <ArrowRight className="size-4" />
          </span>
        </a>
        <a href="#projects" className="inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-ink">
          {welcome.ctaSecondary}
        </a>
      </div>
    </div>
  );
}
