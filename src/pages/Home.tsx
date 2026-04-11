import { Link } from "react-router-dom";
import { getActiveArtists, getLatestItems } from "@/data";
import { resolveAsset } from "@/lib/format";
import ItemCard from "@/components/ItemCard";
import ArtistCard from "@/components/ArtistCard";

/**
 * Home page — first real page build in Bead-In.
 *
 * Five sections composed inline (sectional reuse comes later when the
 * same patterns appear on About, Shop, etc.):
 *   1. Hero          — Playfair H1 + tagline + two CTA buttons, plus a
 *                      placeholder hero image on desktop.
 *   2. Featured work — 6 newest items across all statuses via
 *                      getLatestItems(6), rendered as ItemCards without
 *                      prices (showPrice defaults to false).
 *   3. Meet artists  — ArtistCards for every active artist from
 *                      getActiveArtists().
 *   4. Mission       — narrow centered column with placeholder copy.
 *   5. Contact CTA   — primary call-to-action to the /contact route.
 *
 * Background alternates bg-bg → bg-bg → bg-surface → bg-bg → bg-surface
 * so the page has visual rhythm without any custom CSS rules. All colors
 * come from the theme tokens — the same file produces 8 coherent variants
 * across blue/purple × light/dark × normal/high-contrast.
 */
export default function Home() {
  const latestItems = getLatestItems(6);
  const artists = getActiveArtists();
  const heroImage = resolveAsset("placeholder.svg", "items");

  return (
    <>
      {/* ---------- 1. Hero ---------- */}
      <section className="bg-bg">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="flex flex-col justify-center gap-6 md:col-span-7">
            <h1 className="font-heading text-4xl font-semibold leading-tight text-text md:text-5xl lg:text-6xl">
              Beadwork from inside.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-text-muted">
              [Handmade portfolio by Sebastian Smith and Noah Rivera,
              collaborating from inside. Every piece is one of one — designed,
              beaded, and finished by hand.]
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/artists"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--accent-1)",
                  color: "var(--bg)",
                }}
              >
                Meet the artists →
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-md border border-border bg-bg px-5 py-3 text-sm font-semibold text-text no-underline transition-colors hover:border-accent-1"
              >
                Browse the shop →
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <img
                src={heroImage}
                alt="Placeholder — replace with a hero item photo"
                className="block aspect-square h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. Featured work ---------- */}
      <section className="bg-bg">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-text md:text-4xl">
                Latest work
              </h2>
              <p className="mt-2 text-base text-text-muted">
                [A selection from the studio — visit the shop for everything
                available.]
              </p>
            </div>
            <Link
              to="/shop"
              className="text-sm font-medium"
              style={{ color: "var(--accent-1)" }}
            >
              View all items →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 3. Meet the artists ---------- */}
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-semibold text-text md:text-4xl">
              Meet the artists
            </h2>
            <p className="mt-2 text-base text-text-muted">
              [Two artists, collaborating via the Securus messaging system.
              Every piece runs through their hands.]
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 4. Mission ---------- */}
      <section className="bg-bg">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center md:py-24">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-1)" }}
          >
            Why we&rsquo;re here
          </p>
          <h2 className="mb-6 font-heading text-3xl font-semibold text-text md:text-4xl">
            [Inclusion. Second chances. Craft that speaks for itself.]
          </h2>
          <div className="space-y-4 text-left text-base leading-relaxed text-text-muted">
            <p>
              [Bead-In is a portfolio and inquiry site for handmade beadwork
              created by incarcerated artists. Our mission is simple: give the
              work a platform, on its own terms, while the artists keep
              building skill and connection from inside.]
            </p>
            <p>
              [Every piece on this site was designed and finished by hand.
              Every description, photo, and price came through the prison
              messaging system. When you reach out, you&rsquo;re reaching real
              people on the other end — reply times depend on the system, not
              on us.]
            </p>
            <p>
              [We don&rsquo;t hide the context, but we don&rsquo;t lead with
              it either. Look at the work first. If it speaks to you, the
              story is here when you want it.]
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 5. Contact CTA ---------- */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:py-20">
          <h2 className="mb-4 font-heading text-3xl font-semibold text-text md:text-4xl">
            [Interested in a piece? Start a conversation.]
          </h2>
          <p className="mb-8 text-base leading-relaxed text-text-muted">
            [Inquiries go through our Contact form — we reply as soon as
            messages clear the prison messaging system. Include the item name
            in your message and we&rsquo;ll get back to you with details.]
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--accent-1)",
              color: "var(--bg)",
            }}
          >
            Contact us →
          </Link>
        </div>
      </section>
    </>
  );
}
