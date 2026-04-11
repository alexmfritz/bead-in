import { Link } from "react-router-dom";
import { getActiveArtists } from "@/data";

export default function Artists() {
  const artists = getActiveArtists();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-semibold">Artists</h1>
      <p className="mb-6 text-lg text-text-muted">
        [Artists index — coming soon. Placeholder list of active artists below,
        linking to their profile pages.]
      </p>
      <ul className="space-y-2">
        {artists.map((a) => (
          <li key={a.id}>
            <Link to={`/artists/${a.id}`} className="font-medium">
              {a.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
