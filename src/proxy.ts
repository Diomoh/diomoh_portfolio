import { NextResponse, type NextRequest } from "next/server";
import {
  countryHeaders,
  defaultLocale,
  francophoneCountries,
  hasLocale,
  LOCALE_COOKIE,
  locales,
  type Locale,
} from "@/i18n/config";

function localeFromCountry(request: NextRequest): Locale | null {
  for (const header of countryHeaders) {
    const country = request.headers.get(header)?.toUpperCase();
    if (country && /^[A-Z]{2}$/.test(country) && country !== "XX") {
      return francophoneCountries.has(country) ? "fr" : "en";
    }
  }
  return null;
}

function localeFromBrowser(request: NextRequest): Locale | null {
  const header = request.headers.get("accept-language");
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => hasLocale(r.lang))?.lang as Locale | undefined ?? null;
}

// Ordre de priorité : choix explicite du visiteur (cookie) > pays > langue du navigateur > français.
function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && hasLocale(cookie)) return cookie;
  return localeFromCountry(request) ?? localeFromBrowser(request) ?? defaultLocale;
}

// Le site n'a qu'une page par langue : toute autre adresse renvoie vers l'accueil
// (/fr/xyz → /fr, /xyz → /fr ou /en selon le visiteur). Redirection temporaire (307)
// pour pouvoir ajouter de vraies pages plus tard.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = locales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (prefix && (pathname === `/${prefix}` || pathname === `/${prefix}/`)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${prefix ?? resolveLocale(request)}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
