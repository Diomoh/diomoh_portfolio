import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24" } as const;

export const ArrowUpRight = (p: P) => (<svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>);
export const ArrowDownRight = (p: P) => (<svg {...base} {...p}><path d="M7 7l10 10M17 8v9H8" /></svg>);
export const ArrowRight = (p: P) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Mail = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>);
export const Phone = (p: P) => (<svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>);
export const Pin = (p: P) => (<svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const Lock = (p: P) => (<svg {...base} {...p}><rect x="4" y="10" width="16" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>);
export const Check = (p: P) => (<svg {...base} {...p}><path d="m5 12 5 5 9-10" /></svg>);
export const Globe = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></svg>);
export const Award = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></svg>);
export const Bolt = (p: P) => (<svg {...base} {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>);
export const Layout = (p: P) => (<svg {...base} {...p}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M9 20V9" /></svg>);
export const Bot = (p: P) => (<svg {...base} {...p}><rect x="4" y="8" width="16" height="12" rx="4" /><path d="M12 4v4M9 13v1M15 13v1M2 13v3M22 13v3" /></svg>);
export const Sparkle = (p: P) => (<svg {...base} {...p}><path d="M12 3c.6 4.5 2.4 6.4 7 7-4.6.6-6.4 2.5-7 7-.6-4.5-2.4-6.4-7-7 4.6-.6 6.4-2.5 7-7Z" /></svg>);
export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
  </svg>
);
export const Chat = (p: P) => (<svg {...base} {...p}><path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.4-5.1A8.5 8.5 0 1 1 21 12Z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.6" /></svg>);
export const Close = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);

// Logos et drapeaux en couleurs officielles.
export const GmailLogo = (p: P) => (
  <svg viewBox="0 0 48 48" {...p}>
    <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z" />
    <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
    <path fill="#e53935" d="M35 11.2 24 19.45 13 11.2 12 17l1 6.7 11 8.25 11-8.25 1-6.7z" />
    <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.298 4.298 0 0 0 3 12.298z" />
    <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.298 4.298 0 0 1 45 12.298z" />
  </svg>
);
export const FlagFR = (p: P) => (
  <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" {...p}>
    <rect width="1" height="2" fill="#002654" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#ED2939" />
  </svg>
);
export const FlagUK = (p: P) => (
  <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" {...p}>
    <clipPath id="uk-t">
      <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
    </clipPath>
    <rect width="60" height="30" fill="#012169" />
    <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
    <path d="M0 0l60 30M60 0L0 30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
    <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
    <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);
export const LinkedInLogo = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 7a1.97 1.97 0 0 0 0-3.94ZM20.44 13.4c0-3.1-1.66-4.54-3.87-4.54a3.34 3.34 0 0 0-3.03 1.67V8.5h-3.37V20h3.37v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.38l-.48-6.6Z" />
  </svg>
);
export const Code = (p: P) => (<svg {...base} {...p}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>);
export const Smartphone = (p: P) => (<svg {...base} {...p}><rect x="6" y="2.5" width="12" height="19" rx="3" /><path d="M10.5 18.5h3" /></svg>);
export const Cart = (p: P) => (<svg {...base} {...p}><path d="M3 4h2l2.4 11h10.2L20 7H6.3" /><circle cx="9" cy="19.5" r="1.5" /><circle cx="17" cy="19.5" r="1.5" /></svg>);
export const Building = (p: P) => (<svg {...base} {...p}><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M9 11h.01M15 11h.01" /></svg>);
export const Pen = (p: P) => (<svg {...base} {...p}><path d="M12 19 19 12l3 3-7 7-3-3Z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5ZM2 2l7.6 7.6" /><circle cx="11" cy="11" r="2" /></svg>);
export const Route = (p: P) => (<svg {...base} {...p}><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="5" r="2.5" /><path d="M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5" /></svg>);
export const Cloud = (p: P) => (<svg {...base} {...p}><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4.75 4.75 0 0 1-.5 9.5H7Z" /></svg>);
