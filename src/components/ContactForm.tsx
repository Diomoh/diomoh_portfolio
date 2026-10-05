"use client";

import type { FormEvent } from "react";
import type { Content } from "@/content/fr";
import { ArrowUpRight } from "./icons";

// Pas de backend pour l'instant : le formulaire prépare un e-mail dans la messagerie du visiteur.
export default function ContactForm({ form, email }: { form: Content["contact"]["form"]; email: string }) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `${data.get("project")}\n\n${data.get("name")} · ${data.get("email")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-2xl bg-white/[0.07] px-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:bg-white/[0.12]";

  return (
    <form data-reveal="slide" onSubmit={onSubmit} className="space-y-3">
      <input style={{ ["--i" as string]: 1 }} name="name" required autoComplete="name" placeholder={form.name} aria-label={form.name} className={field} />
      <input style={{ ["--i" as string]: 2 }} name="email" type="email" required autoComplete="email" placeholder={form.email} aria-label={form.email} className={field} />
      <textarea style={{ ["--i" as string]: 3 }} name="project" required rows={6} placeholder={form.project} aria-label={form.project} className={`${field} resize-none`} />
      <button style={{ ["--i" as string]: 4 }} type="submit" data-guide="contact" className="bg-primary group flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white transition hover:brightness-110">
        {form.send} <ArrowUpRight className="size-5 transition group-hover:rotate-45" />
      </button>
    </form>
  );
}
