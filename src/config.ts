/**
 * Typed re-export of `src/data/config.json`. Centralizes the runtime config
 * access point so consumers can `import { siteMode } from "@/config"` without
 * touching raw JSON.
 *
 * Runtime validation narrows the JSON string to the `Config["siteMode"]`
 * union so consumers get proper literal-type comparisons.
 */
import type { Config } from "@/types";
import configJson from "@/data/config.json";

const isValidMode = (m: string): m is Config["siteMode"] =>
  m === "preview" || m === "live";

const rawMode = configJson.siteMode;
if (!isValidMode(rawMode)) {
  throw new Error(
    `[bead-in config] invalid siteMode "${rawMode}". Valid: "preview" | "live".`,
  );
}

export const siteMode: Config["siteMode"] = rawMode;
