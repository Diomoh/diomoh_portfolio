"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Content, Project } from "@/content/fr";
import MockScreen from "./MockScreen";
import { splitWords } from "./SplitWords";
import Underline from "./Underline";
import { ArrowRight, ArrowUpRight, Lock } from "./icons";

// Fond plein des projets sans capture d'écran (texte clair ou foncé selon la couleur).
const solid: Record<string, { bg: string; dark: boolean }> = {
  dpi: { bg: "bg-ink", dark: true },
  clinarchive: { bg: "bg-teal", dark: false },
  ecolys: { bg: "bg-yellow", dark: false },
  hubtobe: { bg: "bg-pink", dark: false },
  tuyo: { bg: "bg-primary", dark: true },
};

function Background({ project, active }: { project: Project; active: boolean }) {
  if (project.image) {
    return (
      <>
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className={`object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${active ? "scale-100" : "scale-110"}`}
        />
        <span className={`absolute inset-0 bg-ink transition-opacity duration-700 ${active ? "opacity-0" : "opacity-60"}`} />
      </>
    );
  }
  return (
    <span className={`absolute inset-0 grid place-items-center ${solid[project.id]?.bg ?? "bg-ink"}`}>
      <span className={`flex items-end transition-all duration-700 ${active ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
        <MockScreen kind={project.preview} className="w-[200px] -rotate-6 sm:w-[240px]" />
        <MockScreen kind="mobile" className="-ml-10 w-[130px] translate-y-6 rotate-6 sm:w-[160px]" />
      </span>
    </span>
  );
}

// Panneaux en accordéon : le projet actif s'ouvre en grand avec sa capture ; les autres se réduisent en bandes avec leur nom.
export default function Projects({ projects }: { projects: Content["projects"] }) {
  const items = projects.items;
  const [active, setActive] = useState(0);
  const start = useRef<number | null>(null);
  const trackRef = useRef<HTMLElement>(null);
  const n = items.length;

  // Sur grand écran, la section reste fixée et le défilement fait passer d'un projet à l'autre.
  const pinned = () => window.matchMedia("(min-width: 1024px)").matches;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track || !pinned()) return;
      const { top, height } = track.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -top / (height - window.innerHeight)));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  // Aller à un projet : en mode fixé, on fait défiler jusqu'à sa tranche ; sinon on change directement.
  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const target = (i + n) % n;
      if (!track || !pinned()) return setActive(target);
      const top = track.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + ((target + 0.5) / n) * (track.offsetHeight - window.innerHeight), behavior: "smooth" });
    },
    [n],
  );
  const go = (dir: number) => goTo(active + dir);

  return (
    <section id="projects" ref={trackRef} style={{ ["--n" as string]: n }} className="relative lg:h-[calc(100svh+(var(--n)-1)*70svh)]">
      <div className="shell py-24 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      {/* En-tête */}
      <div className="grid items-end gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div data-reveal>
          <h2 data-split data-guide="projects" className="font-display text-[clamp(36px,4.6vw,64px)] leading-[1.05] font-normal tracking-[-0.04em]">
            {splitWords(
              <>
                {projects.title[0]}{" "}
                <span className="font-semibold">
                  <Underline>{projects.title[1]}</Underline>
                </span>{" "}
                {projects.title[2]}
              </>,
            )}
          </h2>
        </div>
        <div data-reveal style={{ ["--delay" as string]: "100ms" }}>
          <p className="max-w-md text-ink/65">{projects.text}</p>
          <a href="#contact" className="group mt-6 inline-flex items-center gap-4 rounded-full bg-ink py-1.5 pr-1.5 pl-6 font-medium text-white transition hover:bg-primary">
            {projects.cta}
            <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>
      </div>

      {/* Panneaux */}
      <div
        data-reveal="rise"
        className="mt-12 flex touch-pan-y flex-col gap-2 select-none sm:gap-3 lg:h-[min(520px,58svh)] lg:flex-row"
        onPointerDown={(e) => (start.current = e.clientX)}
        onPointerUp={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          start.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {items.map((p, i) => {
          const on = i === active;
          const light = !p.image && solid[p.id] && !solid[p.id].dark;
          return (
            <article
              key={p.id}
              onClick={() => !on && goTo(i)}
              tabIndex={0}
              aria-current={on ? "true" : undefined}
              aria-label={p.name}
              style={{ ["--i" as string]: i }}
              className={`relative isolate min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-[24px] outline-none transition-[flex,height,transform,box-shadow] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] focus-visible:ring-4 focus-visible:ring-primary/40 ${
                on ? "h-[480px] -translate-y-2 cursor-default shadow-[0_32px_60px_-24px_rgba(13,13,14,0.5)] lg:h-auto lg:flex-[1_1_0%]" : "h-[52px] lg:h-auto lg:flex-[0_0_76px]"
              }`}
            >
              <Background project={p} active={on} />

              {/* Bande réduite : nom du site */}
              <span
                className={`absolute inset-0 flex items-center px-5 transition-opacity duration-500 lg:items-end lg:justify-center lg:px-0 lg:pb-7 ${
                  on ? "pointer-events-none opacity-0" : "opacity-100 delay-200"
                } ${light ? "text-ink" : "text-white"}`}
              >
                <span className="font-display text-lg font-semibold tracking-[-0.02em] whitespace-nowrap lg:rotate-180 lg:text-2xl lg:[writing-mode:vertical-rl]">
                  {p.short}
                </span>
              </span>

              {/* Panneau ouvert : lien vers le site (ou mention « privé ») */}
              <div
                className={`absolute bottom-3 left-3 transition-all duration-700 sm:bottom-5 sm:left-5 ${
                  on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    tabIndex={on ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                    className="group/visit inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-5 text-sm font-semibold text-ink transition hover:bg-primary hover:text-white"
                  >
                    {projects.visit}
                    <span className="grid size-9 place-items-center rounded-full bg-primary text-white transition group-hover/visit:bg-white group-hover/visit:text-primary">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </a>
                ) : p.isPrivate ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-medium text-ink/60">
                    <Lock className="size-3.5" /> {projects.privateLabel}
                  </span>
                ) : null}
              </div>

              {/* Projet suivant */}
              <button
                type="button"
                aria-label={projects.next}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                tabIndex={on ? 0 : -1}
                className={`absolute right-3 bottom-3 grid size-12 place-items-center rounded-full bg-ink text-white transition-all duration-500 hover:bg-primary sm:right-5 sm:bottom-5 ${
                  on ? "scale-100 opacity-100 delay-300" : "pointer-events-none scale-50 opacity-0"
                }`}
              >
                <ArrowRight className="size-5" />
              </button>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
}
