import { getActiveArtists } from "@/data";
import ArtistCard from "@/components/ArtistCard";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export default function Artists() {
  const artists = getActiveArtists();

  return (
    <Section>
      <div className="space-y-10">
        <SectionHeader
          as="h1"
          headline="Artists"
          subheadline="[The artists behind Bead-In. Each piece is designed, beaded, and finished by hand.]"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </Section>
  );
}
