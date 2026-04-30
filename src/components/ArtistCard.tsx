import { Link } from "react-router-dom";
import type { Artist } from "@/types";
import { getItemsByArtist } from "@/data";
import { resolveAsset } from "@/lib/format";

interface ArtistCardProps {
  artist: Artist;
}

/**
 * Build a short bio preview for the card. Bios may contain `\n\n`
 * paragraph separators (real bios are multi-paragraph); collapse all
 * whitespace to single spaces before clamping so the preview reads as
 * one flowing line. Keeps the card a predictable height regardless of
 * whether the bio is a one-liner or several paragraphs.
 */
const previewBio = (bio: string): string => {
  const normalized = bio.replace(/\s+/g, " ").trim();
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 160).trimEnd()}…`;
};

/**
 * Reusable artist showcase card, structured to mirror ItemCard.
 *
 * Wraps the entire card in a `<Link>` so clicking anywhere navigates to
 * the artist profile. Shows a square photo, name, specialties pills,
 * truncated bio, and piece count.
 */
export default function ArtistCard({ artist }: ArtistCardProps) {
  const photoSrc = resolveAsset(artist.photo, "artists");
  const itemCount = getItemsByArtist(artist.id).length;

  return (
    <Link
      to={`/artists/${artist.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg no-underline transition-colors hover:border-accent-1"
    >
      <div className="aspect-square w-full overflow-hidden bg-surface">
        <img
          src={photoSrc}
          alt={`Placeholder — replace with photo of ${artist.name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-lg font-semibold leading-tight text-text">
          {artist.name}
        </h3>
        {artist.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {artist.specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-text"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-text-muted">{previewBio(artist.bio)}</p>
        <p className="mt-auto pt-2 text-xs text-text-muted">
          {itemCount} {itemCount === 1 ? "piece" : "pieces"}
        </p>
      </div>
    </Link>
  );
}
