import type { ReactNode } from "react";

// Petit trait ondulé bleu sous un mot clé d'un titre.
export default function Underline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-primary">
        <path pathLength={1} className="ul-path" d="M3 14 C 40 4, 70 4, 100 11 S 160 18, 197 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// Entoure `word` dans `text` (première occurrence) ; renvoie le texte intact s'il est absent.
export function withUnderline(text: string, word?: string) {
  const at = word ? text.indexOf(word) : -1;
  if (!word || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Underline>{word}</Underline>
      {text.slice(at + word.length)}
    </>
  );
}
