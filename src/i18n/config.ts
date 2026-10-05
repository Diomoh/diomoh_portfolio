export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Pays où le français est langue officielle ou d'usage courant (codes ISO 3166-1 alpha-2).
export const francophoneCountries = new Set([
  "FR", "BE", "CH", "LU", "MC", "CA",
  "CI", "SN", "ML", "BF", "NE", "GN", "BJ", "TG", "CM", "GA", "CG", "CD",
  "CF", "TD", "MG", "DJ", "KM", "BI", "RW", "SC", "MR", "MA", "DZ", "TN",
  "HT", "RE", "GP", "MQ", "GF", "YT", "PF", "NC", "PM", "WF", "BL", "MF", "VU", "LB",
]);

// En-têtes posés par les hébergeurs / CDN avec le pays du visiteur.
// Sur un VPS avec Nginx, ajouter : proxy_set_header X-Country-Code $geoip2_data_country_code;
export const countryHeaders = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-country-code",
];
