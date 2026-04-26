import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { resolveAsset } from "@/lib/format";

/**
 * About page — mission narrative, Securus workflow, and contact CTA.
 *
 * Three content sections each pair an image with prose in an alternating
 * left-right-left layout. Text slides horizontally away from its adjacent
 * image on scroll via Motion's `whileInView`. All copy is placeholder
 * until Sebastian and Noah provide real text via Securus.
 */
export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const heroInitial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };

  return (
    <>
      {/* ---------- 1. Hero ---------- */}
      <Section background="surface" ariaLabel="About Bead-In">
        <motion.div
          className="mx-auto max-w-2xl space-y-6 text-center"
          initial={heroInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-1)" }}
          >
            Our story
          </p>
          <h1 className="font-heading text-4xl font-bold text-text md:text-5xl lg:text-6xl">
            About Bead-In
          </h1>
          <div
            className="mx-auto h-1 w-16 rounded-full"
            style={{ backgroundColor: "var(--accent-1)" }}
            aria-hidden="true"
          />
          <p className="text-lg leading-relaxed text-text-muted md:text-xl">
            [A portfolio and inquiry site for handmade artwork by
            incarcerated artists Sebastian Smith and Noah Doty. Every piece
            is one of one — designed, beaded, and finished by hand.]
          </p>
        </motion.div>
      </Section>

      {/* ---------- 2. Our Mission ---------- */}
      <ContentBlock
        imagePosition="left"
        imageSrc={resolveAsset("sebastian-smith-mural.jpg", "artists")}
        imageAlt="Sebastian Smith in front of an inspirational mural"
        background="surface"
        ariaLabel="Our mission"
      >
        <SectionHeader
          as="h2"
          eyebrow="Why we exist"
          headline="[Inclusion. Second chances. Craft that speaks for itself.]"
        />
        <div className="space-y-4 text-base leading-relaxed text-text-muted">
          <p>
            [Bead-In exists to give handmade work a platform — on its own
            terms. Every piece on this site was designed, beaded, and
            finished by hand by artists working from inside the prison
            system. Our job is to make sure it reaches people who
            appreciate it.]
          </p>
          <p>
            [We believe craft doesn&rsquo;t need context to be
            valuable — but we don&rsquo;t hide the context either.
            Sebastian and Noah are building skill, purpose, and connection
            through their art. This site is part of that effort.]
          </p>
          <p>
            [No pity, no spectacle. Just work worth looking at, made by
            people worth knowing.]
          </p>
        </div>
      </ContentBlock>

      {/* ---------- 3. How it works ---------- */}
      <ContentBlock
        imagePosition="right"
        imageSrc={resolveAsset("coral-mandala-earrings.jpg", "items")}
        imageAlt="Beaded mandala fringe earrings showcasing fine seed-bead work"
        ariaLabel="How it works"
      >
        <SectionHeader
          as="h2"
          eyebrow="How it works"
          headline="[Built through the prison messaging system.]"
        />
        <div className="space-y-4 text-base leading-relaxed text-text-muted">
          <p>
            [Everything on Bead-In travels through Securus — the
            messaging platform used in the facility where Sebastian and
            Noah are housed. Photos, descriptions, pricing, bios — all of
            it comes through text-only messages with a ~24,000 character
            limit.]
          </p>
          <p>
            [Here&rsquo;s how it works:]
          </p>
          <ol className="list-decimal space-y-3 pl-6">
            <li>
              [Sebastian and Noah design and bead each piece by hand
              inside the facility.]
            </li>
            <li>
              [They send photos, descriptions, and pricing to Alex
              through Securus messages.]
            </li>
            <li>
              [Alex updates the site with new pieces, bios, and any
              changes the artists request.]
            </li>
            <li>
              [When someone inquires about a piece through the Contact
              form, Alex relays the message back through Securus.]
            </li>
          </ol>
          <p>
            [Reply times depend on the messaging system, not on us. We
            move as fast as the infrastructure allows — usually within a
            few days.]
          </p>
        </div>
      </ContentBlock>

      {/* ---------- 4. Get in touch CTA ---------- */}
      <ContentBlock
        imagePosition="left"
        imageSrc={resolveAsset("blue-mandala-earrings.jpg", "items")}
        imageAlt="Beaded mandala earrings with turquoise and gold fringe"
        background="surface"
        ariaLabel="Contact call to action"
      >
        <SectionHeader
          as="h2"
          headline="[Have a question? Want to learn more?]"
          subheadline="[We'd love to hear from you. Whether you're interested in a piece, curious about the process, or just want to say hello — reach out.]"
        />
        <div className="pt-2">
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
      </ContentBlock>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Local sub-component                                                */
/* ------------------------------------------------------------------ */

interface ContentBlockProps {
  imagePosition: "left" | "right";
  imageSrc: string;
  imageAlt: string;
  background?: "bg" | "surface";
  ariaLabel?: string;
  children: React.ReactNode;
}

/**
 * Two-column section with an image on one side and prose on the other.
 *
 * The image alternates left/right via CSS Grid order utilities. On scroll
 * the text slides horizontally away from the image and both elements
 * fade in. On mobile, everything stacks (image on top, text below).
 */
function ContentBlock({
  imagePosition,
  imageSrc,
  imageAlt,
  background,
  ariaLabel,
  children,
}: ContentBlockProps) {
  const shouldReduceMotion = useReducedMotion();
  const imageOnRight = imagePosition === "right";

  /* Text slides away from the image side. When reduced-motion is on, the
     initial state matches the final state so content is always visible
     and never relies on scroll-in animation to appear. */
  const textInitialX = imageOnRight ? 30 : -30;
  const imageInitial = shouldReduceMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.95 };
  const textInitial = shouldReduceMotion
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: textInitialX };

  return (
    <Section background={background} ariaLabel={ariaLabel}>
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <motion.div
          className={`overflow-hidden rounded-lg bg-surface ${imageOnRight ? "md:order-2" : ""}`}
          initial={imageInitial}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-square w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className={`space-y-6 ${imageOnRight ? "md:order-1" : ""}`}
          initial={textInitial}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          {children}
        </motion.div>
      </div>
    </Section>
  );
}
