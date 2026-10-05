import type { Content } from "@/content/fr";
import SectionHeader from "./SectionHeader";
import { Award } from "./icons";

export default function Education({ education }: { education: Content["education"] }) {
  const { cert } = education;
  return (
    <section id="education" className="py-24 lg:py-36">
      <div className="shell">
      <SectionHeader guide="education" title={education.title} />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div data-reveal className="relative overflow-hidden rounded-[28px] bg-primary p-8 text-white">
          <div aria-hidden className="absolute -right-16 -bottom-16 size-64 rounded-full border-[28px] border-white/10" />
          <Award className="size-10" />
          <div className="mt-10 font-display text-4xl font-bold">{cert.name}</div>
          <div className="mt-2 text-white/85">
            {cert.issuer} · {cert.date}
          </div>
        </div>
        <ul data-reveal="slide" className="divide-y divide-ink/10 rounded-[28px] bg-white px-7">
          {education.items.map((e, i) => (
            <li key={e.degree} style={{ ["--i" as string]: i }} className="grid gap-2 py-7 sm:grid-cols-[140px_1fr]">
              <div className="text-sm font-semibold text-primary">{e.period}</div>
              <div>
                <div className="font-display text-xl font-semibold">{e.degree}</div>
                <div className="mt-1 text-sm text-ink/60">{e.school}</div>
                {e.detail && <div className="mt-2 text-sm text-ink/80 italic">{e.detail}</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}
