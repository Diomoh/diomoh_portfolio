---
name: design-system
description: Design system du portfolio de Mohamed Diomande (couleurs, typographie, formes, mouvement, règles de contenu). À charger avant de créer ou modifier un bloc, un composant ou un style du site.
---

# Design system · Portfolio Mohamed Diomande

Objectif : un visiteur qui dit « waouh » et qui fait confiance. Chaque bloc a un concept visuel **unique** ; le texte est **court**.

## Règles absolues

- **Aucun dégradé de couleur.** Couleurs pleines uniquement. Seules exceptions : le fondu gris derrière la photo du hero et les astuces de forme (coin inversé `.inv-corner`, rayures de `.sphere`).
- **Bleu `#2563eb` = couleur principale** (`primary`) : boutons, accents, ligne active, points, sélection.
- **Texte bref** : une ligne par idée, pas de paragraphe. Chiffres en très grand plutôt que phrases.
- **Ne rien inventer** : tout fait (chiffre, date, lieu, techno) vient de `contenu/portfolio-contenu.md`. Si une info manque, masquer l'élément.
- **Bilingue** : tout texte visible vit dans `src/content/fr.ts` et `src/content/en.ts` (même structure, `en` typé `Content`). Jamais de texte en dur dans un composant, sauf noms propres.

## Couleurs (tokens `globals.css` → classes Tailwind)

| Token | Valeur | Usage |
|---|---|---|
| `primary` | `#2563eb` | Accent principal, CTA, Agents IA |
| `ink` / `ink-2` | `#0d0d0e` / `#161618` | Panneaux sombres, texte |
| `paper` / `paper-2` | `#ffffff` / `#f5f5f2` | Fond de page (blanc) / cartes claires |
| `teal` | `#a8dcd4` | Tuile, panneau d'accent |
| `yellow` | `#fcc86d` | Tuile, panneau d'accent |
| `pink` | `#f0b2f4` | Cercle portrait, panneau d'accent |
| `slate` | `#59595c` | Tuile neutre |

Opacités de texte : `text-ink/60` (secondaire), `text-white/55` (secondaire sur fond sombre), `text-*/40` (méta).
Alternance des blocs : clair (`paper`) ↔ panneau sombre arrondi (`bg-ink`, `rounded-[28px]`, marge `px-2 sm:px-4`).

## Typographie

- **Display** : Plus Jakarta Sans (`font-display`), graisses 300 → 800, italique pour les mots forts (nom du hero, mot actif).
- **Texte** : DM Sans (`font-sans`), DM Mono (`font-mono`) — mêmes polices que Learn.
- **Étiquette** : petit texte display blanc sur fond `bg-primary`, `rounded-md` (ex. « Je suis » au-dessus du nom du hero).
- Grands titres : `tracking-[-0.045em]`, `leading-[0.98]` ; tailles fluides `text-[clamp(36px,5.2vw,76px)]`.
- Chiffres géants : `font-bold tracking-[-0.05em] text-[clamp(64px,8.5vw,140px)] leading-[0.85]`.
- Sur-titres : `text-xs font-semibold tracking-[0.22em] uppercase` + trait `h-px w-10 bg-primary` (composant `SectionHeader`).

## Formes

- **Pas d'ombre sur les sections ni les cartes** ; ombres réservées aux éléments flottants (barre de nav, menu de langue, bouton de contact) et au panneau projet actif, légèrement soulevé.
- Rayons : sections `rounded-[28px]`, cartes `rounded-[28px]`/`rounded-[32px]`, tuiles `rounded-xl`, boutons `rounded-full`.
- Boutons : principal `bg-primary text-white rounded-full px-6 py-3.5 font-semibold` ; secondaire `border border-ink/15 rounded-full`.
- Icônes : `src/components/icons.tsx` (trait 1.8, 24×24). Flèche `ArrowUpRight` qui tourne de 45° au survol.
- Coins de tuile : petit équerre `border-t-2 border-r-2` (composant `Corner` dans `Intro.tsx`).

## Mouvement

- Apparition au défilement : attribut `data-reveal` (+ `style={{ "--delay": "120ms" }}`), géré par `RevealObserver`.
- Animations CSS existantes : `rise`, `fade-up`, `photo-in`, `animate-marquee(-slow)`, `animate-spin-slow`, `pulse-dot`.
- Effets liés au défilement (piste horizontale, cartes empilées) : `requestAnimationFrame`, styles écrits via `ref`, jamais d'état React à chaque frame sauf l'index actif.
- Titres de section : `data-split` + `splitWords(...)` (mots qui se posent un par un), puis le trait `Underline` se dessine.
- Listes en cascade : `data-reveal="rise" | "pop" | "slide" | "clip"` sur le conteneur, `--i` sur chaque enfant.
- Toujours prévoir `prefers-reduced-motion` (variante `motion-reduce:` ou test `matchMedia`).
- Courbe : `cubic-bezier(0.19, 1, 0.22, 1)`, durées 300–900 ms.

## Concepts déjà utilisés (ne pas répéter)

Guide mobile (flèche + bulle qui rejoint l'élément [data-guide] de chaque section) · Hero éditorial + liste qui défile · Services : mosaïque de photos + bandeaux bleus alternés dans une grande carte claire · Principes de travail en 4 colonnes arrondies, la colonne survolée passe en noir (« Rigoureux. ») · Méthode en 5 mots (défilement horizontal) · Projets en accordéon (panneau ouvert avec capture, bandes verticales avec le nom) · Compétences : titre à gauche, grille de logos à droite.
Chaque nouveau bloc doit proposer un concept différent ; présenter 2–3 options avec aperçu avant de coder.

## Responsive et qualité

- Tester à 1440 px et 390 px ; aucun défilement horizontal de page.
- Gouttières mobiles `px-5`, desktop `sm:px-8` / `lg:px-16`.
- Images via `next/image` (`preload` pour le hero, pas `priority`).
- Vérifier avant de livrer : `npm run lint && npm run build`, puis captures avec Chrome headless.
