"use server";

import "server-only";
import { headers } from "next/headers";
import nodemailer, { type Transporter } from "nodemailer";
import { getContent } from "@/content";
import { hasLocale } from "@/i18n/config";
import { confirmationEmail, notificationEmail } from "@/lib/emails";
import { clientIp, createLimiter, createSemaphore } from "@/lib/rate-limit";

export type ContactState = { status: "idle" | "success" | "error" | "invalid" };

const env = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Variable d'environnement manquante : ${key}`);
  return value;
};

// Garde-fous anti-abus (mémoire bornée) :
// - 5 tentatives par IP et par heure (invalides et refusées comprises) ;
// - 2 confirmations par adresse visiteur et par jour ;
// - 40 envois par heure au total, quelle que soit l'IP (budget SMTP) ;
// - 2 envois SMTP simultanés au maximum.
const perIp = createLimiter({ limit: 5, windowMs: 3_600_000 });
const perRecipient = createLimiter({ limit: 2, windowMs: 86_400_000 });
const everyone = createLimiter({ limit: 40, windowMs: 3_600_000, maxKeys: 1 });
const smtpSlot = createSemaphore(2);

// Transport SMTP partagé : connexions réutilisées, TLS obligatoire, délais courts.
let transport: Transporter | null = null;
const getTransport = () =>
  (transport ??= nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    requireTLS: true,
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    pool: true,
    maxConnections: 2,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  }));

// Envoie le message du formulaire de contact via le SMTP de Brevo.
export async function sendContact(_: ContactState, data: FormData): Promise<ContactState> {
  // Quota par IP vérifié en premier, avant tout travail.
  if (perIp(clientIp(await headers()))) return { status: "error" };

  // Champ piège invisible : rempli uniquement par les robots.
  if (data.get("website")) return { status: "success" };

  const name = String(data.get("name") ?? "").trim().slice(0, 120);
  const email = String(data.get("email") ?? "").trim().slice(0, 200);
  const project = String(data.get("project") ?? "").trim().slice(0, 5000);
  if (!name || !project || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "invalid" };

  const lang = String(data.get("lang") ?? "");
  const locale = hasLocale(lang) ? lang : "fr";
  const { confirmation } = getContent(locale).contact;

  if (everyone("all")) return { status: "error" };

  const sent = await smtpSlot(async () => {
    const transport = getTransport();
    const from = env("CONTACT_FROM");
    await transport.sendMail({
      from: { name: "Portfolio diomoh", address: from },
      to: env("CONTACT_TO"),
      replyTo: { name, address: email },
      ...notificationEmail({ name, email, project, lang: locale }),
    });

    // Confirmation au visiteur : texte fixe (sans recopier son message, pour ne pas servir de relais à spam),
    // 2 par adresse et par jour. Un échec ici n'annule pas l'envoi principal.
    if (perRecipient(email.toLowerCase())) return true;
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
    return true;
  }).catch((err) => {
    console.error("[contact] envoi impossible :", err);
    return false;
  });

  if (sent === null) console.warn("[contact] trop d'envois simultanés, message refusé");
  return { status: sent ? "success" : "error" };
}
