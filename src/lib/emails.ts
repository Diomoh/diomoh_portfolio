import "server-only";

// Modèles HTML des e-mails (tableaux + styles en ligne : seul format fiable dans Gmail et Outlook).
// Les images sont servies par le site en ligne : elles s'affichent une fois diomoh.com déployé.
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") ? process.env.NEXT_PUBLIC_SITE_URL : "https://diomoh.com";
const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const INK = "#0d0d0e";
const MUTED = "#59595c";
const PRIMARY = "#2563eb";

export const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const button = (href: string, label: string) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:32px auto 8px">
  <tr><td style="border-radius:999px;background:${PRIMARY}">
    <a href="${href}" style="display:inline-block;padding:15px 34px;font-family:${FONT};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px">${label} &rarr;</a>
  </td></tr>
</table>`;

// Cadre commun : fond gris clair, carte blanche arrondie, bandeau bleu (logo + photo), pied de page.
function layout({ lang, preheader, body, footer }: { lang: string; preheader: string; body: string; footer: string }) {
  return `<!doctype html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>diomoh</title></head>
<body style="margin:0;padding:0;background:#eef1f7">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef1f7">
    <tr><td align="center" style="padding:40px 16px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:28px">
        <tr><td style="padding:20px 20px 0">
          <img src="${SITE}/email/banner.png" width="560" alt="diomoh · Mohamed Diomande" style="display:block;width:100%;max-width:560px;height:auto;border:0;border-radius:18px;background:#1e3fae;color:#ffffff;font-family:${FONT}">
        </td></tr>
        <tr><td style="padding:36px 40px 40px;font-family:${FONT};color:${INK};font-size:16px;line-height:1.65">
          ${body}
        </td></tr>
      </table>
      <p style="margin:24px 0 0;font-family:${FONT};font-size:13px;color:${MUTED}">${footer}</p>
    </td></tr>
  </table>
</body>
</html>`;
}

type Confirmation = { subject: string; title: string; greeting: string; body: string; cta: string; signature: string; note: string; footer: string };

// E-mail de confirmation envoyé au visiteur.
export function confirmationEmail(c: Confirmation, { name, lang }: { name: string; lang: string }) {
  const greeting = c.greeting.replace("{name}", name);
  const html = layout({
    lang,
    preheader: escape(c.body),
    footer: escape(c.footer),
    body: `
      <p style="margin:0;color:${MUTED}">${escape(greeting)}</p>
      <h1 style="margin:10px 0 18px;font-size:28px;line-height:1.2;font-weight:800;letter-spacing:-0.5px;color:${INK}">${escape(c.title)}</h1>
      <p style="margin:0">${escape(c.body)}</p>
      ${button(`${SITE}/${lang}#projects`, escape(c.cta))}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;border-top:1px solid #e6e8ee">
        <tr><td style="padding-top:20px">
          <p style="margin:0;font-weight:700">Mohamed Diomande</p>
          <p style="margin:2px 0 0;font-size:14px;color:${MUTED}">${escape(c.signature)}</p>
        </td></tr>
      </table>
      <p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:${MUTED}">${escape(c.note)}</p>`,
  });
  const text = `${greeting}\n\n${c.title}\n\n${c.body}\n\n${c.cta} : ${SITE}/${lang}#projects\n\nMohamed Diomande\n${c.signature}\n\n${c.note}`;
  return { subject: c.subject, html, text };
}

// E-mail reçu par Mohamed pour chaque nouveau message.
export function notificationEmail({ name, email, project, lang }: { name: string; email: string; project: string; lang: string }) {
  const html = layout({
    lang: "fr",
    preheader: `${escape(name)} : ${escape(project.slice(0, 90))}`,
    footer: "Formulaire de contact · diomoh.com",
    body: `
      <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${PRIMARY}">Nouveau projet</p>
      <h1 style="margin:10px 0 6px;font-size:26px;line-height:1.2;font-weight:800;color:${INK}">${escape(name)}</h1>
      <p style="margin:0 0 24px"><a href="mailto:${escape(email)}" style="color:${PRIMARY};text-decoration:none">${escape(email)}</a> <span style="color:${MUTED}">· site en ${lang === "en" ? "anglais" : "français"}</span></p>
      <div style="padding:18px 20px;background:#f4f7ff;border-left:4px solid ${PRIMARY};border-radius:6px;white-space:pre-wrap">${escape(project)}</div>
      ${button(`mailto:${escape(email)}?subject=${encodeURIComponent("Re: votre projet")}`, `Répondre à ${escape(name.split(" ")[0])}`)}`,
  });
  const text = `Nouveau projet de ${name} (${email})\n\n${project}`;
  return { subject: `Nouveau projet · ${name}`, html, text };
}
