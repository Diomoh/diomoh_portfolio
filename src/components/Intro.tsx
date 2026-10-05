import type { Content } from "@/content/fr";
import { Award } from "./icons";
import PrinciplesGrid from "./PrinciplesGrid";
import RotatingWords from "./RotatingWords";

function Corner({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`absolute size-3 border-t-2 border-r-2 border-current opacity-70 ${className}`} />;
}

export default function Intro({ intro }: { intro: Content["intro"] }) {
  const { stats } = intro;
  return (
    <section id="about-intro" className="shell pt-2 sm:pt-4">
      <div className="py-4 sm:py-6 lg:py-10">
        {/* Titre : un mot qui me définit */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div data-reveal className="relative w-fit pr-8">
            <h2 data-guide="principles" className="font-display text-[clamp(56px,10vw,160px)] leading-[0.85] font-bold tracking-[-0.06em]">
              <RotatingWords words={intro.words} />
            </h2>
            <span aria-hidden className="absolute top-1 right-0 size-6 border-t-[6px] border-r-[6px] border-ink sm:size-9" />
          </div>
          <p data-reveal className="pb-2 text-sm font-medium text-ink/60">
            {intro.label} <span className="text-primary">({String(intro.principles.length).padStart(2, "0")})</span>
          </p>
        </div>

        {/* 4 principes : colonnes, la carte survolée passe en noir */}
        <PrinciplesGrid principles={intro.principles} />

        {/* Preuves */}
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.75fr]">
          <div data-reveal className="relative flex min-h-[120px] items-center gap-4 rounded-[28px] bg-slate p-6 text-white">
            <Corner className="top-5 right-5" />
            <Award className="size-9 shrink-0" />
            <div>
              <div className="font-display text-2xl font-semibold">{stats.itil.value}</div>
              <div className="text-sm text-white/80">{stats.itil.label}</div>
            </div>
          </div>
          <div data-reveal className="grid min-h-[120px] grid-cols-[0.6fr_1.4fr] overflow-hidden rounded-[28px]" style={{ ["--delay" as string]: "90ms" }}>
            <div className="grid place-items-center bg-ink">
              <div className="sphere size-16 sm:size-20" />
            </div>
            <div className="relative flex items-center gap-4 bg-teal p-6">
              <Corner className="top-5 right-5" />
              <div className="font-display text-5xl font-bold">{stats.live.value}</div>
              <div className="text-sm leading-snug font-medium">{stats.live.label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
