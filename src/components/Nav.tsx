"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/content/fr";
import type { Locale } from "@/i18n/config";
import LangSelect from "./LangSelect";
import { ArrowUpRight } from "./icons";

export default function Nav({ lang, nav }: { lang: Locale; nav: Content["nav"] }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["#about", nav.about],
    ["#projects", nav.projects],
    ["#skills", nav.skills],
    ["#services", nav.services],
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"
      }`}
    >
      <nav className="flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-white/10 bg-ink/80 py-2 pr-2 pl-5 text-white shadow-2xl shadow-black/20 backdrop-blur-xl">
        <a href="#top" className="font-display text-lg font-bold italic">
          MD<span className="text-primary">.</span>
        </a>
        <ul className="hidden items-center gap-1 text-sm text-white/70 md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <LangSelect lang={lang} label={nav.language} dark />
          <a href="#contact" className="bg-primary hidden items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white sm:flex">
            {nav.cta} <ArrowUpRight className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-full bg-white/10 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-white transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-white transition ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>
      {open && (
        <ul className="absolute top-16 right-3 left-3 grid gap-1 rounded-3xl bg-ink/95 p-3 text-white backdrop-blur-xl md:hidden">
          {[...links, ["#contact", nav.contact] as const].map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg hover:bg-white/10">
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
