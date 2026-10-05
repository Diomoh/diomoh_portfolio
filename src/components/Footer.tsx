import type { Content } from "@/content/fr";
import { ArrowUpRight } from "./icons";

export default function Footer({ name, footer }: { name: string; footer: Content["footer"] }) {
  return (
    <footer className="overflow-hidden px-5 pt-16 pb-8 sm:px-8">
      <p aria-hidden data-reveal className="text-center font-display text-[clamp(40px,11.5vw,190px)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap text-ink/[0.07] italic">
        {name}
      </p>
      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-ink/60">
        <span>
          © {new Date().getFullYear()} {name}. {footer.rights}
        </span>
        <a href="#top" className="inline-flex items-center gap-1 font-medium text-ink hover:text-primary">
          {footer.top} <ArrowUpRight className="size-4 -rotate-45" />
        </a>
      </div>
    </footer>
  );
}
