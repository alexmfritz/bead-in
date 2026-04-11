import { useCallback, useMemo, useState } from "react";
import { applyDiscount } from "@/lib/format";
import type { Item, ItemStatus } from "@/types";

/**
 * Filter state for the Shop page. The shape is locked — every consumer
 * (Shop, Gallery, future filter pages) hits the same API.
 *
 * Semantics:
 * - `artistId`: single-select. `undefined` means "all artists".
 * - `status`: single-select. `undefined` means "any status".
 * - `minPrice` / `maxPrice`: inclusive bounds applied to the *final*
 *   price after any discount. `undefined` on either side means no bound.
 * - `materials`: array of materials. OR semantics — an item matches if
 *   ANY of its materials appear in the filter list. Empty/undefined =
 *   no materials filter.
 * - `tags`: array of tags. OR semantics — same as materials.
 */
export interface Filters {
  artistId?: string;
  status?: ItemStatus;
  minPrice?: number;
  maxPrice?: number;
  materials?: string[];
  tags?: string[];
}

export interface UseFiltersResult {
  /** Items after the current filter state is applied. */
  filteredItems: Item[];
  /** Current filter state. */
  filters: Filters;
  /**
   * Update a single filter field. Passing `undefined` (or an empty
   * array for `materials`/`tags`) clears that specific field.
   */
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  /** Reset every filter to its empty state. */
  clearFilters: () => void;
  /** Count of items before filtering — useful for "Showing X of Y". */
  totalCount: number;
}

/**
 * Check if an array filter should be considered "active". An empty array
 * is treated the same as `undefined` — no constraint.
 */
const hasArrayFilter = (arr: string[] | undefined): arr is string[] =>
  Array.isArray(arr) && arr.length > 0;

/**
 * Apply the current filter state to an items array. Pure function —
 * extracted so the memoized `filteredItems` below re-runs only when
 * inputs change.
 */
const applyFilters = (items: Item[], filters: Filters): Item[] => {
  return items.filter((item) => {
    if (filters.artistId && item.artistId !== filters.artistId) {
      return false;
    }
    if (filters.status && item.status !== filters.status) {
      return false;
    }

    const { final } = applyDiscount(item.cost);
    if (filters.minPrice !== undefined && final < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && final > filters.maxPrice) {
      return false;
    }

    if (hasArrayFilter(filters.materials)) {
      const selected = filters.materials;
      const hasMatch = item.materials.some((m) => selected.includes(m));
      if (!hasMatch) return false;
    }

    if (hasArrayFilter(filters.tags)) {
      const selected = filters.tags;
      const hasMatch = item.tags.some((t) => selected.includes(t));
      if (!hasMatch) return false;
    }

    return true;
  });
};

/**
 * Stateful filter hook. Takes the full items array, returns the filtered
 * subset plus a filter state + setters bound to that array.
 */
export function useFilters(items: Item[]): UseFiltersResult {
  const [filters, setFilters] = useState<Filters>({});

  const setFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => {
        const next = { ...prev };
        // Treat empty/undefined values as "clear this field" so state
        // stays minimal and `clearFilters` is equivalent to setting
        // every field to undefined one at a time.
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        if (value === undefined || isEmptyArray) {
          delete next[key];
        } else {
          next[key] = value;
        }
        return next;
      });
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const filteredItems = useMemo(
    () => applyFilters(items, filters),
    [items, filters],
  );

  return {
    filteredItems,
    filters,
    setFilter,
    clearFilters,
    totalCount: items.length,
  };
}
