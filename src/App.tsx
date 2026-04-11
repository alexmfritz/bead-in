import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ContrastToggle } from "@/components/ContrastToggle";

/**
 * Phase C verification harness.
 *
 * This minimal App demonstrates the theme system end-to-end:
 * - `ThemeProvider` wraps the tree.
 * - Both toggles are rendered so light/dark and normal/HC can be flipped.
 * - A swatch grid shows every palette variable against bg and surface so
 *   the 8 palette × theme × contrast combinations are visually inspectable.
 *
 * Phase D replaces this file with the real routing + layout shell.
 */
export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-bg text-text">
        <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <h1 className="text-2xl font-semibold">Bead-In — Theme Preview</h1>
          <div className="flex items-center gap-2">
            <ContrastToggle />
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto max-w-4xl space-y-8 p-6">
          <section>
            <h2 className="mb-2 text-xl font-semibold">Typography</h2>
            <p className="text-text">
              Body text in <code>--color-text</code> on <code>--color-bg</code>.
              Resize below 768px to swap to the purple palette.
            </p>
            <p className="text-text-muted">
              Muted text in <code>--color-text-muted</code> for secondary
              information.
            </p>
            <p>
              This is a{" "}
              <a href="#link-demo" onClick={(e) => e.preventDefault()}>
                link
              </a>{" "}
              and this is a{" "}
              <a
                href="#visited-demo"
                onClick={(e) => e.preventDefault()}
                style={{ color: "var(--color-link-visited)" }}
              >
                visited link
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">Accent swatches</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="flex aspect-square items-center justify-center rounded text-sm font-medium"
                  style={{
                    backgroundColor: `var(--accent-${n})`,
                    color: "var(--bg)",
                  }}
                >
                  accent-{n}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">Surface block</h2>
            <div className="rounded border border-border bg-surface p-4 text-text">
              <p>
                Surface background in <code>--color-surface</code>. Borders use{" "}
                <code>--color-border</code>. This block should remain readable
                against its parent background in every variant.
              </p>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}
