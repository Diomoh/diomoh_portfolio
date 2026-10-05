import Image from "next/image";
import type { Content } from "@/content/fr";
import bg from "../../public/footer.png";
import { ArrowUpRight } from "./icons";

export default function Footer({ name, footer }: { name: string; footer: Content["footer"] }) {
  return (
    <footer className="px-2 pt-4 pb-2 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-10 text-white sm:px-10 sm:py-12">
        <Image src={bg} alt="" aria-hidden fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-white/70">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/diomoh-logo-negatif.png" alt="diomoh" width={2000} height={474} className="h-6 w-auto" />
            <span className="h-5 w-px bg-white/25" />
            <span className="font-display font-semibold text-white">{name}</span>
          </div>
          <span>
            © {new Date().getFullYear()} {name}. {footer.rights}
          </span>
          <a href="#top" className="inline-flex items-center gap-1 font-medium text-white hover:text-white/70">
            {footer.top} <ArrowUpRight className="size-4 -rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  );
}
