import { Link, useParams } from "react-router-dom";
import { getArtistById } from "@/data";

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>();
  const artist = id ? getArtistById(id) : undefined;

  if (!artist) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-4 text-4xl font-semibold">Artist not found</h1>
        <p className="mb-6 text-lg text-text-muted">
          No artist with id <code>{id ?? "(missing)"}</code>. The link may be
          stale or mistyped.
        </p>
        <Link to="/artists" className="font-medium">
          ← Back to all artists
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-semibold">{artist.name}</h1>
      <p className="text-lg text-text-muted">{artist.bio}</p>
      <p className="mt-6">
        <Link to="/artists" className="font-medium">
          ← Back to all artists
        </Link>
      </p>
    </section>
  );
}
