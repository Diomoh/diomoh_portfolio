export type Preview = "health" | "docs" | "school" | "learn" | "shop" | "web" | "ai" | "mobile";

export type Project = {
  id: string;
  name: string;
  short: string;
  domain: string;
  role: string;
  image?: string;
  isPrivate?: boolean;
  url?: string;
  preview: Preview;
  metric: { value: string; label: string };
  line: string;
  stack: string[];
};

const fr = {
  meta: {
    title: "Mohamed Diomande · Développeur Fullstack & Chef de projet",
    description:
      "Je conçois des applications web et mobiles que les utilisateurs adoptent vraiment. Développeur Fullstack et Chef de projet, Grand-Bassam, Côte d'Ivoire.",
  },
  nav: {
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    services: "Services",
    contact: "Contact",
    cta: "Discutons",
    language: "Langue",
  },
  hero: {
    aboutTab: ["À", "propos"],
    worksTitle: "Projets",
    welcome: {
      title: "Construisons le produit qui accélère votre croissance.",
      highlight: "accélère votre croissance.",
      ctaPrimary: "Démarrer un projet",
      ctaSecondary: "Voir mes réalisations",
      text: "Plateformes métier, applications mobiles et automatisations IA : je pilote votre projet de A à Z, avec un seul interlocuteur.",
    },
    categories: [
      { label: "E-santé", count: 2 },
      { label: "Éducation & e-learning", count: 2 },
      { label: "E-commerce & logistique", count: 1 },
      { label: "Applications mobiles", count: 3 },
      { label: "Sites institutionnels", count: 2 },
      { label: "SaaS", count: 2 },
      { label: "Agents IA", count: 1 },
    ] as { label: string; count: number }[],
    firstName: "Mohamed",
    lastName: "Diomande",
    greeting: "Je suis",
    title: "Software Engineer",
    role: "Développeur Fullstack & Chef de projet",
    more: "Plus de contacts",
  },
  intro: {
    words: ["Discipline.", "Rigueur.", "Précision.", "Fiabilité.", "Engagement."],
    label: "Ma façon de travailler",
    principles: [
      { title: "Solide dès la première ligne", text: "Une architecture pensée pour durer : API structurées, données protégées, mises en production maîtrisées. Votre produit tient quand votre activité grandit.", tag: "Architecture & sécurité" },
      { title: "Web et mobile, pensés pour vos utilisateurs", text: "Interfaces web rapides avec React et Next.js, applications mobiles React Native, utilisables même avec une connexion instable.", tag: "Front-end web & mobile" },
      { title: "Accéléré par l'IA", text: "Des agents IA accélèrent le code, les tests et la revue, sous mon contrôle. Et j'en intègre dans vos produits pour automatiser vos tâches.", tag: "Agents IA" },
      { title: "Piloté de A à Z", text: "Cadrage avec votre métier, démos régulières, mise en production et formation des équipes. Un seul interlocuteur, du début à la fin.", tag: "Gestion de projet" },
    ],
    stats: {
      live: { value: "7", label: "plateformes et sites en production" },
      itil: { value: "ITIL® 4", label: "Certifié Foundation" },
    },
  },
  about: {
    eyebrow: "À propos · Ma méthode",
    steps: [
      { word: "Cadrer", text: "Comprendre le métier avant de coder." },
      { word: "Concevoir", text: "Des interfaces claires, pensées pour l'utilisateur." },
      { word: "Livrer", text: "Vite, grâce aux agents IA. Sous contrôle humain." },
      { word: "Former", text: "Accompagner les équipes jusqu'à l'adoption." },
      { word: "Suivre", text: "Démos régulières, suivi clair, retours terrain." },
    ],
  },
  skills: {
    eyebrow: "Compétences",
    title: "Mes compétences.",
    highlight: "compétences",
    stack: [
      { name: "React", icon: "react", family: "Front-end" },
      { name: "Next.js", icon: "next", family: "Front-end" },
      { name: "Vite", icon: "vite", family: "Front-end" },
      { name: "Python", icon: "python", family: "Back-end" },
      { name: "Django", icon: "django", family: "Back-end" },
      { name: "Node.js", icon: "node", family: "Back-end" },
      // { name: "React Native", icon: "react", family: "Mobile" },
      { name: "WatermelonDB", icon: "watermelon", family: "Mobile" },
      { name: "PostgreSQL", icon: "postgres", family: "Données" },
      { name: "MySQL", icon: "mysql", family: "Données" },
      { name: "SQL Server", icon: "sqlserver", family: "Données" },
      { name: "Docker", icon: "docker", family: "Infra" },
      { name: "MinIO", icon: "minio", family: "Infra" },
      { name: "Git", icon: "git", family: "Outils" },
      { name: "Claude Code", icon: "claude", family: "Agents IA" },
      { name: "Codex", icon: "codex", family: "Agents IA" },
      { name: "Kilo Code", icon: "kilo", family: "Agents IA" },
    ],
  },
  projects: {
    eyebrow: "Projets sélectionnés",
    title: ["Des idées devenues", "produits", "qui tournent."],
    text: "De la santé au e-commerce, des plateformes conçues, développées et mises en production pour de vrais utilisateurs.",
    cta: "Démarrer un projet",
    privateLabel: "Privé · démo sur demande",
    visit: "Voir le site",
    next: "Projet suivant",
    items: [
      { id: "learn", name: "Learn Cybersécurité en Afrique", short: "Learn", domain: "E-learning", role: "Développeur fullstack", url: "https://learn.cybersecuriteenafrique.com", image: "/images/project-learn.webp", preview: "learn", metric: { value: "En ligne", label: "en production" }, line: "Formations certifiantes et examens blancs en conditions réelles.", stack: [] },
      { id: "gesci", name: "Agence GESCI", short: "GESCI", domain: "Site institutionnel", role: "Conception · Développement · Mise en ligne", url: "https://gesci.ci", image: "/images/project-gesci.webp", preview: "web", metric: { value: "2025", label: "en ligne depuis" }, line: "Architecture, interfaces et mise en production du site de l'agence.", stack: [] },
      { id: "commission", name: "Commission de la Concurrence", short: "Commission", domain: "Site institutionnel", role: "Conception · Développement · Mise en ligne", url: "https://commissiondelaconcurrence.gouv.ci", image: "/images/project-commission.webp", preview: "web", metric: { value: "2023", label: "en ligne depuis" }, line: "Le site officiel du régulateur ivoirien de la concurrence.", stack: [] },
      { id: "tuyo", name: "Tuyo AI", short: "Tuyo AI", domain: "Agent IA", role: "Projet personnel", image: "/images/project-tuyo.webp", preview: "ai", metric: { value: "IA", label: "analyse chaque soir" }, line: "Un agent IA analyse les matchs et propose les meilleurs combinés.", stack: [] },
    ] as Project[],
  },
  services: {
    eyebrow: "Services",
    title: "Ce que je construis pour vous.",
    highlight: "construis",
    items: [
      { title: "Applications web & mobile", icon: "layout" },
      { title: "SaaS", icon: "cloud" },
      { title: "Design UI/UX", icon: "pen" },
      { title: "Agents IA", icon: "bot" },
      { title: "Pilotage de projet", icon: "route" },
    ],
    stat: { value: "7+", label: "plateformes en production" },
  },
  education: {
    eyebrow: "Formation & certification",
    title: "Des bases solides, une exigence continue.",
    cert: { name: "ITIL® 4 Foundation", issuer: "PeopleCert", date: "Juillet 2026" },
    items: [
      // À rajouter plus tard :
      // { degree: "Doctorat", school: "INPHB, Institut National Polytechnique Félix Houphouët-Boigny", period: "2026 → 2030", detail: "Intelligence artificielle frugale appliquée au diagnostic médical" },
      { degree: "Master Systèmes Informatiques et Génie Logiciel", school: "ESATIC", period: "2021 → 2023", detail: "" },
      { degree: "Licence Technologie du Web et Image Numérique", school: "ESATIC", period: "2018 → 2021", detail: "" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Vous avez un projet d'application web ou mobile ? Parlons-en.",
    highlight: "Parlons-en.",
    text: "Décrivez-moi ce que vous voulez construire, pour qui et dans quel délai. Je reviens vers vous avec un plan clair, pour un produit soigné livré rapidement.",
    email: "dioomande.mohamed@gmail.com",
    phone: "+225 07 48 15 46 94",
    whatsapp: "2250748154694",
    linkedin: "https://www.linkedin.com/in/mohamed-diomande-4190111a4/",
    location: "Grand-Bassam, Côte d'Ivoire · disponible à distance",
    form: {
      name: "Votre nom",
      email: "Votre e-mail",
      project: "Votre projet : quoi, pour qui, quel délai ?",
      send: "Envoyer le message",
      subject: "Projet via le portfolio",
      sending: "Envoi en cours…",
      success: "Merci ! Votre message est bien parti, je vous réponds très vite.",
      error: "L'envoi a échoué. Réessayez ou écrivez-moi directement :",
      invalid: "Vérifiez votre nom, votre e-mail et votre message.",
    },
    labels: { email: "E-mail", phone: "Téléphone / WhatsApp", location: "Localisation" },
    // E-mail de confirmation envoyé au visiteur ({name} = son nom).
    confirmation: {
      subject: "J'ai bien reçu votre message",
      title: "Merci, votre projet est entre de bonnes mains.",
      greeting: "Bonjour {name},",
      body: "Votre message est bien arrivé. Je l'étudie et je reviens vers vous très vite, en général sous 24 à 48 h, avec une première réponse sur votre projet.",
      cta: "Voir mes réalisations",
      footer: "diomoh · Applications web, mobiles et agents IA",
      signature: "Développeur Fullstack & Chef de projet",
      note: "Cet e-mail est envoyé automatiquement suite à votre message sur diomoh.com.",
    },
  },
  guide: {
    hero: "Commencez ici",
    principles: "Ma façon de travailler",
    method: "Ma méthode",
    skills: "Mes outils",
    projects: "Mes réalisations",
    services: "Ce que je fais",
    education: "Mon parcours",
    contact: "Écrivez-moi",
  } as Record<string, string>,
  footer: { rights: "Tous droits réservés.", top: "Haut de page" },
};

export type Content = typeof fr;
export default fr;
