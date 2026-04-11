import { useMemo, useState } from "react";
import { getActiveArtists, items as allItems } from "@/data";
import { useFilters } from "@/hooks/useFilters";
import ItemCard from "@/components/ItemCard";
import FilterPanel from "@/components/FilterPanel";

/**
 * Shop page — full item catalog with sidebar filters.
 *
 * Filters live in a `FilterPanel` sidebar on the left (desktop) or a
 * collapsible panel above the grid (mobile, toggled via a "Show filters"
 * button). Filter state is owned by `useFilters(allItems)` so the grid
 * always reflects the current selection.
 *
 * Results are sorted newest-first by `createdAt`. No sort dropdown yet —
 * when Alex wants other sort orders, add a sort control next to the
 * result count and sort `filteredItems` accordingly.
 */
export default function Shop() {
  const artists = getActiveArtists();

  const { filteredItems, filters, setFilter, clearFilters, totalCount } =
    useFilters(allItems);

  // Mobile drawer state — desktop ignores this via the lg:block override.
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  // Sort the filtered results newest-first. Stable with respect to filter
  // state — re-runs only when `filteredItems` changes.
  const sortedItems = useMemo(
    () =>
      filteredItems
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [filteredItems],
  );

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="mb-8">
          <h1 className="font-heading text-4xl font-semibold text-text md:text-5xl">
            Shop
          </h1>
          <p className="mt-2 text-base text-text-muted">
            [Browse every piece — filter by artist, status, price, materials,
            or tags. Inquiries go through the Contact page.]
          </p>
        </header>

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
