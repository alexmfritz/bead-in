import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/lib/navLinks";

/**
 * Site footer.
 *
 * Three columns on desktop collapsing to a stacked layout on mobile:
 *   1. Brand + tagline
 *   2. Quick navigation links (mirrors the main nav)
 *   3. Utility links (accessibility statement, credit) + copyright
 *
 * Accessibility statement is linked from here rather than the primary nav
 * because it's a utility / reference page, not a content destination.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + tagline */}
          <div className="space-y-2">
            <Link
              to="/"
              className="font-heading text-xl font-semibold text-text no-underline"
            >
              Bead-In
            </Link>
            <p className="text-sm text-text-muted">
              Handmade beadwork and original artwork by Sebastian Smith and
              Noah Doty. Portfolio and inquiries only — no online checkout.
            </p>
          </div>

          {/* Quick navigation */}
          <nav aria-label="Footer navigation" className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Explore
            </p>
            <ul className="space-y-1.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-text-muted no-underline hover:text-text hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Utility + credits */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              More
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  to="/accessibility"
                  className="text-text-muted no-underline hover:text-text hover:underline"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <span className="text-text-muted">
                  Site by{" "}
                  <Link
                    to="/artists/alex-fritz"
                    className="text-text no-underline hover:underline"
                  >
                    Alex Fritz
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-text-muted">
          <p className="m-0">
            <strong className="text-text">Bead-In</strong> &middot; &copy;{" "}
            {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
