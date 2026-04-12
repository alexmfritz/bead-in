import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

export default function Contact() {
  // TODO: Read `?item=<id>` from useSearchParams and pre-fill the inquiry form.
  return (
    <Section width="narrow">
      <SectionHeader
        as="h1"
        headline="Contact"
        subheadline="[Contact form goes here — Formspree-backed inquiry form. Opens via /contact?item=<id> from item detail pages with the item reference pre-filled.]"
      />
    </Section>
  );
}
