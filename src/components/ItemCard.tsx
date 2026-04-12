import { Link } from "react-router-dom";
import type { Item, ItemStatus } from "@/types";
import { getArtistById } from "@/data";
import { applyDiscount, formatPrice, resolveAsset } from "@/lib/format";

interface ItemCardProps {
  item: Item;
  /**
   * Show the item's price (and any discount) next to the title.
   * Defaults to `false` so Home can use `<ItemCard item={…} />` as a pure
   * showcase without pricing. Shop passes `true` to surface prices.
   */
  showPrice?: boolean;
}

const STATUS_LABELS: Record<ItemStatus, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

/**
 * Map each status to an accent variable. The dot inside the status chip
 * is the only place color carries meaning — chip text is always
 * `--color-text` on `--color-surface` so it stays readable in every
 * palette/theme/contrast variant without per-variant tuning.
 */
const STATUS_DOT_VAR: Record<ItemStatus, string> = {
  available: "var(--accent-5)",
  sold: "var(--text-muted)",
  reserved: "var(--accent-4)",
};

/**
 * Reusable item showcase card.
 *
 * Wraps the entire card in a `<Link>` so clicking anywhere navigates to
 * the item detail page. React Router's Link renders an anchor, which is
 * valid HTML5 around block content and gives screen readers a single
 * accessible name.
 */
export default function ItemCard({ item, showPrice = false }: ItemCardProps) {
  // FK validation at data/index.ts module load guarantees this lookup resolves.
  const artist = getArtistById(item.artistId);
  const imageSrc = resolveAsset(item.images[0] ?? "placeholder.svg", "items");

  return (
    <Link
      to={`/items/${item.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg no-underline transition-colors hover:border-accent-1"
    >
      <div className="aspect-square w-full overflow-hidden bg-surface">
        <img
          src={imageSrc}
          alt={`Placeholder — replace with photo of ${item.name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold leading-tight text-text">
            {item.name}
          </h3>
          {showPrice && <PriceDisplay cost={item.cost} />}
        </div>
        {artist && (
          <p className="text-sm text-text-muted">by {artist.name}</p>
        )}
        <div className="mt-auto pt-2">
          <StatusChip status={item.status} />
        </div>
      </div>
    </Link>
  );
}

function StatusChip({ status }: { status: ItemStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: STATUS_DOT_VAR[status] }}
        aria-hidden="true"
      />
      {STATUS_LABELS[status]}
    </span>
  );
}

function PriceDisplay({ cost }: { cost: Item["cost"] }) {
  const { final, savings } = applyDiscount(cost);
  if (savings > 0) {
    return (
      <div className="text-right">
        <span className="block text-sm text-text-muted line-through">
          {formatPrice(cost.price)}
        </span>
        <span className="block text-base font-semibold text-text">
          {formatPrice(final)}
        </span>
      </div>
    );
  }
  return (
    <span className="text-base font-semibold text-text">
      {formatPrice(final)}
    </span>
  );
}
