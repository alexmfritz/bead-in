import { useTheme } from "@/context/ThemeContext";

/**
 * Button that toggles normal ↔ high contrast. Mirrors {@link ThemeToggle}'s
 * structure and styling so both controls sit consistently in the Navbar.
 */
export function ContrastToggle() {
  const { contrast, toggleContrast } = useTheme();
  const isHigh = contrast === "high";

  return (
    <button
      type="button"
      onClick={toggleContrast}
      aria-label={`Switch to ${isHigh ? "normal" : "high"} contrast`}
      aria-pressed={isHigh}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text transition-colors hover:bg-accent-1/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      {/* Circle with half filled — classic contrast icon */}
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
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor" />
      </svg>
    </button>
  );
}
