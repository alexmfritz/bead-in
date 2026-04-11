import type { Artist, ItemStatus } from "@/types";
import type { Filters, UseFiltersResult } from "@/hooks/useFilters";

interface FilterPanelProps {
  artists: Artist[];
  /** Sorted, de-duplicated list of every material across all items. */
  materialOptions: string[];
  /** Sorted, de-duplicated list of every tag across all items. */
  tagOptions: string[];
  /** Current filter state + setters, straight from useFilters(). */
  filters: Filters;
  setFilter: UseFiltersResult["setFilter"];
  clearFilters: UseFiltersResult["clearFilters"];
  /** How many items remain after filtering — shown in the header. */
  filteredCount: number;
  /** How many items exist in total (before filtering). */
  totalCount: number;
}

const STATUS_OPTIONS: { value: ItemStatus; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
];

/**
 * Reusable filter panel. Used by Shop as a left sidebar on desktop; the
 * same markup collapses into a stacked panel at the top of the grid on
 * mobile. No internal state — all filter values come from the parent's
 * `useFilters()` hook so the panel is fully controlled.
 */
export default function FilterPanel({
  artists,
  materialOptions,
  tagOptions,
  filters,
  setFilter,
  clearFilters,
  filteredCount,
  totalCount,
}: FilterPanelProps) {
  const hasAnyFilter =
    filters.artistId !== undefined ||
    filters.status !== undefined ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    (filters.materials && filters.materials.length > 0) ||
    (filters.tags && filters.tags.length > 0);

  const toggleArrayValue = (
    key: "materials" | "tags",
    value: string,
  ) => {
    const current = filters[key] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilter(key, next);
  };

  return (
    <aside
      className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-5"
      aria-label="Item filters"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-lg font-semibold text-text">
          Filters
        </h2>
        <span className="text-xs text-text-muted">
          Showing <strong className="text-text">{filteredCount}</strong> of{" "}
          {totalCount}
        </span>
      </div>

      {/* Artist filter */}
      <FilterGroup label="Artist">
        <RadioOption
          name="artist"
          checked={filters.artistId === undefined}
          onChange={() => setFilter("artistId", undefined)}
          label="All artists"
        />
        {artists.map((artist) => (
          <RadioOption
            key={artist.id}
            name="artist"
            checked={filters.artistId === artist.id}
            onChange={() => setFilter("artistId", artist.id)}
            label={artist.name}
          />
        ))}
      </FilterGroup>

      {/* Status filter */}
      <FilterGroup label="Status">
        <RadioOption
          name="status"
          checked={filters.status === undefined}
          onChange={() => setFilter("status", undefined)}
          label="Any status"
        />
        {STATUS_OPTIONS.map((opt) => (
          <RadioOption
            key={opt.value}
            name="status"
            checked={filters.status === opt.value}
            onChange={() => setFilter("status", opt.value)}
            label={opt.label}
          />
        ))}
      </FilterGroup>

      {/* Price range */}
      <FilterGroup label="Price range">
        <div className="flex items-center gap-2">
          <label className="flex-1">
            <span className="mb-1 block text-xs text-text-muted">Min</span>
            <input
              type="number"
              min={0}
              inputMode="decimal"
              placeholder="$0"
              value={filters.minPrice ?? ""}
              onChange={(e) => {
                const val = e.target.value.trim();
                setFilter(
                  "minPrice",
                  val === "" ? undefined : Number(val),
                );
              }}
              className="w-full rounded-md border border-border bg-bg px-2 py-1.5 text-sm text-text focus:outline-2 focus:outline-offset-2 focus:outline-focus"
            />
          </label>
          <label className="flex-1">
            <span className="mb-1 block text-xs text-text-muted">Max</span>
            <input
              type="number"
              min={0}
              inputMode="decimal"
              placeholder="No limit"
              value={filters.maxPrice ?? ""}
              onChange={(e) => {
                const val = e.target.value.trim();
                setFilter(
                  "maxPrice",
                  val === "" ? undefined : Number(val),
                );
              }}
              className="w-full rounded-md border border-border bg-bg px-2 py-1.5 text-sm text-text focus:outline-2 focus:outline-offset-2 focus:outline-focus"
            />
          </label>
        </div>
      </FilterGroup>

      {/* Materials filter (multi-select) */}
      {materialOptions.length > 0 && (
        <FilterGroup label="Materials">
          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto pr-1">
            {materialOptions.map((mat) => (
              <CheckboxOption
                key={mat}
                checked={(filters.materials ?? []).includes(mat)}
                onChange={() => toggleArrayValue("materials", mat)}
                label={mat}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Tags filter (multi-select) */}
      {tagOptions.length > 0 && (
        <FilterGroup label="Tags">
          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto pr-1">
            {tagOptions.map((tag) => (
              <CheckboxOption
                key={tag}
                checked={(filters.tags ?? []).includes(tag)}
                onChange={() => toggleArrayValue("tags", tag)}
                label={tag}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {hasAnyFilter && (
        <button
          type="button"
          onClick={clearFilters}
          className="self-start rounded-md border border-border bg-bg px-3 py-2 text-xs font-medium text-text transition-colors hover:border-accent-1"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-2 border-0 p-0">
      <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </legend>
      {children}
    </fieldset>
  );
}

function RadioOption({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 cursor-pointer accent-accent-1"
      />
      {label}
    </label>
  );
}

function CheckboxOption({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 cursor-pointer accent-accent-1"
      />
      {label}
    </label>
  );
}
