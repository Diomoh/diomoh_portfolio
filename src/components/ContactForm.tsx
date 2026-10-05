"use client";

import { useActionState } from "react";
import { useParams } from "next/navigation";
import { sendContact, type ContactState } from "@/actions/contact";
import type { Content } from "@/content/fr";
import { ArrowUpRight } from "./icons";

// Le message part par e-mail (SMTP Brevo) via une action serveur.
export default function ContactForm({ form, email }: { form: Content["contact"]["form"]; email: string }) {
  const { lang } = useParams<{ lang: string }>();
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });

  const field =
    "w-full rounded-2xl bg-white/[0.07] px-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:bg-white/[0.12]";

  if (state.status === "success") {
    return (
      <div role="status" className="flex h-full min-h-[320px] flex-col items-start justify-center gap-3 rounded-3xl bg-white/[0.07] p-8">
        <span className="grid size-12 place-items-center rounded-full bg-white text-primary">✓</span>
        <p className="font-display text-2xl font-semibold">{form.success}</p>
      </div>
    );
  }

  return (
    <form data-reveal="slide" action={action} className="space-y-3">
      <input style={{ ["--i" as string]: 1 }} name="name" required maxLength={120} autoComplete="name" placeholder={form.name} aria-label={form.name} className={field} />
      <input style={{ ["--i" as string]: 2 }} name="email" type="email" required maxLength={200} autoComplete="email" placeholder={form.email} aria-label={form.email} className={field} />
      <textarea style={{ ["--i" as string]: 3 }} name="project" required maxLength={5000} rows={6} placeholder={form.project} aria-label={form.project} className={`${field} resize-none`} />
      <input type="hidden" name="lang" value={lang} />
      {/* Champ piège pour les robots, invisible pour les visiteurs. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {(state.status === "error" || state.status === "invalid") && (
        <p role="alert" className="rounded-2xl bg-white/10 px-5 py-3 text-sm text-white">
          {state.status === "invalid" ? form.invalid : form.error}{" "}
          {state.status === "error" && (
            <a href={`mailto:${email}`} className="font-semibold underline">
              {email}
            </a>
          )}
        </p>
      )}
      <button
        style={{ ["--i" as string]: 4 }}
        type="submit"
        disabled={pending}
        data-guide="contact"
        className="bg-primary group flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? form.sending : form.send} <ArrowUpRight className={`size-5 transition group-hover:rotate-45 ${pending ? "animate-pulse" : ""}`} />
      </button>
    </form>
  );
}
