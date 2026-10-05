import type { Content } from "@/content/fr";
import type { Locale } from "@/i18n/config";
import cutout from "../../public/images/mohamed-cutout.webp";
import WorksList from "./WorksList";
import HeroPhoto from "./HeroPhoto";
import HeroCarousel from "./HeroCarousel";
import LangSelect from "./LangSelect";
import { ArrowDownRight } from "./icons";

type Props = { lang: Locale; langLabel: string; hero: Content["hero"]; projectCount: number };

export default function Hero({ lang, langLabel, hero, projectCount }: Props) {
  return (
    <section id="top" className="px-[5%] py-2 sm:py-4">
      <div className="relative flex flex-col overflow-hidden rounded-[28px] bg-ink text-white lg:block lg:h-[calc(100svh-32px)] lg:min-h-[720px]">
        {/* Zone photo : fond studio clair qui se fond dans le noir */}
        <div className="relative h-[68svh] min-h-[480px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[58%]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_38%,#e2e2df_0%,#bcbcb8_38%,#5d5d5b_68%,#0d0d0e_92%)] lg:bg-[radial-gradient(ellipse_at_40%_42%,#e4e4e1_0%,#c2c2be_34%,#6a6a67_62%,#0d0d0e_88%)]" />
          <HeroPhoto
            src={cutout}
            alt={`${hero.firstName} ${hero.lastName}`}
            className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom lg:left-[44%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-ink to-transparent lg:block" />

          {/* Onglet « À propos » + sélecteur de langue, découpé dans le coin */}
          <div className="absolute top-0 left-0 z-30 flex items-center gap-3 rounded-br-[28px] bg-paper px-5 pt-4 pb-4 text-ink sm:px-6">
            <a href="#about" className="group block text-[15px] leading-tight font-medium">
              {hero.aboutTab[0]}
              <br />
              <span className="inline-flex items-center gap-0.5">
                {hero.aboutTab[1]} <ArrowDownRight className="size-4 text-primary transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </span>
            </a>
            <span className="h-8 w-px bg-ink/10" />
            <LangSelect lang={lang} label={langLabel} />
            <span className="inv-corner absolute top-0 -right-7" />
            <span className="inv-corner absolute -bottom-7 left-0" />
          </div>
        </div>

        {/* Nom en très grande typographie */}
        <h1 className="pointer-events-none absolute tracking-[-0.045em] top-[calc(68svh-130px)] left-1/2 z-10 -translate-x-1/2 text-center whitespace-nowrap font-display leading-[0.82] sm:top-[calc(68svh-180px)] lg:top-auto lg:bottom-[7%] lg:left-[25.5%]">
          <span
            className="fade-up absolute -top-[0.75em] left-[0.4em] z-10 -rotate-6 rounded-md bg-primary px-[0.45em] py-[0.12em] text-[clamp(14px,1.6vw,24px)] leading-tight font-normal tracking-[-0.02em] text-white"
            style={{ animationDelay: "900ms" }}
          >
            {hero.greeting}
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="rise text-[clamp(45px,8.4vw,132px)] font-normal" style={{ animationDelay: "250ms" }}>
              {hero.firstName}
            </span>
          </span>
          <span className="block overflow-hidden pb-3">
            <span className="rise text-[clamp(45px,8.4vw,132px)] font-extrabold" style={{ animationDelay: "380ms" }}>
              {hero.lastName}
            </span>
          </span>
          <span className="fade-up mt-1 flex items-center justify-center gap-3 font-sans text-xs font-semibold tracking-[0.35em] text-white/80 uppercase sm:text-sm" style={{ animationDelay: "700ms" }}>
            {hero.title}
          </span>
          <span className="sr-only"> · {hero.role}</span>
        </h1>

        {/* Carrousel : bienvenue puis projets (en haut à droite) */}
        <div data-guide="hero" className="fade-up relative z-10 px-5 pt-6 pb-8 sm:px-8 lg:absolute lg:top-8 lg:right-8 lg:w-[42%] lg:p-0 xl:w-[38%]" style={{ animationDelay: "500ms" }}>
          <HeroCarousel
            welcome={hero.welcome}
            projects={
              <>
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <h2 className="font-display text-5xl font-normal sm:text-6xl">
                  {hero.worksTitle}
                  <sup className="ml-1 align-super text-lg font-light text-white/70">({projectCount})</sup>
                </h2>
              </div>
              <WorksList categories={hero.categories} />
              </>
            }
          />
        </div>

      </div>
    </section>
  );
}
