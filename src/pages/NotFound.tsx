import { Link } from "react-router-dom";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

/**
 * Catch-all 404 page. Renders for any route not matched elsewhere.
 *
 * Beyond the apology headline, the page offers a handful of direct paths
 * back into the site so a lost visitor has somewhere to go without
 * backtracking through the browser history.
 */
const SUGGESTIONS: { to: string; label: string; description: string }[] = [
  {
    to: "/shop",
    label: "Shop",
    description: "Browse every available piece.",
  },
  {
    to: "/gallery",
    label: "Gallery",
    description: "See the full body of work.",
  },
  {
    to: "/artists",
    label: "Artists",
    description: "Meet Sebastian, Noah, and Alex.",
  },
  {
    to: "/contact",
    label: "Contact",
    description: "Reach out with questions or inquiries.",
  },
];

export default function NotFound() {
  return (
    <Section ariaLabel="Page not found">
      <div className="mx-auto max-w-2xl space-y-10">
        <SectionHeader
          as="h1"
          headline="Page not found"
          subheadline="The page you were looking for doesn't exist. It may have moved, been renamed, or never been there at all."
        />

        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-text">
            Maybe you were looking for…
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {SUGGESTIONS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group block rounded-lg border border-border bg-surface p-4 no-underline transition-colors hover:border-accent-1"
                >
                  <p className="font-heading text-base font-semibold text-text">
                    {item.label}{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-text-muted">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-6">
          <Link
            to="/"
            className="text-sm font-medium"
            style={{ color: "var(--accent-1)" }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </Section>
  );
}
