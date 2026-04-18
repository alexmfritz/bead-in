import { useMemo, useState } from "react";
import { getActiveArtists, items as allItems } from "@/data";
import { useFilters } from "@/hooks/useFilters";
import { applyDiscount } from "@/lib/format";
import type { Item } from "@/types";
import SectionHeader from "@/components/SectionHeader";
import ItemCard from "@/components/ItemCard";
import FilterPanel from "@/components/FilterPanel";

type SortValue =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc";

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

/**
 * Pure sort — returns a new array so the source stays untouched. Price
 * sort uses the discounted final price, matching what users see on cards.
 */
function sortItems(items: Item[], sort: SortValue): Item[] {
  const out = items.slice();
  switch (sort) {
    case "newest":
      return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "oldest":
      return out.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    case "price-low":
      return out.sort(
        (a, b) => applyDiscount(a.cost).final - applyDiscount(b.cost).final,
      );
    case "price-high":
      return out.sort(
        (a, b) => applyDiscount(b.cost).final - applyDiscount(a.cost).final,
      );
    case "name-asc":
      return out.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return out.sort((a, b) => b.name.localeCompare(a.name));
  }
}

/**
 * Shop page — full item catalog with sidebar filters and sort dropdown.
 *
 * Filters live in a `FilterPanel` sidebar on the left (desktop) or a
 * collapsible panel above the grid (mobile, toggled via a "Show filters"
 * button). Sort is a separate dropdown positioned at the top-right of
 * the grid, independent from the filter UI. Filter state is owned by
 * `useFilters(allItems)` and sort state is local. Results are filtered
 * first, then sorted, so the grid always reflects both selections.
 */
export default function Shop() {
  const artists = getActiveArtists();

  const { filteredItems, filters, setFilter, clearFilters, totalCount } =
    useFilters(allItems);

  // Mobile drawer state — desktop ignores this via the lg:block override.
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sort state — independent from filters. Default is newest-first.
  const [sort, setSort] = useState<SortValue>("newest");

  // Aggregate unique materials and tags across the full catalog so
  // filter options stay in sync with the data layer without any
  // hand-maintained list. Memoized because the source is module-level
  // and therefore stable.
  const materialOptions = useMemo(() => {
    const set = new Set<string>();
    for (const item of allItems) {
      for (const m of item.materials) set.add(m);
    }
    return [...set].sort();
  }, []);
  const tagOptions = useMemo(() => {
    const set = new Set<string>();
    for (const item of allItems) {
      for (const t of item.tags) set.add(t);
    }
    return [...set].sort();
  }, []);

  // Apply sort after filtering. Re-runs when either filters or sort change.
  const sortedItems = useMemo(
    () => sortItems(filteredItems, sort),
    [filteredItems, sort],
  );

  return (
    <section className="bg-bg" aria-label="Shop">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8">
          <SectionHeader
            as="h1"
            headline="Shop"
            subheadline="[Browse every piece — filter by artist, status, price, materials, or tags. Inquiries go through the Contact page.]"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:items-start lg:gap-10">
          {/* Sidebar (desktop) / collapsible panel (mobile) */}
          <div className="lg:sticky lg:top-6">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="shop-filters"
              className="mb-4 inline-flex w-full items-center justify-between rounded-md border border-border bg-surface px-4 py-3 text-sm font-semibold text-text transition-colors hover:border-accent-1 lg:hidden"
            >
              <span>
                {filtersOpen ? "Hide" : "Show"} filters
                {sortedItems.length < totalCount &&
                  ` (${sortedItems.length}/${totalCount})`}
              </span>
              <span aria-hidden="true">{filtersOpen ? "▲" : "▼"}</span>
            </button>

            <div
              id="shop-filters"
              className={`${filtersOpen ? "block" : "hidden"} lg:block`}
            >
              <FilterPanel
                artists={artists}
                materialOptions={materialOptions}
                tagOptions={tagOptions}
                filters={filters}
                setFilter={setFilter}
                clearFilters={clearFilters}
                filteredCount={sortedItems.length}
                totalCount={totalCount}
              />
            </div>
          </div>

          {/* Item grid */}
          <div>
            {/* Sort bar — count on the left, sort dropdown on the right */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm text-text-muted">
                {sortedItems.length === totalCount
                  ? `Showing all ${totalCount} pieces`
                  : `Showing ${sortedItems.length} of ${totalCount} pieces`}
              </p>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="shop-sort"
                  className="hidden text-sm font-medium text-text-muted sm:inline"
                >
                  Sort by:
                </label>
                <select
                  id="shop-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortValue)}
                  aria-label="Sort items"
                  className="rounded-md border border-border bg-bg px-3 py-2 text-sm text-text focus:border-accent-1 focus:outline-none focus:ring-1 focus:ring-accent-1"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {sortedItems.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sortedItems.map((item) => (
                  <ItemCard key={item.id} item={item} showPrice />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-surface p-12 text-center">
      <h2 className="font-heading text-xl font-semibold text-text">
        No items match your filters
      </h2>
      <p className="max-w-sm text-sm text-text-muted">
        Try widening your price range, clearing a material or tag selection,
        or switching the status filter.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--accent-1)",
          color: "var(--bg)",
        }}
      >
        Clear all filters
      </button>
    </div>
  );
}
