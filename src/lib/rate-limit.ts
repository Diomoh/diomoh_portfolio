import "server-only";
import { isIP } from "node:net";

// Compteurs à fenêtre fixe, en mémoire et de taille bornée (un nombre + une date par clé).
// Mémoire constante par clé, nombre de clés plafonné, nettoyage des clés expirées.
type Entry = { count: number; reset: number };

export function createLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const entries = new Map<string, Entry>();

  const sweep = (now: number) => {
    for (const [key, e] of entries) if (e.reset <= now) entries.delete(key);
  };

  // Renvoie true si la clé dépasse sa limite. Chaque appel compte, y compris les refus.
  return function hit(key: string): boolean {
    const now = Date.now();
    let e = entries.get(key);
    if (!e || e.reset <= now) {
      if (!e && entries.size >= maxKeys) {
        sweep(now);
        // Table pleine de clés actives : on refuse plutôt que de grossir (protège la mémoire).
        if (entries.size >= maxKeys) return true;
      }
      e = { count: 0, reset: now + windowMs };
      entries.set(key, e);
    }
    e.count = Math.min(e.count + 1, limit + 1);
    return e.count > limit;
  };
}

// Limite le nombre de tâches simultanées ; renvoie null si toutes les places sont prises.
export function createSemaphore(max: number) {
  let running = 0;
  return async function run<T>(task: () => Promise<T>): Promise<T | null> {
    if (running >= max) return null;
    running++;
    try {
      return await task();
    } finally {
      running--;
    }
  };
}

// IP du visiteur. L'en-tête de confiance se règle avec CLIENT_IP_HEADER :
// « cf-connecting-ip » derrière Cloudflare, sinon x-forwarded-for (dernière valeur, ajoutée par le proxy le plus proche).
export function clientIp(h: Headers): string {
  const header = (process.env.CLIENT_IP_HEADER ?? "x-forwarded-for").toLowerCase();
  const raw = h.get(header) ?? "";
  const ip = raw.split(",").map((s) => s.trim()).filter(Boolean).pop() ?? "";
  return isIP(ip) ? ip : "unknown";
}
