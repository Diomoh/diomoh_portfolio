import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serveur autonome minimal pour l'image Docker (voir Dockerfile).
  output: "standalone",
};

export default nextConfig;
