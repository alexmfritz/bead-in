import { Link } from "react-router-dom";
import { getActiveArtists } from "@/data";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export default function Artists() {
  const artists = getActiveArtists();

  return (
    <Section>
      <div className="space-y-6">
        <SectionHeader
          as="h1"
          headline="Artists"
          subheadline="[Artists index — placeholder list of active artists below, linking to their profile pages.]"
        />
        <ul className="space-y-2">
          {artists.map((a) => (
            <li key={a.id}>
              <Link to={`/artists/${a.id}`} className="font-medium">
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
