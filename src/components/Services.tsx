import Image from "next/image";
import type { Content } from "@/content/fr";
import bg from "../../public/deuxime.png";
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

// Grande carte bleue (image de fond) : mosaïque de photos + chiffre à gauche, titre et services en bandeaux à droite.
export default function Services({ services }: { services: Content["services"] }) {
  return (
    <section id="services" className="px-2 py-16 sm:px-4 lg:py-24">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-primary px-5 py-12 text-white sm:px-10 lg:px-16 lg:py-20">
        <Image src={bg} alt="" aria-hidden fill sizes="100vw" placeholder="blur" className="-z-10 object-cover" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Mosaïque */}
          <div data-reveal="clip" className="grid grid-cols-2 gap-3 sm:gap-4">
            <Photo i={0} src="/images/mon_image/moi-depi.webp" className="aspect-[4/3.6] rounded-[40px_40px_40px_12px]" />
            <Photo i={1} src="/images/mon_image/moi-seul.webp" className="aspect-[4/3.6] translate-y-6 rounded-[12px_40px_40px_40px]" />
            <div style={{ ["--i" as string]: 2 }} className="flex aspect-[4/3.6] flex-col items-center justify-center rounded-[40px_12px_40px_40px] bg-white p-4 text-center text-ink">
              <span className="font-display text-[clamp(40px,4.5vw,64px)] leading-none font-light tracking-[-0.04em] text-primary">{services.stat.value}</span>
              <span className="mt-2 text-xs text-ink/60 sm:text-sm">{services.stat.label}</span>
            </div>
            <Photo i={3} src="/images/mon_image/moi-studio.webp" className="aspect-[4/3.6] translate-y-6 rounded-[40px_40px_12px_40px] [&_img]:object-[50%_20%]" />
          </div>

          {/* Titre + services */}
          <div>
            <h2 data-split data-guide="services" className="font-display text-[clamp(40px,5vw,72px)] leading-[1.02] font-bold tracking-[-0.045em] [&_svg]:text-white">
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
                    className="group flex items-center gap-4 border-b border-white/15 px-4 py-4 transition duration-500 hover:rounded-[18px] hover:border-transparent hover:bg-white hover:text-ink sm:px-5"
                  >
                    <Icon className="size-6 shrink-0 text-white transition duration-500 group-hover:text-primary" />
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
