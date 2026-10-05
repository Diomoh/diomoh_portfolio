import { splitWords } from "./SplitWords";
import { withUnderline } from "./Underline";

type Props = { title: string; highlight?: string; className?: string; guide?: string };

export default function SectionHeader({ title, highlight, className = "", guide }: Props) {
  return (
    <div data-reveal className={className}>
      <h2 data-split data-guide={guide} className="max-w-[18ch] font-display text-[clamp(36px,5.2vw,76px)] leading-[0.98] font-semibold tracking-[-0.045em]">{splitWords(withUnderline(title, highlight))}</h2>
    </div>
  );
}
