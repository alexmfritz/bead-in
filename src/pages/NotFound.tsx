import { Link } from "react-router-dom";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export default function NotFound() {
  return (
    <Section>
      <div className="space-y-6">
        <SectionHeader
          as="h1"
          headline="Page not found"
          subheadline="The page you were looking for doesn't exist. It may have moved or never been there at all."
        />
        <Link to="/" className="font-medium">
          ← Back to home
        </Link>
      </div>
    </Section>
  );
}
