/**
 * Typed re-export of `src/data/config.json`. Currently carries no active
 * fields — this module exists so future additions have an obvious home
 * and so `config.json` is validated against the `Config` type at every
 * build. To add a field, update `Config` in `@/types`, the JSON, and
 * destructure the new value below.
 */
import type { Config } from "@/types";
import configJson from "@/data/config.json";

export const config = configJson satisfies Config;

export type { Config };
