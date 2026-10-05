import type { Preview } from "@/content/fr";

// Mini-interfaces illustratives (données fictives) affichées à la place de captures d'écran.
export default function MockScreen({ kind, className = "" }: { kind: Preview; className?: string }) {
  const shell = `overflow-hidden rounded-[18px] shadow-2xl shadow-black/50 ring-1 ring-black/10 ${className}`;

  switch (kind) {
    case "health":
      return (
        <div className={`${shell} bg-[#141416] p-3 text-white`}>
          <div className="flex items-center justify-between text-[9px] text-white/50">
            <span>Partogramme</span>
            <span className="rounded-full bg-emerald-400/15 px-1.5 text-emerald-300">● live</span>
          </div>
          <div className="mt-1 text-lg font-semibold">7 cm</div>
          <svg viewBox="0 0 120 50" className="mt-1 w-full">
            <path d="M0 45 L120 5" stroke="white" strokeOpacity=".15" strokeDasharray="3 3" />
            <path d="M0 44 C20 40 30 34 45 30 S75 20 90 14 110 8 120 6" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            {[0, 45, 90].map((x) => (
              <circle key={x} cx={x} cy={x === 0 ? 44 : x === 45 ? 30 : 14} r="2.5" fill="#fff" />
            ))}
          </svg>
          <div className="mt-2 grid grid-cols-2 gap-1.5 text-[9px]">
            <div className="rounded-lg bg-white/5 p-1.5"><div className="text-white/40">FC</div><div className="font-semibold">138 bpm</div></div>
            <div className="rounded-lg bg-white/5 p-1.5"><div className="text-white/40">TA</div><div className="font-semibold">12/8</div></div>
          </div>
        </div>
      );
    case "docs":
      return (
        <div className={`${shell} bg-white p-3 text-ink`}>
          <div className="text-[9px] font-semibold tracking-wide text-ink/40 uppercase">ClinArchive</div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/10"><div className="bg-primary h-full w-3/4" /></div>
          {["Compte-rendu.pdf", "Radio_thorax.dcm", "Ordonnance.pdf", "Bilan_sanguin.pdf"].map((f) => (
            <div key={f} className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-ink/[0.04] p-1.5 text-[9px]">
              <span className="grid size-4 place-items-center rounded bg-primary/20 text-[7px] text-primary">▤</span>
              <span className="flex-1 truncate">{f}</span>
              <span className="text-ink/40">🔒</span>
            </div>
          ))}
        </div>
      );
    case "school":
      return (
        <div className={`${shell} bg-white p-3 text-ink`}>
          <div className="flex items-center justify-between text-[9px]">
            <span className="font-semibold">Bulletin · T1</span>
            <span className="rounded-full bg-teal/50 px-1.5">3e A</span>
          </div>
          {[["Maths", 16.5], ["Français", 14], ["Physique", 15.25], ["SVT", 13.5]].map(([s, n]) => (
            <div key={s} className="mt-1.5 text-[9px]">
              <div className="flex justify-between"><span>{s}</span><span className="font-semibold">{n}/20</span></div>
              <div className="mt-0.5 h-1 rounded-full bg-ink/10"><div className="h-full rounded-full bg-primary" style={{ width: `${(Number(n) / 20) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      );
    case "learn":
      return (
        <div className={`${shell} bg-[#0f1a3a] p-3 text-white`}>
          <div className="text-[9px] text-white/50">ISO 27001 · Lead Implementer</div>
          <div className="mt-2 flex items-center gap-2">
            <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="white" strokeOpacity=".1" strokeWidth="4" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#a8dcd4" strokeWidth="4" strokeDasharray="94" strokeDashoffset="21" strokeLinecap="round" />
            </svg>
            <div>
              <div className="text-base font-semibold">78%</div>
              <div className="text-[8px] text-white/50">Exam · 01:12:40</div>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {["A", "B", "C"].map((o, i) => (
              <div key={o} className={`rounded-md px-1.5 py-1 text-[8px] ${i === 1 ? "bg-teal text-ink" : "bg-white/5"}`}>{o}. ••••••••••••</div>
            ))}
          </div>
        </div>
      );
    case "shop":
      return (
        <div className={`${shell} bg-white p-3 text-ink`}>
          <div className="text-[9px] text-ink/40">Shanghai → Abidjan</div>
          <div className="mt-0.5 text-sm font-semibold">#HTB-2048</div>
          <div className="mt-2 flex items-center">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex flex-1 items-center last:flex-none">
                <span className={`size-2.5 rounded-full ${i < 5 ? "bg-primary" : "bg-ink/15"}`} />
                {i < 6 && <span className={`h-0.5 flex-1 ${i < 4 ? "bg-primary" : "bg-ink/15"}`} />}
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1 text-[9px]">
            {[["Livraison", "42 000"], ["TVA", "18 %"], ["Douane · HS 8517", "12 500"]].map(([k, v]) => (
              <div key={k} className="flex justify-between"><span className="text-ink/50">{k}</span><span className="font-semibold">{v}</span></div>
            ))}
          </div>
        </div>
      );
    case "web":
      return (
        <div className={`${shell} bg-white text-ink`}>
          <div className="flex gap-1 bg-ink/5 px-2 py-1.5">
            <span className="size-1.5 rounded-full bg-primary" /><span className="size-1.5 rounded-full bg-yellow" /><span className="size-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="p-2.5">
            <div className="h-14 rounded-lg bg-primary" />
            <div className="mt-2 h-1.5 w-3/4 rounded bg-ink/80" />
            <div className="mt-1 h-1 w-1/2 rounded bg-ink/20" />
            <div className="mt-2 grid grid-cols-3 gap-1">
              {[0, 1, 2].map((i) => <div key={i} className="h-6 rounded bg-ink/[0.06]" />)}
            </div>
          </div>
        </div>
      );
    case "ai":
      return (
        <div className={`${shell} bg-[#101012] p-3 text-white`}>
          <div className="flex items-center gap-1.5 text-[9px]">
            <span className="bg-primary grid size-4 place-items-center rounded-full text-[8px]">✦</span>
            <span className="text-white/60">Tuyo AI · 21:00</span>
          </div>
          <div className="mt-2 rounded-xl rounded-tl-sm bg-white/[0.06] p-2 text-[9px] leading-snug">
            {["ASEC – AFAD", "Raja – Wydad", "Horoya – Hafia"].map((m) => (
              <div key={m} className="flex justify-between py-0.5"><span>{m}</span><span className="text-yellow">●</span></div>
            ))}
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"><div className="bg-primary h-full w-2/3" /></div>
        </div>
      );
    case "mobile":
      return (
        <div className={`${shell} rounded-[26px] border-4 border-[#222] bg-[#f6f6f4] p-2.5 text-ink`}>
          <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-ink/80" />
          <div className="flex items-center justify-between text-[9px]">
            <span className="font-semibold">Offline first</span>
            <span className="rounded-full bg-emerald-500/15 px-1.5 text-emerald-700">sync ✓</span>
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-white p-1.5 shadow-sm">
              <span className={`size-4 rounded-full ${["bg-primary", "bg-teal", "bg-yellow", "bg-pink"][i]}`} />
              <span className="h-1 flex-1 rounded bg-ink/15" />
            </div>
          ))}
        </div>
      );
  }
}
