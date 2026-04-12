import { type RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContrastToggle } from "@/components/ContrastToggle";
import { NAV_LINKS } from "@/lib/navLinks";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ------------------------------------------------------------------------ */
/* Internal hooks                                                           */
/* ------------------------------------------------------------------------ */

function useBodyScrollLock(isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);
}

function useEscapeKey(isOpen: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);
}

/**
 * Trap Tab focus within the drawer while it's open, and restore focus to
 * whatever was focused before opening when the drawer closes. Keyboard
 * users should not be able to Tab out of a modal into the scroll-locked
 * page behind it.
 */
function useFocusTrap(
  isOpen: boolean,
  containerRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!isOpen) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusables = (): HTMLElement[] =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    getFocusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== "Tab") return;
      const focusables = getFocusables();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
    // `containerRef` is a stable ref object — intentionally excluded from deps.
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps
}

/* ------------------------------------------------------------------------ */
/* Component                                                                */
/* ------------------------------------------------------------------------ */

/**
 * Slide-in navigation drawer for narrow viewports.
 *
 * - Renders into `document.body` via a portal so its fixed positioning
 *   never fights ancestor stacking contexts.
 * - Fully accessible: `role="dialog"`, `aria-modal="true"`, focus trap,
 *   Escape-to-close, body scroll lock, and focus restoration on close.
 * - Motion animations are automatically collapsed to instant transitions
 *   when the user prefers-reduced-motion (both Motion's built-in respect
 *   for the media query and the global CSS rule in `index.css`).
 * - The backdrop is a decorative click target (`aria-hidden`). Screen
 *   reader users close via the visible close button or Escape key.
 */
export default function MobileNavDrawer({
  isOpen,
  onClose,
}: MobileNavDrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, onClose);
  useFocusTrap(isOpen, containerRef);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (decorative click-to-close). */}
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="fixed inset-0 z-40 cursor-pointer bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Drawer panel. */}
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            id="mobile-nav-drawer"
            className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-l border-border bg-bg shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="font-heading text-lg font-semibold text-text">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text transition-colors hover:border-accent-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="flex-1 overflow-y-auto px-4 py-4"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          "block rounded-md px-4 py-3 font-heading text-lg no-underline transition-colors",
                          isActive
                            ? "bg-surface text-text underline decoration-2 underline-offset-4"
                            : "text-text-muted hover:bg-surface hover:text-text",
                        ].join(" ")
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Preferences
                </span>
                <div className="flex items-center gap-2">
                  <ContrastToggle />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
