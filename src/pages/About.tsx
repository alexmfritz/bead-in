import { Link } from "react-router-dom";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

/**
 * About page — mission narrative, Securus workflow, and contact CTA.
 *
 * Prose-heavy, narrow-width layout. All copy is placeholder until
 * Sebastian and Noah provide real text via Securus at content-load phase.
 */
export default function About() {
  return (
    <>
      {/* ---------- 1. Hero ---------- */}
      <Section width="narrow">
        <SectionHeader
          as="h1"
          headline="About Bead-In"
          subheadline="[A portfolio and inquiry site for handmade artwork by incarcerated artists Sebastian Smith and Noah Doty.]"
        />
      </Section>

      {/* ---------- 2. Our Mission ---------- */}
      <Section background="surface" width="narrow">
        <div className="space-y-6">
          <SectionHeader
            as="h2"
            eyebrow="Why we exist"
            headline="[Inclusion. Second chances. Craft that speaks for itself.]"
          />
          <div className="space-y-4 text-base leading-relaxed text-text-muted">
            <p>
              [Bead-In exists to give handmade work a platform — on its own
              terms. Every piece on this site was designed, beaded, and
              finished by hand by artists working from inside the prison
              system. Our job is to make sure it reaches people who
              appreciate it.]
            </p>
            <p>
              [We believe craft doesn&rsquo;t need context to be
              valuable — but we don&rsquo;t hide the context either.
              Sebastian and Noah are building skill, purpose, and connection
              through their art. This site is part of that effort.]
            </p>
            <p>
              [No pity, no spectacle. Just work worth looking at, made by
              people worth knowing.]
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- 3. How it works ---------- */}
      <Section width="narrow">
        <div className="space-y-6">
          <SectionHeader
            as="h2"
            eyebrow="How it works"
            headline="[Built through the prison messaging system.]"
          />
          <div className="space-y-4 text-base leading-relaxed text-text-muted">
            <p>
              [Everything on Bead-In travels through Securus — the
              messaging platform used in the facility where Sebastian and
              Noah are housed. Photos, descriptions, pricing, bios — all of
              it comes through text-only messages with a ~24,000 character
              limit.]
            </p>
            <p>
              [Here&rsquo;s how it works:]
            </p>
            <ol className="list-decimal space-y-3 pl-6">
              <li>
                [Sebastian and Noah design and bead each piece by hand
                inside the facility.]
              </li>
              <li>
                [They send photos, descriptions, and pricing to Alex
                through Securus messages.]
              </li>
              <li>
                [Alex updates the site with new pieces, bios, and any
                changes the artists request.]
              </li>
              <li>
                [When someone inquires about a piece through the Contact
                form, Alex relays the message back through Securus.]
              </li>
            </ol>
            <p>
              [Reply times depend on the messaging system, not on us. We
              move as fast as the infrastructure allows — usually within a
              few days.]
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- 4. Get in touch CTA ---------- */}
      <Section background="surface" width="narrow">
        <div className="space-y-8 text-center">
          <SectionHeader
            as="h2"
            headline="[Have a question? Want to learn more?]"
            subheadline="[We'd love to hear from you. Whether you're interested in a piece, curious about the process, or just want to say hello — reach out.]"
            align="center"
          />
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--accent-1)",
              color: "var(--bg)",
            }}
          >
            Contact us →
          </Link>
        </div>
      </Section>
    </>
  );
}
