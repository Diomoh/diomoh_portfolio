import "server-only";
import type { Locale } from "@/i18n/config";
import fr from "./fr";
import en from "./en";

const content = { fr, en };

export const getContent = (locale: Locale) => content[locale];
