import { en } from "./en";
import { pt } from "./pt";
import type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
