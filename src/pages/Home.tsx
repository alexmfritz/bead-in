import { Link } from "react-router-dom";
import { getActiveArtists, getLatestItems } from "@/data";
import { resolveAsset } from "@/lib/format";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import ItemCard from "@/components/ItemCard";
import ArtistCard from "@/components/ArtistCard";

/**
 * Home page — five sections using the shared Section/SectionHeader
 * vocabulary so the editorial structure (eyebrow, headline, subheadline)
 * is consistent and easy to talk about with Sebastian and Noah.
 *
 *   1. Hero          — h1, tagline, two CTAs, placeholder image.
 *   2. Featured work — 6 newest items via getLatestItems(6).
 *   3. Meet artists  — ArtistCards for active artists.
 *   4. Mission       — eyebrow + headline + placeholder prose.
 *   5. Contact CTA   — headline + subheadline + primary CTA button.
 */
export default function Home() {
  const latestItems = getLatestItems(6);
  const artists = getActiveArtists();
  const heroImage = resolveAsset("nfl-medallions-upright.jpg", "items");

  return (
    <>
      {/* ---------- 1. Hero ---------- */}
      <section className="bg-bg">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="flex flex-col justify-center gap-6 md:col-span-7">
            <SectionHeader
              as="h1"
              headline="Beadwork from inside."
              subheadline="[Handmade portfolio by Sebastian Smith and Noah Doty, collaborating from inside. Every piece is one of one — designed, beaded, and finished by hand.]"
            />
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
                alt="Handmade beaded NFL team medallions on a carved wooden display board"
                className="block aspect-square h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. Featured work ---------- */}
      <Section>
        <div className="space-y-10">
          <SectionHeader
            headline="Latest work"
            subheadline="[A selection from the studio — visit the shop for everything available.]"
            action={
              <Link
                to="/shop"
                className="text-sm font-medium"
                style={{ color: "var(--accent-1)" }}
              >
                View all items →
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- 3. Meet the artists ---------- */}
      <Section background="surface">
        <div className="space-y-10">
          <SectionHeader
            headline="Meet the artists"
            subheadline="[Two artists, collaborating via the Securus messaging system. Every piece runs through their hands.]"
            align="center"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- 4. Mission ---------- */}
      <Section width="narrow">
        <div className="space-y-6 text-center">
          <SectionHeader
            eyebrow="Why we're here"
            headline="[Inclusion. Second chances. Craft that speaks for itself.]"
            align="center"
          />
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
      </Section>

      {/* ---------- 5. Contact CTA ---------- */}
      <Section background="surface" width="narrow">
        <div className="space-y-8 text-center">
          <SectionHeader
            headline="[Interested in a piece? Start a conversation.]"
            subheadline="[Inquiries go through our Contact form — we reply as soon as messages clear the prison messaging system. Include the item name in your message and we'll get back to you with details.]"
            align="center"
          />
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
      </Section>
    </>
  );
}
