import type { ReactNode } from "react";

interface SectionHeaderProps {
  /**
   * Semantic heading level for the main headline. Use `"h1"` only on
   * the hero (one per page); everything else is `"h2"`.
   */
  as?: "h1" | "h2";
  /**
   * Small uppercase label rendered above the headline, colored with
   * `--accent-1`. Known in editorial as an "eyebrow" or "kicker".
   * Optional — use sparingly for mission-style framing.
   */
  eyebrow?: string;
  /**
   * The main headline. Required. Rendered in Playfair Display, sized
   * per `as` (larger for h1 hero, medium for h2 section).
   */
  headline: string;
  /**
   * Supporting sentence that elaborates on the headline. Rendered in
   * `--text-muted` below the headline. Optional.
   */
  subheadline?: string;
  /**
   * Horizontal alignment of the header block. Defaults to `"left"`.
   * `"center"` is common for full-width narrative sections (Mission,
   * Contact CTA). Ignored when `action` is provided — the row layout
   * always left-aligns the header.
   */
  align?: "left" | "center";
  /**
   * Optional right-aligned element (typically a secondary link like
   * "View all →"). When present, the header switches to a row layout
   * on md+ with the action pinned to the right edge.
   */
  action?: ReactNode;
}

const HEADING_SIZES: Record<NonNullable<SectionHeaderProps["as"]>, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl",
  h2: "text-3xl md:text-4xl",
};

/**
 * Reusable section header: optional eyebrow + headline + optional
 * subheadline, with optional right-aligned action. Unifies the
 * editorial vocabulary across every page so Home, Shop, About, etc.
 * share the same header rhythm without per-page className juggling.
 */
export default function SectionHeader({
  as = "h2",
  eyebrow,
  headline,
  subheadline,
  align = "left",
  action,
}: SectionHeaderProps) {
  const HeadingTag = as;
  const headingSize = HEADING_SIZES[as];
  // Action rows always left-align; `align` only applies to the stacked
  // layout without an action.
  const textAlignClass = action ? "" : align === "center" ? "text-center" : "";

  const headerBlock = (
    <div className={textAlignClass}>
      {eyebrow && (
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--accent-1)" }}
        >
          {eyebrow}
        </p>
      )}
      <HeadingTag
        className={`font-heading ${headingSize} font-semibold leading-tight text-text`}
      >
        {headline}
      </HeadingTag>
      {subheadline && (
        <p className="mt-3 text-base leading-relaxed text-text-muted md:text-lg">
          {subheadline}
        </p>
      )}
    </div>
  );

  if (action) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {headerBlock}
        <div className="flex-shrink-0">{action}</div>
      </div>
    );
  }

  return headerBlock;
}
