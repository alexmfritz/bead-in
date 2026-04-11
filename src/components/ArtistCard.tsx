import { Link } from "react-router-dom";
import type { Artist } from "@/types";
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
 * Reusable artist card used on the Home page and (later) the Artists
 * index. Shows the artist photo, name, a truncated bio, and a link to
 * their profile. Uses a circular image frame to differentiate from the
 * square item cards.
 */
export default function ArtistCard({ artist }: ArtistCardProps) {
  const photoSrc = resolveAsset(artist.photo, "artists");

  return (
    <article className="flex flex-col items-center gap-4 rounded-lg border border-border bg-bg p-6 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left">
      <img
        src={photoSrc}
        alt={`Placeholder — replace with photo of ${artist.name}`}
        className="h-24 w-24 flex-shrink-0 rounded-full border border-border object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-heading text-xl font-semibold text-text">
          {artist.name}
        </h3>
        <p className="text-sm text-text-muted">{previewBio(artist.bio)}</p>
        <Link
          to={`/artists/${artist.id}`}
          className="text-sm font-medium"
          style={{ color: "var(--accent-1)" }}
        >
          View profile →
        </Link>
      </div>
    </article>
  );
}
