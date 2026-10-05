"use client";

import { useState } from "react";
import type { Content } from "@/content/fr";
import { ArrowUpRight, Sparkle } from "./icons";

/* Mini-animations, une par principe */

// 01 · Blocs d'architecture qui s'empilent
function StackVisual() {
  return (
    <div className="flex h-full w-24 flex-col-reverse gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="block" style={{ width: `${100 - i * 18}%`, opacity: 0.9 - i * 0.2 }}>
          <span className="stack-block block h-4 rounded-md bg-current" style={{ animationDelay: `${i * 0.35}s` }} />
        </span>
      ))}
    </div>
  );
}

// 02 · Écran web + téléphone, un curseur parcourt l'interface
function ScreensVisual() {
  return (
    <div className="relative flex items-end gap-2">
      <div className="h-16 w-24 rounded-md border-2 border-current p-1.5">
        <span className="block h-1.5 w-1/2 rounded bg-current opacity-80" />
        <span className="mt-1 block h-1 w-3/4 rounded bg-current opacity-40" />
        <span className="mt-2 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-3 rounded-sm bg-current opacity-25" />
          ))}
        </span>
      </div>
      <div className="h-[72px] w-9 rounded-lg border-2 border-current p-1">
        <span className="mx-auto block h-0.5 w-3 rounded bg-current opacity-70" />
        {[0, 1, 2].map((i) => (
          <span key={i} className="mt-1.5 block h-1.5 rounded-sm bg-current opacity-30" />
        ))}
      </div>
      <span className="cursor-path absolute top-0 left-0 size-2.5 rounded-full bg-current ring-4 ring-current/20" />
    </div>
  );
}

// 03 · Lignes de code écrites par un agent IA
function AiVisual() {
  return (
    <div className="w-28">
      <Sparkle className="ai-spark size-5" />
      {[80, 60, 92].map((w, i) => (
        <span key={i} className="mt-2 block h-1.5 rounded bg-current/15">
          <span className="ai-line block h-full rounded bg-current" style={{ width: `${w}%`, animationDelay: `${i * 0.6}s` }} />
        </span>
      ))}
    </div>
  );
}

// 04 · Étapes du projet, du cadrage à la mise en production
function StepsVisual() {
  return (
    <div className="relative flex w-28 items-center justify-between">
      <span className="absolute inset-x-1 top-1/2 h-0.5 -translate-y-1/2 bg-current/20" />
      <span className="steps-fill absolute inset-x-1 top-1/2 h-0.5 origin-left -translate-y-1/2 bg-current" />
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="steps-dot relative size-3 rounded-full border-2 border-current" style={{ animationDelay: `${i * 0.75}s` }} />
      ))}
    </div>
  );
}

const visuals = [StackVisual, ScreensVisual, AiVisual, StepsVisual];

type Principle = Content["intro"]["principles"][number];

// 4 colonnes : la carte active (survol, focus ou toucher) passe en noir, s'élargit et descend.
export default function PrinciplesGrid({ principles }: { principles: Principle[] }) {
  const [active, setActive] = useState(0);

  return (
    <ol data-reveal="rise" className="mt-10 flex flex-col gap-2 lg:mt-14 lg:h-[560px] lg:flex-row lg:items-start" onMouseLeave={() => setActive(0)}>
      {principles.map((p, i) => {
        const on = i === active;
        const Visual = visuals[i % visuals.length];
        return (
          <li
            key={p.title}
            tabIndex={0}
            style={{ ["--i" as string]: i }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[28px] p-7 text-white outline-none transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] sm:p-9 lg:min-w-0 ${
              on ? "bg-ink lg:mt-[70px] lg:h-[490px] lg:flex-[1.45]" : "bg-primary lg:mt-0 lg:h-[560px] lg:flex-1"
            }`}
          >
            {/* Numéro + flèche */}
            <div className="flex items-start justify-between gap-4">
              <span
                className={`font-display leading-none tracking-[-0.04em] transition-all duration-700 ${
                  on ? "text-5xl font-bold sm:text-6xl" : "font-mono text-lg text-white/70"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-xl transition-all duration-500 sm:size-14 ${
                  on ? "bg-primary text-white" : "bg-white text-primary"
                }`}
              >
                <ArrowUpRight className={`size-5 transition-transform duration-500 ${on ? "rotate-45" : ""}`} />
              </span>
            </div>

            {/* Mini-animation : visible seulement sur la carte active */}
            <div
              className={`grid transition-all duration-700 ${on ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}
              aria-hidden
            >
              <div className="overflow-hidden">
                <div className="flex h-24 items-center text-primary">
                  <Visual />
                </div>
              </div>
            </div>

            <h3
              className={`mt-6 font-display leading-[1.08] font-bold tracking-[-0.03em] transition-all duration-700 ${
                on ? "text-[clamp(26px,2.3vw,36px)]" : "text-[clamp(22px,1.8vw,28px)]"
              }`}
            >
              {p.title}
            </h3>
            <p className={`mt-5 text-[15px] leading-[1.9] transition-colors duration-700 ${on ? "text-white/70" : "text-white/80"}`}>{p.text}</p>

            <div className="mt-auto flex items-center gap-2 pt-6 text-xs font-semibold tracking-[0.14em] uppercase">
              {p.tag}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
