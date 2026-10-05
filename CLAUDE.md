@AGENTS.md

# Portfolio Mohamed Diomande

Site vitrine de Mohamed Diomande (Développeur Fullstack & Chef de projet). Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript.

## Commandes

- `npm run dev` : développement (http://localhost:3000)
- `npm run lint` puis `npm run build` : à lancer avant de dire qu'un changement est fini

## Façon de travailler

- On avance **bloc par bloc** ; Mohamed donne les modifications au fur et à mesure. Ne modifier que le bloc demandé.
- Pour un nouveau design de bloc : proposer 2–3 concepts **uniques** avec aperçu, puis coder celui choisi.
- Réponses courtes, en français.
- Avant tout travail visuel : charger le skill `design-system` (`.claude/skills/design-system/SKILL.md`).

## Structure

- `src/app/[lang]/` : layout racine, page unique, `globals.css` (tokens de design).
- `src/proxy.ts` : redirection `/` → `/fr` ou `/en` (cookie `NEXT_LOCALE` > pays via en-têtes CDN > `Accept-Language` > `fr`).
- `src/i18n/config.ts` : langues, pays francophones, en-têtes de pays (`x-vercel-ip-country`, `cf-ipcountry`, `x-country-code` pour Nginx GeoIP2).
- `src/content/fr.ts` / `en.ts` : **tout le texte du site**. `fr.ts` définit le type `Content`, `en.ts` doit le respecter.
- `src/components/` : un composant par bloc (`Hero`, `Intro`, `About`, `Skills`, `Projects`, `Services`, `Education`, `Contact`, `Footer`) + utilitaires (`SectionHeader`, `MockScreen`, `RevealObserver`, `LangSwitch`, `icons`).
- `public/images/` : `mohamed.jpg` (photo, image Open Graph) et `mohamed-cutout.webp` (photo détourée).
- `src/actions/contact.ts` : Server Action du formulaire (SMTP Brevo, limites anti-abus) ; `src/lib/emails.ts` (modèles d'e-mails), `src/lib/rate-limit.ts` (compteurs bornés, IP visiteur).
- `public/email/` : bandeau et avatar des e-mails. Variables d'environnement : voir `.env.example`.
- `docs/MISES_A_JOUR.md` : journal des évolutions et de la configuration ; `AUDIT_SECURITE.md` : audit et suivi des corrections.
- Source du contenu : `../contenu/portfolio-contenu.md` (FR) et `portfolio-content-en.md` (EN).

## Règles de contenu

- Ne jamais inventer de chiffre, date, lieu ou technologie : tout vient des fichiers de `../contenu/`. Si c'est marqué « À compléter », masquer l'élément.
- Toute modification de texte se fait dans `fr.ts` **et** `en.ts`.

## Infos encore manquantes

Technologies du DPI, de Learn et de Tuyo AI ; liens GitHub, Upwork ; CV en PDF ; lien de Tuyo AI ; date de fin chez TIR (affiché « Depuis octobre 2024 ») ; témoignages ; captures réelles des projets (aujourd'hui remplacées par des maquettes `MockScreen`).
