import { Link, useParams } from "react-router-dom";
import { getArtistById, getItemsByArtist } from "@/data";
import { resolveAsset } from "@/lib/format";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import ItemCard from "@/components/ItemCard";

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  const artist = id ? getArtistById(id) : undefined;

  if (!artist) {
    return (
      <Section>
        <div className="space-y-6">
          <SectionHeader
            as="h1"
            headline="Artist not found"
            subheadline={`No artist with id "${id ?? "(missing)"}". The link may be stale or mistyped.`}
          />
          <Link to="/artists" className="font-medium">
            ← Back to all artists
          </Link>
        </div>
      </Section>
    );
  }

  const photoSrc = resolveAsset(artist.photo, "artists");
  const items = getItemsByArtist(artist.id);

  return (
    <>
      {/* Hero: photo + bio */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="aspect-square overflow-hidden rounded-lg bg-surface">
            <img
              src={photoSrc}
              alt={`Placeholder — replace with photo of ${artist.name}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <SectionHeader as="h1" headline={artist.name} />

            {artist.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {artist.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-text"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <p className="text-lg leading-relaxed text-text-muted">
              {artist.bio}
            </p>

            <Link to="/artists" className="font-medium">
              ← Back to all artists
            </Link>
          </div>
        </div>
      </Section>

      {/* Work by this artist */}
      <Section background="surface">
        <div className="space-y-10">
          <SectionHeader
            as="h2"
            headline={`Work by ${artist.name}`}
          />
          {items.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} showPrice />
              ))}
            </div>
          ) : (
            <p className="text-text-muted">
              No pieces to show yet. Check back soon.
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
