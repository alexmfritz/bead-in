import { useCallback, useMemo, useState } from "react";
import type { Item, ItemStatus } from "@/types";

/**
 * Filter state for the Shop page. Locked in Phase E so downstream pages
 * cannot invent their own filter shape — concrete filtering logic lands
 * in the Shop implementation phase.
 */
export interface Filters {
  artistId?: string;
  status?: ItemStatus;
  minPrice?: number;
  maxPrice?: number;
  /** Materials keywords (AND). Case-sensitive for now. */
  materials?: string[];
  /** Tag keywords (OR). Case-sensitive for now. */
  tags?: string[];
}

export interface UseFiltersResult {
  /** Items after applying the current filter state. Passthrough in the stub. */
  filteredItems: Item[];
  /** Current filter state. */
  filters: Filters;
  /** Update a single filter field. Passing `undefined` clears that field. */
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  /** Reset all filters to empty. */
  clearFilters: () => void;
}

/**
 * Stub hook that locks the filter API for the Shop page.
 *
 * The body returns `items` unchanged and exposes the setters as no-ops
 * with correct signatures. Real filtering (price range, materials, tags,
 * artist, status) lands when the Shop page is implemented, at which point
 * this hook's body is filled in without any consumer having to change.
 */
export function useFilters(items: Item[]): UseFiltersResult {
  const [filters, setFilters] = useState<Filters>({});

  const setFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Stub: no filtering applied yet. Once Shop is real, replace this with
  // the actual reduce-over-filters logic.
  const filteredItems = useMemo(() => items, [items]);

  return { filteredItems, filters, setFilter, clearFilters };
}
