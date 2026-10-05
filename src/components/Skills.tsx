import { siClaude, siDjango, siDocker, siGit, siMinio, siMysql, siNextdotjs, siNodedotjs, siPostgresql, siPython, siReact, siVite } from "simple-icons";
import type { Content } from "@/content/fr";
import SectionHeader from "./SectionHeader";

// Logos officiels (Simple Icons) ; badges maison pour les outils absents de la bibliothèque.
const brands: Record<string, { path: string; hex: string }> = {
  react: siReact,
  next: siNextdotjs,
  vite: siVite,
  python: siPython,
  django: siDjango,
  node: siNodedotjs,
  postgres: siPostgresql,
  mysql: siMysql,
  docker: siDocker,
  minio: siMinio,
  git: siGit,
  claude: siClaude,
};

const badges: Record<string, { label: string; bg: string }> = {
  drf: { label: "DRF", bg: "#A30000" },
  sqlserver: { label: "SQL", bg: "#CC2927" },
  codex: { label: ">_", bg: "#0d0d0e" },
  kilo: { label: "K", bg: "#0d0d0e" },
};

function SkillIcon({ icon }: { icon: string }) {
  const brand = brands[icon];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" className="size-12" fill={`#${brand.hex}`} aria-hidden>
        <path d={brand.path} />
      </svg>
    );
  }
  if (icon === "watermelon") {
    return (
      <svg viewBox="0 0 24 24" className="size-12" aria-hidden>
        <path d="M2 9h20a10 10 0 0 1-20 0Z" fill="#2E9E4F" />
        <path d="M4 9h16a8 8 0 0 1-16 0Z" fill="#F2545B" />
        {[[8, 12], [12, 14.5], [16, 12], [10, 11], [14, 11]].map(([cx, cy]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="0.7" ry="1.1" fill="#1b1b1b" />
        ))}
      </svg>
    );
  }
  const badge = badges[icon];
  return (
    <span
      className="grid size-12 place-items-center rounded-xl font-display text-base font-bold text-white"
      style={{ backgroundColor: badge?.bg ?? "#2563eb" }}
      aria-hidden
    >
      {badge?.label ?? "?"}
    </span>
  );
}

// Titre à gauche, logos des technologies à droite (nom au survol et pour les lecteurs d'écran).
export default function Skills({ skills }: { skills: Content["skills"] }) {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeader guide="skills" eyebrow={skills.eyebrow} title={skills.title} highlight={skills.highlight} className="lg:sticky lg:top-28 lg:self-start" />
        <ul data-reveal="pop" className="grid grid-cols-4 place-items-center gap-x-6 gap-y-10 sm:grid-cols-5 xl:grid-cols-6">
          {skills.stack.map((s, i) => (
            <li
              key={s.name}
              title={s.name}
              style={{ ["--i" as string]: i }}
              className="grid size-16 place-items-center transition duration-300 hover:-translate-y-1 hover:scale-110"
            >
              <SkillIcon icon={s.icon} />
              <span className="sr-only">{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
