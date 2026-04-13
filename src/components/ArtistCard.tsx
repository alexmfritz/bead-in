import { Link } from "react-router-dom";
import type { Artist } from "@/types";
import { getItemsByArtist } from "@/data";
import { resolveAsset } from "@/lib/format";

interface ArtistCardProps {
  artist: Artist;
}

/**
 * Strip bracketed placeholder text and clamp to ~160 characters so the
 * card stays a predictable height even while bios are placeholders.
 * When real bios land, the clamp is still useful — the full bio lives
 * on the artist profile page.
 */
const previewBio = (bio: string): string => {
  const trimmed = bio.trim();
  if (trimmed.length <= 160) return trimmed;
  return `${trimmed.slice(0, 160).trimEnd()}…`;
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
