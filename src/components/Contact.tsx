import type { Content } from "@/content/fr";
import ContactForm from "./ContactForm";
import { splitWords } from "./SplitWords";
import { withUnderline } from "./Underline";
import { Mail, Pin, WhatsApp } from "./icons";

export default function Contact({ contact }: { contact: Content["contact"] }) {
  const items = [
    { icon: Mail, label: contact.labels.email, value: contact.email, href: `mailto:${contact.email}` },
    { icon: WhatsApp, label: contact.labels.phone, value: contact.phone, href: `https://wa.me/${contact.whatsapp}` },
    { icon: Pin, label: contact.labels.location, value: contact.location },
  ];
  return (
    <section id="contact" className="px-2 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-ink px-5 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div data-reveal>
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
              <span className="bg-primary h-px w-10" /> {contact.eyebrow}
            </div>
            <h2 data-split className="mt-4 font-display text-[clamp(38px,5.4vw,80px)] leading-[0.98] font-semibold tracking-[-0.045em]">{splitWords(withUnderline(contact.title, contact.highlight))}</h2>
            <p className="mt-6 max-w-xl text-lg text-white/70">{contact.text}</p>
            <ul data-reveal="slide" className="mt-10 space-y-3">
              {items.map(({ icon: Icon, label, value, href }, i) => {
                const inner = (
                  <>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 transition group-hover:bg-white group-hover:text-ink">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs tracking-[0.16em] text-white/45 uppercase">{label}</span>
                      <span className="block font-medium">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label} style={{ ["--i" as string]: i }}>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="group flex items-center gap-4">
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <ContactForm form={contact.form} email={contact.email} />
          </div>
        </div>
      </div>
    </section>
  );
}
