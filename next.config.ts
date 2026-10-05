import type { NextConfig } from "next";

// En-têtes de sécurité appliqués à toutes les réponses.
// CSP limitée aux directives sans risque pour les scripts inline de Next.js (encadrement, formulaires, plugins).
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  // Serveur autonome minimal pour l'image Docker (voir Dockerfile).
  output: "standalone",
  poweredByHeader: false,
  images: {
    // Seules les images du site (dossier public et imports statiques), sans paramètres d'URL.
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/_next/static/media/**", search: "" },
    ],
    qualities: [75],
    maximumDiskCacheSize: 200_000_000,
  },
  experimental: {
    // Le formulaire de contact n'a besoin que de quelques Ko.
    serverActions: { bodySizeLimit: "64kb" },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
