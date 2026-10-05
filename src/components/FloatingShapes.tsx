"use client";

import { useEffect, useRef, useState } from "react";

// Guide mobile : la flèche bleue rejoint l'élément important de la section en cours ([data-guide]),
// pointe dessus et affiche une bulle. Il flotte et s'écarte du curseur.
// Le visiteur peut la glisser où il veut : elle y reste (mémorisée) et continue de pointer la cible.
// Double-clic : retour au placement automatique.
const ARROW = 56;
const GAP = 14;
const STORAGE_KEY = "guide-pos";

type Pin = { fx: number; fy: number }; // position en fraction de la fenêtre

const loadPin = (): Pin | null => {
  try {
    const v = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return typeof v?.fx === "number" && typeof v?.fy === "number" ? v : null;
  } catch {
    return null;
  }
};

const savePin = (pin: Pin | null) => {
  try {
    if (pin) localStorage.setItem(STORAGE_KEY, JSON.stringify(pin));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function FloatingShapes({ labels }: { labels: Record<string, string> }) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const [current, setCurrent] = useState<string | null>(null);
  const currentRef = useRef<string | null>(null);
  const pin = useRef<Pin | null>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const hover = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const arrow = { x: -1, y: -1, a: 0, rx: 0, ry: 0 };
    pin.current = loadPin();

    const pickTarget = () => {
      const focusY = window.innerHeight * 0.42;
      let best: HTMLElement | null = null;
      let bestD = Infinity;
      document.querySelectorAll<HTMLElement>("[data-guide]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 60 || r.top > window.innerHeight - 60 || r.width === 0) return;
        const d = Math.abs(r.top + r.height / 2 - focusY);
        if (d < bestD) {
          bestD = d;
          best = el;
        }
      });
      return best as HTMLElement | null;
    };

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const target = pickTarget();
      const key = target?.dataset.guide ?? null;
      if (key !== currentRef.current) {
        currentRef.current = key;
        setCurrent(key);
      }

      if (target && arrowRef.current) {
        const r = target.getBoundingClientRect();
        const cx = r.left + Math.min(r.width, 420) / 2;
        const cy = r.top + Math.min(r.height, 200) / 2;
        // Flèche : à gauche de l'élément si possible, sinon à droite, sinon au-dessus.
        let ax = r.left - ARROW - GAP;
        let ay = clamp(cy - ARROW / 2, 70, h - ARROW - 20);
        if (ax < 8 && r.right + GAP + ARROW <= w - 8) ax = r.right + GAP;
        else if (ax < 8) {
          ax = clamp(cx - ARROW / 2, 8, w - ARROW - 8);
          ay = clamp(r.top - ARROW - GAP, 70, h - ARROW - 20);
        }
        if (pin.current) {
          ax = clamp(pin.current.fx * w, 8, w - ARROW - 8);
          ay = clamp(pin.current.fy * h, 8, h - ARROW - 8);
        }
        const angle = (Math.atan2(cy - (ay + ARROW / 2), cx - (ax + ARROW / 2)) * 180) / Math.PI;

        if (arrow.x < 0 || reduce) {
          Object.assign(arrow, { x: ax, y: ay, a: angle });
        }
        const k = reduce || drag.current ? 1 : 0.08;
        arrow.x += (ax - arrow.x) * k;
        arrow.y += (ay - arrow.y) * k;
        arrow.a += (angle - arrow.a) * k;

        // Répulsion douce du curseur.
        const dx = arrow.x + ARROW / 2 - mouse.current.x;
        const dy = arrow.y + ARROW / 2 - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        // Pas de fuite quand le visiteur la survole, la déplace ou l'a placée lui-même.
        const force = pin.current || drag.current || hover.current ? 0 : Math.max(0, 1 - dist / 200) * 50;
        arrow.rx += ((dist ? (dx / dist) * force : 0) - arrow.rx) * 0.12;
        arrow.ry += ((dist ? (dy / dist) * force : 0) - arrow.ry) * 0.12;

        arrowRef.current.style.transform = `translate3d(${arrow.x + arrow.rx}px, ${arrow.y + arrow.ry}px, 0)`;
        arrowRef.current.style.setProperty("--angle", `${arrow.a}deg`);
      }
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => (mouse.current = { x: e.clientX, y: e.clientY });
    const onLeave = () => (mouse.current = { x: -9999, y: -9999 });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const label = current ? labels[current] : null;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    drag.current = { dx: e.clientX - box.left, dy: e.clientY - box.top };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    pin.current = {
      fx: (e.clientX - drag.current.dx) / window.innerWidth,
      fy: (e.clientY - drag.current.dy) / window.innerHeight,
    };
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    savePin(pin.current);
  };

  const reset = () => {
    pin.current = null;
    savePin(null);
  };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {/* Flèche + bulle */}
      <div
        ref={arrowRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={() => (hover.current = true)}
        onPointerLeave={() => (hover.current = false)}
        onDoubleClick={reset}
        className={`absolute top-0 left-0 touch-none select-none will-change-transform transition-opacity duration-500 ${
          current ? "pointer-events-auto opacity-100" : "opacity-0"
        } ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ width: ARROW, height: ARROW }}
      >
        <div className={`size-full drop-shadow-[0_0_1.5px_white] transition-transform duration-300 ${dragging ? "scale-110" : "shape-float"}`}>
          <span
            className="block size-full bg-primary [clip-path:polygon(8%_6%,100%_50%,8%_94%,26%_50%)]"
            style={{ transform: "rotate(var(--angle, 0deg))" }}
          />
        </div>
        <span
          key={current ?? "none"}
          className="fade-up absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-lg shadow-black/20"
        >
          {label}
        </span>
      </div>

    </div>
  );
}
