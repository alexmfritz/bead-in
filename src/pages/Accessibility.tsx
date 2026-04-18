import { Link } from "react-router-dom";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

/**
 * Accessibility statement page.
 *
 * Linked from the footer. Explains the project's accessibility commitment,
 * lists the features built into the site, and invites feedback. Copy is
 * intentionally direct — Bead-In treats accessibility as a quality bar,
 * not a compliance checkbox.
 */
export default function Accessibility() {
  return (
    <>
      {/* Hero */}
      <Section background="surface" ariaLabel="Accessibility statement">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-1)" }}
          >
            Commitment
          </p>
          <h1 className="font-heading text-4xl font-bold text-text md:text-5xl lg:text-6xl">
            Accessibility
          </h1>
          <div
            className="mx-auto h-1 w-16 rounded-full"
            style={{ backgroundColor: "var(--accent-1)" }}
            aria-hidden="true"
          />
          <p className="text-lg leading-relaxed text-text-muted md:text-xl">
            Bead-In treats accessibility as a quality bar, not a feature.
            Every part of the site is built to work for everyone who visits
            it, regardless of how they interact with the web.
          </p>
        </div>
      </Section>

      {/* What we've built */}
      <Section width="narrow" ariaLabel="Accessibility features">
        <div className="space-y-6">
          <SectionHeader
            as="h2"
            eyebrow="What we've built"
            headline="Features in service of access"
          />
          <ul className="space-y-4 text-base leading-relaxed text-text-muted">
            <li>
              <strong className="text-text">Full keyboard navigation.</strong>{" "}
              Every interactive element can be reached and operated with the
              keyboard. A skip-to-content link appears on first tab so you can
              bypass the navigation.
            </li>
            <li>
              <strong className="text-text">Semantic HTML.</strong> Pages use
              proper landmarks, heading hierarchy, and form labels so
              assistive technology can describe the site accurately.
            </li>
            <li>
              <strong className="text-text">Visible focus rings.</strong> All
              focusable elements display a clear outline when navigated to via
              keyboard.
            </li>
            <li>
              <strong className="text-text">High-contrast theme.</strong> A
              toggle in the header switches to a high-contrast palette for
              users who need stronger visual separation.
            </li>
            <li>
              <strong className="text-text">Reduced-motion respect.</strong>{" "}
              If your system is set to prefer reduced motion, animations are
              collapsed so content appears instantly without movement.
            </li>
            <li>
              <strong className="text-text">Screen reader support.</strong>{" "}
              Decorative icons are hidden, interactive elements have
              descriptive labels, and form errors are announced via live
              regions.
            </li>
            <li>
              <strong className="text-text">Light and dark modes.</strong>{" "}
              Both palettes meet WCAG AA contrast targets for body text, and
              the site respects your system preference by default.
            </li>
          </ul>
        </div>
      </Section>

      {/* Standards + feedback */}
      <Section background="surface" width="narrow" ariaLabel="Standards and feedback">
        <div className="space-y-6">
          <SectionHeader
            as="h2"
            eyebrow="Standards"
            headline="What we measure against"
          />
          <div className="space-y-4 text-base leading-relaxed text-text-muted">
            <p>
              Bead-In aims for conformance with the{" "}
              <a
                href="https://www.w3.org/WAI/WCAG22/quickref/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--accent-1)" }}
              >
                Web Content Accessibility Guidelines (WCAG) 2.2
              </a>{" "}
              at the AA level. We test with keyboard navigation, screen
              readers, and reduced-motion / high-contrast emulation.
            </p>
            <p>
              If you encounter a barrier — something that isn&rsquo;t
              keyboard-reachable, a label that reads wrong in your screen
              reader, contrast that falls short, anything at all — we want to
              hear about it. Accessibility improves when people tell us what
              doesn&rsquo;t work.
            </p>
            <p>
              Reach out through the{" "}
              <Link
                to="/contact"
                className="font-medium underline"
                style={{ color: "var(--accent-1)" }}
              >
                Contact form
              </Link>{" "}
              and we&rsquo;ll investigate. We&rsquo;ll also update this page
              as we fix issues and add new features.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
