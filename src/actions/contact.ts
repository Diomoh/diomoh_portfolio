"use server";

import "server-only";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { getContent } from "@/content";
import { hasLocale } from "@/i18n/config";
import { confirmationEmail, notificationEmail } from "@/lib/emails";

export type ContactState = { status: "idle" | "success" | "error" | "invalid" };

const env = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Variable d'environnement manquante : ${key}`);
  return value;
};

// Anti-spam simple : 5 envois max par IP et par heure (mémoire du serveur).
const hits = new Map<string, number[]>();
const tooMany = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

// Envoie le message du formulaire de contact via le SMTP de Brevo.
export async function sendContact(_: ContactState, data: FormData): Promise<ContactState> {
  // Champ piège invisible : rempli uniquement par les robots.
  if (data.get("website")) return { status: "success" };

  const name = String(data.get("name") ?? "").trim().slice(0, 120);
  const email = String(data.get("email") ?? "").trim().slice(0, 200);
  const project = String(data.get("project") ?? "").trim().slice(0, 5000);
  if (!name || !project || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "invalid" };

  const lang = String(data.get("lang") ?? "");
  const locale = hasLocale(lang) ? lang : "fr";
  const { confirmation } = getContent(locale).contact;

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() ?? h.get("x-real-ip") ?? "local";
  if (tooMany(ip)) return { status: "error" };

  try {
    const transport = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    });
    const from = env("CONTACT_FROM");
    await transport.sendMail({
      from: { name: "Portfolio diomoh", address: from },
      to: env("CONTACT_TO"),
      replyTo: { name, address: email },
      ...notificationEmail({ name, email, project, lang: locale }),
    });

    // Confirmation au visiteur : texte fixe (sans recopier son message, pour ne pas servir de relais à spam).
    // Un échec ici n'annule pas l'envoi principal.
    try {
      await transport.sendMail({
        from: { name: "Mohamed Diomande", address: from },
        to: { name, address: email },
        replyTo: env("CONTACT_TO"),
        ...confirmationEmail(confirmation, { name, lang: locale }),
      });
    } catch (err) {
      console.error("[contact] confirmation au visiteur impossible :", err);
    }
    return { status: "success" };
  } catch (err) {
    console.error("[contact] envoi impossible :", err);
    return { status: "error" };
  }
}
