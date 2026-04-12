import { Link, useParams } from "react-router-dom";
import { getItemWithArtist } from "@/data";
import type { ItemStatus } from "@/types";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import {
  applyDiscount,
  formatDate,
  formatPrice,
  resolveAsset,
} from "@/lib/format";

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const result = id ? getItemWithArtist(id) : undefined;

  if (!result) {
    return (
      <Section>
        <div className="space-y-6">
          <SectionHeader
            as="h1"
            headline="Item not found"
            subheadline={`No item with id "${id ?? "(missing)"}". The link may be stale or mistyped.`}
          />
          <Link to="/shop" className="font-medium">
            ← Back to shop
          </Link>
        </div>
      </Section>
    );
  }

  const { item, artist } = result;
  const imageSrc = resolveAsset(item.images[0] ?? "placeholder.svg", "items");
  const { final, savings } = applyDiscount(item.cost);

  return (
    <>
      {/* Hero: image + core info */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="aspect-square overflow-hidden rounded-lg bg-surface">
            <img
              src={imageSrc}
              alt={`Placeholder — replace with photo of ${item.name}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <SectionHeader as="h1" headline={item.name} />

            <div className="flex flex-wrap items-center gap-3">
              <StatusChip status={item.status} />
              <PriceBlock price={item.cost.price} final={final} savings={savings} />
            </div>

            <p className="text-text-muted">
              by{" "}
              <Link
                to={`/artists/${artist.id}`}
                className="font-medium text-accent-1 underline-offset-2 hover:underline"
              >
                {artist.name}
              </Link>
            </p>

            <p className="text-lg leading-relaxed text-text-muted">
              {item.description}
            </p>

            <div className="pt-2">
              <Link
                to={`/contact?item=${item.id}`}
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--accent-1)",
                  color: "var(--bg)",
                }}
              >
                Inquire about this piece →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Details: materials, tags, dimensions, technique */}
      <Section background="surface">
        <SectionHeader as="h2" headline="Details" />
        <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          <DetailRow label="Materials" value={item.materials.join(", ")} />
          {item.tags.length > 0 && (
            <DetailRow label="Tags">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs font-medium text-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </DetailRow>
          )}
          {item.dimensions && (
            <DetailRow label="Dimensions" value={item.dimensions} />
          )}
          {item.technique && (
            <DetailRow label="Technique" value={item.technique} />
          )}
          <DetailRow label="Added" value={formatDate(item.createdAt)} />
        </dl>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Local sub-components                                               */
/* ------------------------------------------------------------------ */

const STATUS_LABELS: Record<ItemStatus, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

const STATUS_DOT_VAR: Record<ItemStatus, string> = {
  available: "var(--accent-5)",
  sold: "var(--text-muted)",
  reserved: "var(--accent-4)",
};

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

function PriceBlock({
  price,
  final,
  savings,
}: {
  price: number;
  final: number;
  savings: number;
}) {
  if (savings > 0) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-sm text-text-muted line-through">
          {formatPrice(price)}
        </span>
        <span className="text-xl font-semibold text-text">
          {formatPrice(final)}
        </span>
      </div>
    );
  }
  return (
    <span className="text-xl font-semibold text-text">
      {formatPrice(final)}
    </span>
  );
}

function DetailRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-sm font-medium text-text-muted">{label}</dt>
      <dd className="mt-1 text-text">{children ?? value}</dd>
    </div>
  );
}
