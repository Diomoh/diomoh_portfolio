"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { Check, FlagFR, FlagUK } from "./icons";

// Noms des langues dans leur propre langue (autonymes).
const languages: Record<Locale, { name: string; Flag: typeof FlagFR }> = {
  fr: { name: "Français", Flag: FlagFR },
  en: { name: "English", Flag: FlagUK },
};

// Petit sélecteur de langue : affiche la langue active et la liste des langues disponibles.
export default function LangSelect({ lang, label, dark = false }: { lang: Locale; label: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Current = languages[lang].Flag;

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold transition ${
          dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5"
        }`}
      >
        <Current className="size-4 rounded-full" />
        {lang.toUpperCase()}
        <svg viewBox="0 0 24 24" className={`size-3 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul role="listbox" aria-label={label} className="fade-up absolute top-full left-0 z-50 mt-2 w-40 overflow-hidden rounded-xl bg-white p-1 text-ink shadow-xl shadow-black/20 ring-1 ring-ink/5">
          {locales.map((l) => {
            const { name, Flag } = languages[l];
            return (
              <li key={l} role="option" aria-selected={l === lang}>
                <Link
                  href={`/${l}`}
                  hrefLang={l}
                  scroll={false}
                  onClick={() => {
                    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition hover:bg-ink/5 ${l === lang ? "font-semibold" : ""}`}
                >
                  <Flag className="size-4 rounded-full" />
                  <span className="flex-1">{name}</span>
                  {l === lang && <Check className="size-4 text-primary" />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
