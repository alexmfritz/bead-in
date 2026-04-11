import { NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContrastToggle } from "@/components/ContrastToggle";

interface NavLinkDef {
  to: string;
  label: string;
  end?: boolean;
}

const navLinks: readonly NavLinkDef[] = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/gallery", label: "Gallery" },
  { to: "/artists", label: "Artists" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/**
 * Top site navigation. Semantic `<header>` + `<nav>` with a skip-to-content
 * link as the first focusable element (keyboard users jump straight past
 * the nav to the main content). ThemeToggle and ContrastToggle sit at the
 * end of the row. No hamburger menu in foundations — the link row reflows
 * via flex-wrap on narrow viewports which is acceptable for placeholder
 * content; a real mobile menu can ship in a later phase.
 */
export default function Navbar() {
  return (
    <header className="border-b border-border bg-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-bg focus:px-3 focus:py-2 focus:text-text focus:outline-2 focus:outline-focus"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <NavLink
          to="/"
          className="font-heading text-xl font-semibold text-text no-underline"
        >
          Bead-In
        </NavLink>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center gap-1 sm:gap-3">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [
                      "inline-block rounded px-2 py-1 text-sm font-medium no-underline transition-colors",
                      isActive
                        ? "text-text underline decoration-2 underline-offset-4"
                        : "text-text-muted hover:text-text",
                    ].join(" ")
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ContrastToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
