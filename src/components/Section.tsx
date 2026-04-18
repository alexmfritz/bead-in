import type { ReactNode } from "react";

interface SectionProps {
  /**
   * Background token to render behind the section. Alternating between
   * `"bg"` and `"surface"` gives pages a layered feel without any
   * per-page CSS.
   */
  background?: "bg" | "surface";
  /**
   * Inner container max-width.
   * - `"default"` (default): `max-w-5xl` — suits hero, featured grids,
   *   artist cards, and most content.
   * - `"narrow"`: `max-w-2xl` — suits prose-heavy sections like Mission,
   *   Contact, and the About page where line length matters.
   * - `"wide"`: `max-w-6xl` — suits dense grids like Shop where a wider
   *   container accommodates a sidebar + multi-column items.
   */
  width?: "default" | "narrow" | "wide";
  /**
   * Accessible name exposed via `aria-label`. When set, the `<section>`
   * becomes a navigable landmark for screen-reader users. Use a concise
   * topic phrase ("Featured work", "Meet the artists") — it's read aloud
   * as "[label], region".
   */
  ariaLabel?: string;
  children: ReactNode;
}

const WIDTH_CLASSES: Record<NonNullable<SectionProps["width"]>, string> = {
  narrow: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
};

/**
 * Full-bleed section wrapper. Renders a `<section>` with a theme-aware
 * background and an inner container with standard horizontal padding and
 * generous vertical padding. Use alongside `<SectionHeader>` for the
 * eyebrow/headline/subheadline block.
 */
export default function Section({
  background = "bg",
  width = "default",
  ariaLabel,
  children,
}: SectionProps) {
  const bgClass = background === "surface" ? "bg-surface" : "bg-bg";
  const widthClass = WIDTH_CLASSES[width];

  return (
    <section className={bgClass} aria-label={ariaLabel}>
      <div className={`mx-auto ${widthClass} px-4 py-16 md:py-24`}>
        {children}
      </div>
    </section>
  );
}
