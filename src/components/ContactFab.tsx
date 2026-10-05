"use client";

import { useState, type ReactNode } from "react";
import { Chat, Close, GmailLogo, LinkedInLogo, WhatsApp } from "./icons";

const RADIUS = 76;
// Positions en arc autour du bouton : gauche, diagonale, haut.
const ANGLES = [180, 225, 270];

type Props = { label: string; email: string; whatsapp: string; linkedin: string };
type Item = { label: string; href: string; className: string; icon: ReactNode };

// Bouton flottant de contact : s'ouvre en arc (WhatsApp, Gmail, LinkedIn).
export default function ContactFab({ label, email, whatsapp, linkedin }: Props) {
  const [open, setOpen] = useState(false);

  const items: Item[] = [
    { label: "WhatsApp", href: `https://wa.me/${whatsapp}`, className: "bg-[#25D366] text-white", icon: <WhatsApp className="size-[22px]" /> },
    { label: "Gmail", href: `mailto:${email}`, className: "bg-white", icon: <GmailLogo className="size-[22px]" /> },
    // LinkedIn n'apparaît que lorsque le lien est renseigné dans le contenu.
    ...(linkedin ? [{ label: "LinkedIn", href: linkedin, className: "bg-[#0A66C2] text-white", icon: <LinkedInLogo className="size-5" /> }] : []),
  ];

  const place = (i: number) => {
    const a = (ANGLES[i] * Math.PI) / 180;
    return {
      transform: open ? `translate(${Math.cos(a) * RADIUS}px, ${Math.sin(a) * RADIUS}px) scale(1)` : "translate(0, 0) scale(0.3)",
      opacity: open ? 1 : 0,
      transitionDelay: `${open ? i * 70 : (items.length - 1 - i) * 40}ms`,
    };
  };

  return (
    <div className="fixed right-8 bottom-8 z-50 size-14 sm:right-10 sm:bottom-10">
      {items.map((item, i) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener"
          aria-label={item.label}
          tabIndex={open ? 0 : -1}
          style={place(i)}
          className={`absolute top-1/2 left-1/2 -mt-[22px] -ml-[22px] grid size-11 place-items-center rounded-full shadow-lg shadow-black/30 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:!scale-110 ${item.className} ${open ? "" : "pointer-events-none"}`}
        >
          {item.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={label}
        className={`relative grid size-full place-items-center rounded-full text-white shadow-xl shadow-black/30 transition duration-300 hover:scale-105 ${
          open ? "bg-ink" : "bg-primary"
        }`}
      >
        <Chat className={`absolute size-6 transition duration-300 ${open ? "scale-50 rotate-90 opacity-0" : ""}`} />
        <Close className={`absolute size-6 transition duration-300 ${open ? "" : "scale-50 -rotate-90 opacity-0"}`} />
      </button>
    </div>
  );
}
