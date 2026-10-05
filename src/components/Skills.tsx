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
  // Logo ChatGPT / OpenAI (retiré de Simple Icons) pour Codex.
  codex: {
    hex: "000000",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
  },
};

const badges: Record<string, { label: string; bg: string }> = {
  drf: { label: "DRF", bg: "#A30000" },
  sqlserver: { label: "SQL", bg: "#CC2927" },
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
        <SectionHeader guide="skills" title={skills.title} highlight={skills.highlight} className="lg:sticky lg:top-28 lg:self-start" />
        <ul data-reveal="pop" className="grid grid-cols-4 place-items-center gap-x-6 gap-y-10 sm:grid-cols-5 xl:grid-cols-6">
          {skills.stack.map((s, i) => (
            <li
              key={s.name}
              style={{ ["--i" as string]: i }}
              className="group relative grid size-16 place-items-center"
            >
              <span className="grid place-items-center transition duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                <SkillIcon icon={s.icon} />
              </span>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 translate-y-1 rounded-full bg-ink px-3 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {s.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
