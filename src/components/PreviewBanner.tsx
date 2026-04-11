import { siteMode } from "@/config";

/**
 * Sticky preview-mode banner. Only rendered when `siteMode === "preview"`.
 * When Sebastian and Noah approve the real content, flip `siteMode` in
 * `src/data/config.json` to `"live"` and this component returns null.
 */
export default function PreviewBanner() {
  if (siteMode !== "preview") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-50 border-b border-border bg-surface px-4 py-2 text-center text-sm text-text-muted"
    >
      <strong className="text-text">Preview mode</strong> — content subject to
      change. Launching soon.
    </div>
  );
}
