"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "./icons";

type Category = { label: string; count: number };

const ROW = 52;

export default function WorksList({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(2);
  const [hovering, setHovering] = useState(false);

  // Fait défiler la ligne active tant que le visiteur ne survole pas la liste.
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => setActive((a) => (a + 1) % categories.length), 2800);
    return () => clearInterval(id);
  }, [hovering, categories.length]);

  return (
    <div className="relative" onMouseLeave={() => setHovering(false)}>
      <ul>
        {categories.map((cat, i) => {
          const isActive = i === active;
          return (
            <li key={cat.label}>
              <a
                href="#projects"
                onMouseEnter={() => {
                  setHovering(true);
                  setActive(i);
                }}
                onFocus={() => setActive(i)}
                style={{ height: ROW }}
                className={`relative flex items-center justify-between overflow-hidden border-b border-white/10 transition-colors duration-300 ${
                  isActive ? "bg-primary -mx-2 rounded-[3px] px-2 text-white" : "text-white/85"
                }`}
              >
                {isActive ? (
                  <span className="flex min-w-0 flex-1 overflow-hidden">
                    <span className="animate-marquee flex shrink-0 items-center gap-3 pr-3 text-lg font-medium whitespace-nowrap italic sm:text-xl">
                      {Array.from({ length: 8 }).map((_, k) => (
                        <span key={k} className="flex items-center gap-3" aria-hidden={k > 0}>
                          {cat.label} <ArrowRight className="size-4" />
                        </span>
                      ))}
                    </span>
                  </span>
                ) : (
                  <span className="text-lg sm:text-xl">{cat.label}</span>
                )}
                <span className={`pl-4 text-sm tabular-nums ${isActive ? "text-base font-bold italic" : "text-white/40"}`}>
                  {String(cat.count).padStart(2, "0")}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
