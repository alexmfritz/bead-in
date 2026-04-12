import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContrastToggle } from "@/components/ContrastToggle";
import MobileNavDrawer from "@/components/MobileNavDrawer";
import { NAV_LINKS } from "@/lib/navLinks";

/**
 * Top site navigation.
 *
 * - Desktop (md+, ≥768px): full inline nav — brand, 6 links, theme +
 *   contrast toggles — laid out left/center/right with generous spacing.
 * - Mobile (<md): brand on the left, a text "Menu" button on the right.
 *   Tapping Menu opens `<MobileNavDrawer>` from the right side with the
 *   full nav list and the preference toggles.
 *
 * A skip-to-main-content link is the first focusable element regardless
 * of viewport, so keyboard users can always bypass the nav chrome.
 */
export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <header className="border-b border-border bg-surface">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-bg focus:px-3 focus:py-2 focus:text-text focus:outline-2 focus:outline-focus"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-4 md:gap-10 md:py-5">
          <NavLink
            to="/"
            className="font-heading text-2xl font-semibold tracking-tight text-text no-underline md:text-3xl"
          >
            Bead-In
          </NavLink>

          {/* Desktop nav (md+) */}
          <nav
            className="hidden md:block"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-4 lg:gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      [
                        "inline-block rounded px-1 py-1 text-sm font-medium no-underline transition-colors",
                        isActive
                          ? "text-text underline decoration-2 underline-offset-[6px]"
                          : "text-text-muted hover:text-text",
                      ].join(" ")
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop utility toggles (md+) */}
          <div className="hidden items-center gap-2 md:flex">
            <ContrastToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Menu trigger (<md) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            className="inline-flex items-center rounded-md border border-border bg-bg px-4 py-2 font-heading text-base font-semibold text-text transition-colors hover:border-accent-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:hidden"
          >
            Menu
          </button>
        </div>
      </header>

      <MobileNavDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
