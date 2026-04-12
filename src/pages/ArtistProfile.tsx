import { Link, useParams } from "react-router-dom";
import { getArtistById } from "@/data";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

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

  return (
    <Section>
      <div className="space-y-6">
        <SectionHeader as="h1" headline={artist.name} />
        <p className="text-lg text-text-muted">{artist.bio}</p>
        <Link to="/artists" className="font-medium">
          ← Back to all artists
        </Link>
      </div>
    </Section>
  );
}
