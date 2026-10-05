# Audit de sécurité du portfolio — 5 octobre 2026

Périmètre : ce dépôt uniquement, son historique Git local, ses dépendances, ses fichiers publics et compilés locaux, sa configuration Docker et quatre requêtes HTTP HEAD sur `diomoh.com`. Aucun audit des applications présentées dans le portfolio, aucun accès au VPS, aucun test de charge en production et aucun envoi SMTP.

## Verdict

Aucun secret exposé détecté dans les éléments examinés. Des défauts de protection contre les abus du formulaire et la consommation de ressources existent. Une surcharge du portfolio peut affecter les autres services du VPS partagé si les limites ne sont pas ajoutées au déploiement. La capacité réelle du serveur et les protections Cloudflare/Caddy ne sont pas connues : cet audit ne prouve ni une compromission, ni une résistance à une attaque.

## Constats prioritaires

### 1. Élevé — compteur anti-spam non borné

Preuve : `src/actions/contact.ts:18-25`.

Chaque tentative ajoute une date, y compris quand la requête est refusée. Les dates expirées ne sont retirées que lors d'une nouvelle tentative avec la même clé ; les clés ne sont jamais supprimées. Le tableau d'une IP très sollicitée grandit pendant toute la fenêtre d'une heure. Chaque requête suivante parcourt le tableau existant : une rafale augmente à la fois la mémoire et le travail CPU.

Reproduction locale sans réseau, en exécutant la fonction existante dans un contexte isolé :

- 10 000 tentatives avec la même IP : 5 acceptées, mais 10 000 dates conservées.
- 10 000 clés supplémentaires : 10 001 clés conservées au total.

Corriger avec un compteur de taille constante et une expiration, un plafond de clés et un nettoyage. Pour plusieurs processus, utiliser un stockage partagé avec TTL. Ajouter une limite de débit avant l'application pour les requêtes refusées et invalides.

### 2. Élevé, exploitation conditionnelle — confiance dans les en-têtes IP

Preuve : `src/actions/contact.ts:42-44`.

Le code utilise le premier élément de `x-forwarded-for`, puis `x-real-ip`, sans vérification du proxy de confiance ni validation du format de l'IP. Si l'infrastructure conserve une valeur fournie par le visiteur, changer cette valeur permet de contourner les cinq envois par heure et de créer des clés arbitraires dans le compteur. Si toutes les requêtes reçoivent une IP de proxy commune, des visiteurs légitimes peuvent partager le même quota. Le compteur est aussi remis à zéro au redémarrage et indépendant pour chaque processus.

Cloudflare et Caddy sont observés dans les réponses publiques. Leur configuration n'est pas accessible dans ce dépôt : le contournement effectif en production n'a pas été démontré.

Vérifier la chaîne Cloudflare → Caddy → Next.js, faire reconstruire les en-têtes par le proxy, limiter les proxys de confiance et bloquer l'accès direct à l'origine lorsque cette architecture le permet. Ajouter un budget global d'envoi, indépendant des adresses IP.

### 3. Élevé pour la disponibilité — ressources du conteneur non plafonnées

Preuve : `compose.yaml:3-9`.

La configuration fournie ne fixe ni limite mémoire, ni quota CPU, ni limite de processus, ni rotation des journaux. Le commentaire du fichier indique un VPS partagé avec Tuyo. Un volume de requêtes important, des transformations d'images ou une accumulation de connexions SMTP peuvent donc concurrencer les autres services. Des limites externes au fichier peuvent exister ; elles n'ont pas été vérifiées.

Ajouter des plafonds adaptés aux ressources du VPS, une rotation des logs et une surveillance mémoire/CPU/disque. Les limites isolent mieux le portfolio mais ne remplacent pas une protection contre les attaques réseau.

### 4. Moyen — formulaire utilisable pour des envois non sollicités et des connexions longues

Preuve : `src/actions/contact.ts:47-69`.

Chaque soumission acceptée crée un transport SMTP et peut envoyer deux courriels. La confirmation part vers une adresse fournie par le visiteur, sans preuve qu'il possède cette adresse. Le texte fixe réduit l'abus, mais n'empêche pas d'envoyer des confirmations indésirables ou d'épuiser le quota SMTP. Le champ piège est visible dans le code et facile à laisser vide. Aucun plafond global ni limite de concurrence n'est présent.

Les délais Nodemailer installés sont de 2 minutes pour la connexion, 30 secondes pour l'accueil et 10 minutes d'inactivité de socket. Ce sont des délais par phase, pas une durée maximale totale garantie. L'application ne les réduit pas.

Ajouter des délais courts, une limite de concurrence, un quota global et un budget par destinataire ; envisager une vérification anti-bot validée côté serveur. Sur le port 587, imposer `requireTLS: true` : actuellement STARTTLS est utilisé si annoncé, mais n'est pas exigé par la configuration. Cela ne prouve pas que les connexions Brevo actuelles soient en clair.

### 5. Moyen — protections navigateur absentes des réponses vérifiées

Preuve : `next.config.ts:3-6` et réponses HEAD de `/fr` et `/en`.

Les réponses HTTPS sont servies, mais les en-têtes suivants ne sont pas présents : `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`. `X-Powered-By: Next.js` est présent ; cette identification est un point mineur, pas une faille critique.

Ajouter une politique anti-encadrement (`frame-ancestors` et éventuellement `X-Frame-Options`), `nosniff` et les autres en-têtes appropriés. Déployer une CSP compatible avec les scripts et styles Next.js après validation, de préférence d'abord en observation. Définir HSTS après vérification de la politique HTTPS, notamment des sous-domaines si `includeSubDomains` est utilisé.

### 6. Moyen, risque à confirmer — optimisation d'images et cache

Preuve : `next.config.ts`, composants utilisant `next/image`, valeurs par défaut de la version Next.js installée.

L'optimiseur d'images reste actif sans `localPatterns` restrictifs. Les URL locales peuvent accepter des paramètres de recherche ; des variantes d'URL peuvent multiplier les entrées de cache et les transformations. Le plafond de cache disque `maximumDiskCacheSize` est indéfini par défaut dans cette version. Les tailles et qualités sont néanmoins limitées par les valeurs par défaut de Next.js : ce n'est pas une liberté de transformation illimitée.

Restreindre les chemins nécessaires, interdire les paramètres inutiles avec `search: ''`, limiter les dimensions utilisées, fixer un budget de cache et protéger `/_next/image` contre les rafales. Tenir compte aussi des images importées dans `/_next/static/media/**`. Aucun test de saturation de l'optimiseur n'a été réalisé.

### 7. Moyen pour le développement — vulnérabilité transitive de `braces`

`npm audit --json` : 5 alertes élevées dans la chaîne `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces@3.0.3`. Il s'agit d'une même vulnérabilité propagée à cinq paquets, pas de cinq failles indépendantes du serveur.

`npm audit --omit=dev --json` : aucune vulnérabilité signalée pour les dépendances de production à la date du contrôle. Versions installées : Next.js 16.3.8, React/React DOM 19.2.8, Nodemailer 10.0.15. L'absence d'alerte npm ne garantit pas l'absence de toute vulnérabilité.

L'avis [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) décrit un épuisement de pile avec des motifs profondément imbriqués et n'indique aucune version corrigée lors du contrôle. Aucun chemin depuis les entrées HTTP du portfolio vers cette dépendance de lint n'a été identifié. Ne pas appliquer aveuglément `npm audit fix --force` : npm propose ici une rétrogradation majeure de `eslint-config-next` vers 14.2.35. Suivre le correctif amont et éviter les motifs de lint fournis par des tiers.

### 8. Faible — permissions du fichier de secrets local

`.env.local` contient une valeur secrète configurée et n'est pas suivi par Git. Ses permissions locales sont `0664`, donc le fichier est lisible par le groupe et les autres utilisateurs ayant accès à son chemin. Cela ne constitue pas une exposition HTTP démontrée. Restreindre ce fichier à l'utilisateur concerné (`0600`) et vérifier les permissions de `.env` sur le VPS. Aucune valeur secrète n'est reproduite dans ce rapport.

## Vérifications des secrets et protections présentes

- Recherche par signatures de clés privées, jetons de fournisseurs courants et affectations sensibles dans les fichiers suivis et 104 blobs uniques de l'historique Git accessible : aucun résultat. Recherche heuristique, non exhaustive pour tous les formats possibles de secrets.
- Recherche exacte de la valeur secrète configurée localement dans 25 fichiers sous `public` et 26 fichiers sous `.next/static` : aucune correspondance.
- `.env.local` non suivi ; `.env*` ignorés par Git et Docker, sauf `.env.example`. Ce dernier contient un identifiant SMTP, mais aucun mot de passe configuré. Un identifiant seul n'est pas une clé d'accès.
- Requêtes HEAD publiques : `/.env` et `/.git/config` répondent 404. Ces deux contrôles ne couvrent pas tous les noms de sauvegardes possibles.
- Code SMTP et modèles de courriel marqués `server-only` ; aucun secret SMTP préfixé `NEXT_PUBLIC_` dans le code examiné.
- Contenu fourni par le visiteur échappé dans les courriels HTML ; rendu React sans `dangerouslySetInnerHTML` identifié. Aucun accès SQL, exécution de commande ou téléchargement serveur piloté par le formulaire identifié.
- Next.js fournit une limite par défaut de 1 Mo pour les Server Actions et un contrôle de l'origine. La troncature des champs ne remplace pas une limite HTTP plus adaptée avant leur décodage. Un robot peut appeler une Server Action directement, sans passer par le bouton désactivé de l'interface.
- Conteneur final exécuté avec l'utilisateur `node`, sans port publié sur l'hôte dans le fichier Compose. Ces mesures réduisent certains risques ; l'état réel du déploiement reste à vérifier.
- Pages `/fr` et `/en` observées comme prérendues et servies depuis le cache Next.js. Cloudflare est présent, mais retourne `CF-Cache-Status: DYNAMIC` pour les réponses HEAD examinées ; cela ne permet pas de conclure au comportement de tous les GET ni aux règles WAF actives.

## Autres points et limites

Le dossier public local occupe environ 42 Mo, dont une vidéo ignorée par Git d'environ 30,6 Mo. Elle est exclue du contexte Docker via `.dockerignore`, mais un lancement local avec `next start` ou un autre déploiement copiant tout `public` pourrait la servir. Supprimer les assets inutilisés de la livraison et contrôler le cache des ressources volumineuses.

Le partage du réseau Docker externe `app_web` est déclaré. Ses membres et les éventuels services internes accessibles depuis le portfolio sont inconnus : examiner l'isolation sur le VPS sans modifier les autres applications.

Ne sont pas vérifiés : règles WAF/limites Cloudflare, configuration Caddy, pare-feu et accès direct à l'origine, versions et mises à jour effectives de Node/Alpine sur le VPS, logs et sauvegardes, secrets présents uniquement en production, historique distant absent de la copie locale, image Docker réellement déployée, accès administrateur et capacité en requêtes par seconde. Aucun seuil de saturation ne peut être chiffré sans environnement de test représentatif et mesures.

## Ordre recommandé

1. Borner le compteur anti-spam, fiabiliser l'IP et ajouter budgets globaux/concurrence SMTP.
2. Plafonner les ressources du conteneur et limiter les rafales au proxy/CDN, particulièrement sur POST et `/_next/image`.
3. Réduire les délais SMTP, exiger TLS et ajuster la limite des corps de requête.
4. Ajouter les en-têtes de sécurité et restreindre l'optimiseur d'images.
5. Restreindre les permissions des secrets et suivre le correctif `braces`.

Audit uniquement : aucun changement au code applicatif ni au déploiement. Les modifications préexistantes de `Projects.tsx` et des contenus FR/EN sont conservées.

## Suivi des corrections — 5 octobre 2026

| # | Constat | Statut |
|---|---|---|
| 1 | Compteur anti-spam non borné | Corrigé : compteur à fenêtre fixe (1 nombre + 1 date par clé), 5 000 clés max, nettoyage des clés expirées (`src/lib/rate-limit.ts`). Test : 10 000 tentatives sur une IP → 5 acceptées, mémoire constante. |
| 2 | Confiance dans les en-têtes IP | Corrigé côté code : en-tête configurable (`CLIENT_IP_HEADER`, `cf-connecting-ip` derrière Cloudflare), format d'IP validé, quota par IP vérifié en premier (invalides compris), budget global de 40 envois/h indépendant de l'IP. Reste à vérifier : accès direct à l'origine sans passer par Cloudflare. |
| 3 | Ressources du conteneur non plafonnées | Corrigé : 512 Mo, 1 CPU, 200 processus, tas Node 384 Mo, rotation des logs, `no-new-privileges`, `cap_drop: ALL` (`compose.yaml`). |
| 4 | Envois SMTP sans limite | Corrigé : transport partagé en pool (2 connexions), 2 envois simultanés max, délais 10 s / 10 s / 20 s, `requireTLS`, 2 confirmations par adresse et par jour, corps des Server Actions limité à 64 Ko. Vérification anti-bot (Turnstile) non ajoutée. |
| 5 | En-têtes de sécurité absents | Corrigé : CSP (frame-ancestors, base-uri, form-action, object-src), X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS (sans sous-domaines), `X-Powered-By` retiré. CSP sur les scripts non activée (scripts inline Next.js). |
| 6 | Optimiseur d'images | Corrigé : `localPatterns` limités à `/images/**` et `/_next/static/media/**` sans paramètres, qualité 75 seule, cache disque 200 Mo. Testé : autres chemins, paramètres et qualités → 400. |
| 7 | `braces` (dépendance de lint) | Non corrigé : pas de version corrigée en amont, aucun chemin depuis le serveur ; ne pas lancer `npm audit fix --force`. |
| 8 | Permissions de `.env.local` | Corrigé en local (`0600`). À faire sur le VPS : `chmod 600 .env`. |
