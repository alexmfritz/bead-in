/**
 * Typed data layer for Bead-In.
 *
 * This module is the ONLY place JSON files are imported. Everything else in
 * the app reads data through the typed exports and selectors below.
 *
 * TypeScript widens JSON string fields to `string`, so the compile-time
 * `satisfies` check cannot validate string-union fields like `Item.status`.
 * Instead, we validate shape AND referential integrity at module load with
 * a runtime check. A typo in the JSON crashes `npm run dev` immediately
 * with a clear message — the same practical outcome as compile-time error.
 */
import type { Artist, Item, ItemStatus } from "@/types";
import artistsJson from "./artists.json";
import itemsJson from "./items.json";

export const artists: Artist[] = artistsJson as Artist[];
export const items: Item[] = itemsJson as Item[];

// --- Runtime shape + referential integrity check (runs at module load) ---
{
  const VALID_STATUSES: readonly ItemStatus[] = [
    "available",
    "sold",
    "reserved",
  ];
  const artistIds = new Set(artists.map((a) => a.id));

  for (const item of items) {
    if (!VALID_STATUSES.includes(item.status)) {
      throw new Error(
        `[bead-in data] item "${item.id}" has invalid status "${item.status}". ` +
          `Valid statuses: ${VALID_STATUSES.join(", ")}.`,
      );
    }
    if (!artistIds.has(item.artistId)) {
      throw new Error(
        `[bead-in data] item "${item.id}" references unknown artistId "${item.artistId}". ` +
          `Valid artist ids: ${[...artistIds].join(", ")}.`,
      );
    }
  }
}

// --- Pure selectors -------------------------------------------------------

/** Artists marked `active: true`, in source order. */
export const getActiveArtists = (): Artist[] => artists.filter((a) => a.active);

/** Look up a single artist by id. Returns `undefined` when not found. */
export const getArtistById = (id: string): Artist | undefined =>
  artists.find((a) => a.id === id);

/** All items attributed to a given artist id, in source order. */
export const getItemsByArtist = (artistId: string): Item[] =>
  items.filter((i) => i.artistId === artistId);

/**
 * Items available for purchase on the Shop page, sorted newest-first by
 * `createdAt`. Only items with `status === "available"` are included —
 * sold and reserved items appear on Gallery/Artist pages but not in Shop.
 */
export const getShopItems = (): Item[] =>
  items
    .filter((i) => i.status === "available")
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

/** Pair an item with its artist. Returns `undefined` if either is missing. */
export const getItemWithArtist = (
  id: string,
): { item: Item; artist: Artist } | undefined => {
  const item = items.find((i) => i.id === id);
  if (!item) return undefined;
  const artist = getArtistById(item.artistId);
  if (!artist) return undefined;
  return { item, artist };
};
