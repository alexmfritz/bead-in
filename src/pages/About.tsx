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

      {/* ---------- 3. Materials & supplies ---------- */}
      <Section ariaLabel="Materials and supplies">
        <div className="space-y-12">
          <SectionHeader
            as="h2"
            eyebrow="Behind the work"
            headline="Materials & supplies"
            subheadline="How beadwork supplies actually reach an incarcerated artist — written by Bash."
            align="center"
          />
          <div className="space-y-8 md:space-y-10">
            <StepCard number="01" title="What is Curio?" side="left">
              Doc Curio is an interesting animal. &ldquo;Curio&rdquo; is a
              permit put in place that enables incarcerated individuals
              within Washington State prisons to engage with art in various
              forms. Getting a curio permit is free to the incarcerated,
              but acquiring supplies is not. Once an individual has a curio
              permit, they must then purchase a &ldquo;Hobby Box&rdquo;
              from the facility commissary, which currently for us is a
              20qt clear plastic tote. You must purchase the hobby box
              before you will be allowed to purchase any art supplies. The
              thing that makes this process so interesting is that there is
              no coaching, no guidance about it; for me (Bash), it was
              trial and error during my first year in prison. It&rsquo;s
              almost as if DOC employees are just playing a game about it.
            </StepCard>

            <StepCard number="02" title="The hobby box" side="right">
              Regardless, once the hobby box has been acquired, you may
              then begin filling it with supplies. Until recently, there
              were separate permits for every type of art we were allowed
              to engage with: drawing, beading, model-making, yarn/string,
              and music. But they now have only a single permit that covers
              all of the various art forms DOC allows. Along with that
              change, they update the list of items any one person is able
              to have inside their hobby box at one time. Purchasing
              supplies can be a headache in itself; if you don&rsquo;t know
              what you&rsquo;re allowed to have (either because you&rsquo;re
              new to the system or because the list of allowable items is
              uninformative, incomplete, or too vague to understand), you
              play another sort of game with DOC employees to order
              supplies.
            </StepCard>

            <StepCard
              number="03"
              title="How we pay for supplies"
              side="left"
            >
              The biggest hurdle that must be overcome with ordering
              supplies is that DOC has a stranglehold on how we can
              purchase them; all of the money must be on our
              &ldquo;Spendable&rdquo; account when we make an order. The
              spendable account can have money put in it through paychecks
              from inmate jobs, or friends and family can deposit money
              into it. Any money put into the spendable account is subject
              to deductions of up to 95% if the total on the account would
              exceed $25, meaning that if I have $25 leftover from my
              paycheck and my dad puts $100 into the account and my
              &ldquo;tax&rdquo; (what we call the deductions) is 95%, I
              only get $5 out of that $100. The tax range can be as low as
              5% (for lifers), but almost everyone averages out at about
              55%.
            </StepCard>

            <StepCard number="04" title="Placing an order" side="right">
              Once you have the money, you fill out a Transfer of Funds
              request and get it signed by someone in a CO&rsquo;s position
              or higher (depending on the amount). Once signed, you send it
              and the order form for the supplies in an envelope
              you&rsquo;ve addressed to the company you&rsquo;re ordering
              from to the Recreation Specialist (the person in charge of
              recreational activities, which curio falls under) for
              approval. Once you have placed your order, you are at the
              whims of the Recreation Specialist as to when the order gets
              processed. Once they&rsquo;ve approved the order, they send
              the transfer of funds request to the Banking department, who
              will check to see if you do, in fact, have the money to
              deduct from your spendable account. Once they&rsquo;ve
              processed the money, they ship the order out to the vendor,
              and you wait for the order to be filled. Once filled, it gets
              shipped back to the facility, and you wait to be put on a
              callout (usually Thursday mornings for us) to go down to the
              property building to pick up your new supplies.
            </StepCard>

            <StepCard number="05" title="Our suppliers" side="left">
              We order our bead supplies mainly through Baker Bay Beading
              Company, out of Dorena, Oregon, but our secondary supplier is
              Crazy Crow. Our model supplies come through Model Empire if
              they aren&rsquo;t handmade, our yarn/string through
              Herrschners, and any other art supplies are purchased through
              Dick Blick or United Art and Education. At this time, we are
              only outfitted to use this platform for the sale of beadwork;
              in the future, we will add other artists and art forms, based
              on what our artists are creating.
            </StepCard>

            <StepCard number="06" title="What to expect" side="right">
              The process for ordering supplies itself can take months. It
              usually only takes about 4&ndash;6 weeks, but we have seen it
              take much longer before. When inquiring about a custom piece,
              bear in mind we strive to have the supplies on hand to fill
              the order; if we don&rsquo;t, we&rsquo;ll tell you so, and
              we&rsquo;ll keep you posted as your order moves through each
              step of the process as it continues.
            </StepCard>
          </div>
        </div>
      </Section>

      {/* ---------- 4. How it works ---------- */}
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

      {/* ---------- 5. Get in touch CTA ---------- */}
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

/* ------------------------------------------------------------------ */
/*  StepCard — numbered card for the Materials process                 */
/* ------------------------------------------------------------------ */

interface StepCardProps {
  number: string;
  title: string;
  side: "left" | "right";
  children: React.ReactNode;
}

/**
 * One step in the Materials process explainer. Renders a card with a
 * large numbered marker and title at the top, followed by body prose.
 *
 * On md+ viewports the cards alternate left/right via `ml-auto` so the
 * stack reads as a zig-zag rhythm. On mobile they collapse to full-width
 * single-column. Each card fades up on scroll-into-view (matching the
 * page's existing animation pattern), with reduced-motion respected.
 */
function StepCard({ number, title, side, children }: StepCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const onRight = side === "right";

  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 };

  return (
    <motion.article
      className={`max-w-2xl rounded-lg border border-border bg-surface p-6 md:p-8 ${onRight ? "md:ml-auto" : ""}`}
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-baseline gap-4 md:gap-5">
        <span
          className="font-heading text-5xl font-bold leading-none md:text-6xl"
          style={{ color: "var(--accent-1)" }}
          aria-hidden="true"
        >
          {number}
        </span>
        <h3 className="font-heading text-xl font-semibold leading-tight text-text md:text-2xl">
          {title}
        </h3>
      </div>
      <p className="text-base leading-relaxed text-text-muted">{children}</p>
    </motion.article>
  );
}
