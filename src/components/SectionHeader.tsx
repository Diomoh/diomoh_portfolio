import { splitWords } from "./SplitWords";
import { withUnderline } from "./Underline";

type Props = { eyebrow: string; title: string; highlight?: string; dark?: boolean; className?: string; guide?: string };

export default function SectionHeader({ eyebrow, title, highlight, dark, className = "", guide }: Props) {
  return (
    <div data-reveal className={className}>
      <div className={`flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase ${dark ? "text-white/50" : "text-ink/50"}`}>
        <span className="bg-primary h-px w-10" />
        {eyebrow}
      </div>
      <h2 data-split data-guide={guide} className="mt-4 max-w-[18ch] font-display text-[clamp(36px,5.2vw,76px)] leading-[0.98] font-semibold tracking-[-0.045em]">{splitWords(withUnderline(title, highlight))}</h2>
    </div>
  );
}
