/**
 * Primary site navigation. Single source of truth for the nav link set —
 * imported by both the desktop navbar and the mobile drawer so they can
 * never drift.
 */

export interface NavLinkDef {
  to: string;
  label: string;
  end?: boolean;
}

export const NAV_LINKS: readonly NavLinkDef[] = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/gallery", label: "Gallery" },
  { to: "/artists", label: "Artists" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
