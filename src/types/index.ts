/**
 * Shared type definitions for Bead-In.
 *
 * Single source of truth for the data model. `src/data/index.ts` imports
 * JSON files and validates them against these types at compile time via the
 * `satisfies` pattern.
 */

export type ItemStatus = "available" | "sold" | "reserved";

export interface ItemCost {
  /** Base listing price in whole dollars (not cents). */
  price: number;
  /** Optional decimal discount applied to `price`, e.g. `0.15` = 15% off. */
  discount?: number;
}

export interface Item {
  /** Stable slug-style identifier. Used in URLs and referenced by FKs. */
  id: string;
  /** FK to {@link Artist.id}. Validated at data/index.ts module load. */
  artistId: string;
  name: string;
  description: string;
  status: ItemStatus;
  cost: ItemCost;
  /** Beadwork materials used, e.g. `["size 11 delicas", "waxed thread"]`. */
  materials: string[];
  /** Free-form tags for filtering, e.g. `["medallion", "western"]`. */
  tags: string[];
  /**
   * Relative image filenames (not resolved paths). The caller wires these
   * through `resolveAsset(path, "items")` to produce a full URL.
   * First image is treated as the hero/thumbnail.
   */
  images: string[];
  /** ISO 8601 date, e.g. `"2026-03-18"`. Used for Shop sorting. */
  createdAt: string;
  /** Optional human-readable dimensions, e.g. `'3" × 4"'`. */
  dimensions?: string;
  /** Optional technique name, e.g. `"peyote stitch"`. */
  technique?: string;
}

export interface Artist {
  /** Stable slug-style identifier. Used in URLs and as `Item.artistId`. */
  id: string;
  name: string;
  bio: string;
  /** Relative photo filename; resolved via `resolveAsset(path, "artists")`. */
  photo: string;
  active: boolean;
  /** Art mediums the artist works in, e.g. `["beadwork", "painting"]`. */
  specialties: string[];
}

/**
 * Runtime configuration shape.
 *
 * Currently empty — `config.json` ships as `{}` and `src/config.ts` is a
 * landing zone for future fields (feature flags, contact overrides,
 * featured counts, etc.). To add a field:
 *
 *   1. Add the property here in `Config`.
 *   2. Add the value to `src/data/config.json`.
 *   3. Add a type guard + export in `src/config.ts`.
 */
export type Config = Record<string, never>;
