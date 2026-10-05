import Image from "next/image";
import type { Content } from "@/content/fr";
import { splitWords } from "./SplitWords";
import { withUnderline } from "./Underline";
import { Bot, Cloud, Layout, Pen, Route } from "./icons";

const icons = { layout: Layout, cloud: Cloud, pen: Pen, bot: Bot, route: Route };

function Photo({ src, className = "", i }: { src: string; className?: string; i: number }) {
  return (
    <div style={{ ["--i" as string]: i }} className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt="Mohamed Diomande" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
    </div>
  );
}

// Grande carte claire : mosaïque de photos + chiffre à gauche, titre et services en bandeaux à droite.
export default function Services({ services }: { services: Content["services"] }) {
  return (
    <section id="services" className="px-2 py-16 sm:px-4 lg:py-24">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-[#eef1f7] px-5 py-12 sm:px-10 lg:px-16 lg:py-20">

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Mosaïque */}
          <div data-reveal="clip" className="grid grid-cols-2 gap-3 sm:gap-4">
            <Photo i={0} src="/images/mon_image/moi-depi.webp" className="aspect-[4/3.6] rounded-[40px_40px_40px_12px]" />
            <Photo i={1} src="/images/mon_image/moi-seul.webp" className="aspect-[4/3.6] translate-y-6 rounded-[12px_40px_40px_40px]" />
            <div style={{ ["--i" as string]: 2 }} className="flex aspect-[4/3.6] flex-col items-center justify-center rounded-[40px_12px_40px_40px] bg-primary p-4 text-center text-white">
              <span className="font-display text-[clamp(40px,4.5vw,64px)] leading-none font-light tracking-[-0.04em]">{services.stat.value}</span>
              <span className="mt-2 text-xs text-white/80 sm:text-sm">{services.stat.label}</span>
            </div>
            <Photo i={3} src="/images/mon_image/moi-studio.webp" className="aspect-[4/3.6] translate-y-6 rounded-[40px_40px_12px_40px] [&_img]:object-[50%_20%]" />
          </div>

          {/* Titre + services */}
          <div>
            <p data-reveal className="text-xs font-semibold tracking-[0.22em] text-ink/50 uppercase">
              {services.eyebrow}
            </p>
            <h2 data-split data-guide="services" className="mt-3 font-display text-[clamp(40px,5vw,72px)] leading-[1.02] font-bold tracking-[-0.045em]">
              {splitWords(withUnderline(services.title, services.highlight))}
            </h2>
            {/* Lignes sans fond, séparées par un trait ; la ligne survolée passe en bleu. */}
            <ul data-reveal="slide" className="mt-10">
              {services.items.map((s, i) => {
                const Icon = icons[s.icon as keyof typeof icons] ?? Layout;
                return (
                  <li
                    key={s.title}
                    style={{ ["--i" as string]: i }}
                    className="group flex items-center gap-4 border-b border-ink/10 hover:rounded-[18px] px-4 py-4 transition duration-500 hover:border-transparent hover:bg-primary hover:text-white sm:px-5"
                  >
                    <Icon className="size-6 shrink-0 text-primary transition duration-500 group-hover:text-white" />
                    <span className="font-medium sm:text-lg">{s.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
