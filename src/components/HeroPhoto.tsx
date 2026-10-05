"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

// Photo en couleur ; au survol, un halo la passe en noir et blanc sous le curseur.
export default function HeroPhoto({ src, alt, className }: { src: StaticImageData; alt: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector("img");
    if (!img) return;
    const box = img.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - box.left}px`);
    el.style.setProperty("--y", `${e.clientY - box.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerEnter={(e) => {
        move(e);
        ref.current?.classList.add("is-revealing");
      }}
      onPointerLeave={() => ref.current?.classList.remove("is-revealing")}
      className="hero-photo absolute inset-0"
    >
      <Image src={src} alt={alt} preload sizes="(min-width: 1024px) 50vw, 100vw" className={`photo-in ${className}`} />
      <Image src={src} alt="" aria-hidden sizes="(min-width: 1024px) 50vw, 100vw" className={`hero-photo-color grayscale contrast-[1.12] ${className}`} />
    </div>
  );
}
