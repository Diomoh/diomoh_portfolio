# Journal des mises à jour · diomoh.com

État au 5 octobre 2026. Ce document résume ce qui a été fait, comment c'est configuré et ce qu'il reste à faire, pour servir de base aux prochaines évolutions (backend, nouvelles pages, etc.).

Audit de sécurité complet : [`../AUDIT_SECURITE.md`](../AUDIT_SECURITE.md).

---

## 1. Identité visuelle

| Élément | Fichier(s) | Détail |
|---|---|---|
| Favicon | `public/favicon.svg`, `src/app/[lang]/layout.tsx` | Déclaré via `metadata.icons`. L'ancien `favicon.ico` de Next.js a été supprimé. |
| Logo (barre de navigation) | `public/diomoh-logo-negatif.png`, `src/components/Nav.tsx` | Version blanche sur la barre sombre, à la place de « MD. ». |
| Logo (pied de page) | `src/components/Footer.tsx` | Logo blanc + nom + copyright + « Haut de page ». |
| Curseur personnalisé | `src/app/[lang]/globals.css` (fin du fichier) | Flèche bleue du guide (SVG en CSS). Sur les éléments cliquables : flèche inclinée + pastille. Souris uniquement (`pointer: fine`) ; champs texte et guide inchangés. |

## 2. Images de fond

| Section | Image | Fichier |
|---|---|---|
| Hero | `public/footer.png` | `src/components/Hero.tsx` : halo gris et fondus noirs retirés, bas de la photo estompé sur mobile (masque). |
| Services | `public/deuxime.png` | `src/components/Services.tsx` : textes en blanc, survol en blanc, carte « 7+ » en blanc. |
| Contact | `public/footer.png` | `src/components/Contact.tsx` |
| Pied de page | `public/footer.png` | `src/components/Footer.tsx` : panneau arrondi, même largeur que Contact. |

Toutes passent par `next/image` (compression, tailles adaptées, flou pendant le chargement).

## 3. Contenu et mise en page

- **Hero** : bloc « Je suis / Mohamed Diomande / Software Engineer » réduit d'environ 25 % ; nom plus coupé en haut ; texte de bienvenue remonté sous le nom sur mobile.
- **Compétences** : titre « Mes compétences. » (EN « My skills. ») ; logo ChatGPT/OpenAI pour Codex (intégré dans `Skills.tsx`, absent de Simple Icons) ; nom de l'outil en bulle au survol.
- **Projets** : mention grise sous le titre « Liste non exhaustive : certains projets restent confidentiels. » (`projects.note`).
- **Formation** : Doctorat INPHB (2026 → 2030) mis en commentaire dans `fr.ts` / `en.ts`, à réactiver plus tard.
- **Sur-titres retirés** partout (Compétences, Projets, Services, Contact, Formation, À propos) avec leurs tirets. Les clés `eyebrow` restent dans le contenu mais ne sont plus affichées.
- **Pied de page** : le grand nom en filigrane a été retiré.

## 3 bis. Adresses inconnues

Le site n'a qu'une page par langue : toute autre adresse redirige (307, temporaire) vers l'accueil. `/fr/xyz` → `/fr`, `/xyz` → `/fr` ou `/en` selon le visiteur, `/page.php` → `/`.
Fichiers : `src/proxy.ts`, `src/app/[lang]/[...rest]/page.tsx` (adresses avec extension), `layout.tsx` (langue inconnue). À remplacer par de vraies pages 404 quand le site aura plusieurs pages.

## 4. Guide (flèche bleue « Commencez ici »)

Fichier : `src/components/FloatingShapes.tsx`.

- La cible du hero est le bouton « Démarrer un projet » (`data-guide="hero"` dans `HeroCarousel.tsx`).
- Placement : à gauche de la cible, sinon à droite, sinon au-dessus.
- **Déplaçable** à la souris ou au doigt ; la position est mémorisée dans le navigateur (`localStorage`, clé `guide-pos`, en fraction de fenêtre). **Double-clic** : retour au placement automatique.
- Ne fuit plus le curseur quand on la survole, la tient ou l'a placée.
- Fin contour blanc pour rester visible sur les fonds bleus.

## 5. Formulaire de contact et e-mails

### Fonctionnement

- `src/components/ContactForm.tsx` : formulaire relié à une Server Action (`useActionState`), états « Envoi en cours… », succès, erreur (avec l'e-mail en secours), champs invalides. Champ piège invisible (`website`) contre les robots. La langue du site est transmise (`lang`).
- `src/actions/contact.ts` : validation, limites anti-abus, envoi SMTP.
- `src/lib/emails.ts` : modèles HTML des e-mails (tableaux + styles en ligne pour Gmail/Outlook).
- `src/lib/rate-limit.ts` : compteurs à mémoire bornée, sémaphore, lecture de l'IP visiteur.

Deux e-mails par message :

1. **Notification** à `CONTACT_TO` : nom, e-mail, langue, message dans un encadré, bouton « Répondre à … ». `Reply-To` = visiteur.
2. **Confirmation** au visiteur, dans sa langue (textes dans `contact.confirmation` de `fr.ts` / `en.ts`). Ne recopie pas son message (pas de relais de spam). Un échec n'annule pas la notification.

Design commun : fond gris clair, carte blanche arrondie, bandeau bleu (`public/email/banner.png` : logo + photo), bouton bleu arrondi. Les images sont chargées depuis `https://diomoh.com/email/…` (elles n'apparaissent qu'une fois le site en ligne).

### Variables d'environnement (`.env.local` en dev, `.env` sur le VPS, modèle : `.env.example`)

| Variable | Valeur | Rôle |
|---|---|---|
| `SMTP_HOST` | `smtp-relay.brevo.com` | Serveur SMTP Brevo |
| `SMTP_PORT` | `587` | STARTTLS (TLS exigé par le code) |
| `SMTP_USER` | identifiant SMTP Brevo | |
| `SMTP_PASS` | clé SMTP Brevo (`xsmtpsib-…`) | **Secret**, jamais commité |
| `CONTACT_FROM` | `contact@diomoh.com` | Expéditeur (validé dans Brevo) |
| `CONTACT_TO` | `contact@diomoh.com` | Destinataire des notifications |
| `CLIENT_IP_HEADER` | `cf-connecting-ip` | En-tête de la vraie IP (derrière Cloudflare) |

Les fichiers `.env*` sont exclus de Git et de l'image Docker (sauf `.env.example`). Permissions recommandées : `chmod 600`.

### Services externes

- **Brevo** : envoi SMTP. Domaine `diomoh.com` à authentifier (DKIM, DMARC) pour éviter le spam. Logs : *Transactionnel → Logs*.
- **Cloudflare Email Routing** : `contact@diomoh.com` → `dioomande.mohamed@gmail.com`. Un seul enregistrement SPF, à fusionner avec Brevo si besoin :
  `v=spf1 include:_spf.mx.cloudflare.net include:spf.brevo.com ~all`
- **Photo de profil des e-mails** (optionnel) : créer un compte Google avec `contact@diomoh.com` et mettre `public/email/avatar.png` en photo (visible dans Gmail).

## 6. Sécurité (suite à l'audit)

Détail et statut de chaque point : section « Suivi des corrections » de [`AUDIT_SECURITE.md`](../AUDIT_SECURITE.md).

| Mesure | Où |
|---|---|
| 5 tentatives / IP / heure (invalides comprises), vérifiées en premier | `contact.ts` |
| 40 envois / heure au total, quelle que soit l'IP | `contact.ts` |
| 2 confirmations / adresse visiteur / jour | `contact.ts` |
| 2 envois SMTP simultanés, pool de 2 connexions, délais 10 s / 10 s / 20 s, `requireTLS` | `contact.ts` |
| Compteurs à mémoire bornée (5 000 clés max, nettoyage) | `rate-limit.ts` |
| Corps des Server Actions limité à 64 Ko | `next.config.ts` |
| En-têtes : CSP (frame-ancestors, base-uri, form-action, object-src), X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS ; `X-Powered-By` retiré | `next.config.ts` |
| Optimiseur d'images limité à `/images/**` et `/_next/static/media/**`, sans paramètres, qualité 75, cache 200 Mo | `next.config.ts` |
| Conteneur plafonné : 512 Mo, 1 CPU, 200 processus, tas Node 384 Mo, logs 3 × 10 Mo, `no-new-privileges`, `cap_drop: ALL` | `compose.yaml` |
| `suppressHydrationWarning` sur `<body>` (attributs ajoutés par les extensions navigateur) | `layout.tsx` |
| Cloudflare : règle de limitation `limitation-diomoh` (POST sur diomoh.com, 3 / 10 s / IP → blocage) | Tableau de bord Cloudflare |

Restant : CSP sur les scripts (incompatible avec les scripts inline Next.js en l'état), anti-bot Turnstile, vulnérabilité `braces` côté lint (pas de correctif amont, ne pas lancer `npm audit fix --force`), accès direct à l'origine sans Cloudflare.

## 7. Déploiement

Le site tourne en Docker sur le même VPS qu'ivoiprono / Tuyo, derrière leur Caddy (réseau Docker externe `app_web`).

Mise à jour :

```bash
cd <dossier-du-portfolio>
git pull
docker compose up -d --build
docker logs --tail 20 diomoh      # « Ready »
docker stats diomoh               # consommation
```

Première fois après ces changements : créer `.env` à partir de `.env.example`, compléter `SMTP_PASS`, ajouter `CLIENT_IP_HEADER=cf-connecting-ip`, `chmod 600 .env`.

Cloudflare : enregistrements `diomoh.com` et `www` en **Proxied** (nuage orange), SSL **Full (strict)**, sinon la règle de limitation ne s'applique pas.

## 8. Pistes pour la suite (backend, etc.)

- **Limites partagées** : les compteurs anti-abus sont en mémoire (remis à zéro au redémarrage, propres à un processus). Avec un backend ou plusieurs instances, les déplacer dans Redis (avec TTL) ou en base.
- **Stockage des messages** : enregistrer chaque demande (base de données) avant l'envoi de l'e-mail, pour ne rien perdre si Brevo échoue, et avoir un historique.
- **Anti-bot** : Cloudflare Turnstile vérifié côté serveur.
- **File d'envoi** : passer les e-mails par une file (BullMQ, tâche de fond) plutôt qu'en direct dans la requête.
- **CSP complète** : nonces via `proxy.ts` pour autoriser les scripts Next.js et activer `script-src`.
- **Contenu** : réactiver le Doctorat ; infos encore manquantes listées dans `CLAUDE.md` (technos des projets, liens GitHub/Upwork, CV PDF, captures réelles, etc.).
- **Mobile** : faire apparaître les noms des compétences au toucher (pas de survol sur mobile).
