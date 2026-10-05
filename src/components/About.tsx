"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/content/fr";

// Défilement vertical converti en défilement horizontal : un mot géant par étape.
export default function About({ about }: { about: Content["about"] }) {
  const { steps } = about;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const { top, height } = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -top / (height - window.innerHeight)));
      track.style.transform = `translate3d(${-progress * (track.scrollWidth - window.innerWidth)}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setActive(Math.round(progress * (steps.length - 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  return (
    <section id="about" ref={sectionRef} style={{ height: `${steps.length * 100}svh` }} className="relative motion-reduce:!h-auto">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden motion-reduce:static motion-reduce:h-auto">
        {/* En-tête : compteur + libellé */}
        <div data-reveal data-guide="method" className="flex items-center justify-between shell pt-24">
          <div className="font-display text-sm font-semibold tabular-nums">
            <span className="text-primary">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-ink/30"> / {String(steps.length).padStart(2, "0")}</span>
          </div>
          <div className="text-xs font-semibold tracking-[0.22em] text-ink/50 uppercase">{about.eyebrow}</div>
        </div>

        {/* Piste horizontale */}
        <div
          ref={trackRef}
          className="flex flex-1 items-center will-change-transform motion-reduce:flex-col motion-reduce:items-stretch motion-reduce:py-16"
        >
          {steps.map((step, i) => (
            <article
              key={step.word}
              className={`w-[82vw] shrink-0 shell-l pr-5 transition-opacity duration-500 sm:pr-10 lg:w-[72vw] motion-reduce:w-auto motion-reduce:py-8 ${
                i === active ? "opacity-100" : "opacity-25"
              } motion-reduce:opacity-100`}
            >
              <h3 className="font-display text-[clamp(64px,15vw,260px)] leading-[0.85] font-bold tracking-[-0.055em]">
                {step.word}
                <span className="text-primary">.</span>
              </h3>
              <span
                className={`bg-primary mt-6 block h-1.5 origin-left rounded-full transition-transform duration-700 ${
                  i === active ? "scale-x-100" : "scale-x-0"
                } w-32 sm:w-48 motion-reduce:scale-x-100`}
              />
              <p className="mt-6 max-w-md text-xl text-ink/70 sm:text-2xl">{step.text}</p>
            </article>
          ))}
        </div>

        {/* Progression */}
        <div className="flex items-center gap-4 shell pb-10 motion-reduce:hidden">
          <div className="flex gap-2">
            {steps.map((step, i) => (
              <span key={step.word} className={`size-2.5 rounded-full transition-colors ${i <= active ? "bg-ink" : "bg-ink/15"}`} />
            ))}
          </div>
          <div className="h-px flex-1 bg-ink/10">
            <span ref={barRef} className="bg-primary block h-px origin-left scale-x-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
