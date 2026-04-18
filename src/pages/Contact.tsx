import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { getActiveArtists, getShopItems } from "@/data";
import Section from "@/components/Section";

type ContactMethod = "email" | "phone";
type InterestType = "item" | "artist";
type FormStatus = "idle" | "submitting" | "success" | "error";

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL as string;

const INPUT_CLASSES =
  "w-full rounded-md border border-border bg-bg px-3 py-2 text-text placeholder:text-text-muted/50 focus:border-accent-1 focus:outline-none focus:ring-1 focus:ring-accent-1";

/**
 * Contact page — Formspree-backed inquiry form with toggleable fields.
 *
 * Two toggle pairs swap the visible input:
 *   - Preferred Contact Method: email ↔ phone
 *   - Interested In: item ↔ artist (each populates a different select)
 *
 * The `?item=<id>` query param from ItemDetail's "Inquire" CTA auto-sets
 * the Interested In toggle to "item" and pre-selects the matching item.
 */
export default function Contact() {
  const [searchParams] = useSearchParams();
  const prefillItemId = searchParams.get("item");

  const shopItems = getShopItems();
  const artists = getActiveArtists();

  /* Determine initial interest state from URL */
  const prefillMatch = prefillItemId
    ? shopItems.find((i) => i.id === prefillItemId)
    : undefined;

  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [interestType, setInterestType] = useState<InterestType>(
    prefillMatch ? "item" : "item",
  );
  const [selectedItem, setSelectedItem] = useState(
    prefillMatch ? prefillMatch.id : "other",
  );
  const [selectedArtist, setSelectedArtist] = useState("other");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_URL) return;

    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Add the active interest selection */
    if (interestType === "item") {
      const item = shopItems.find((i) => i.id === selectedItem);
      data.set("interested_in", item ? `Item: ${item.name}` : "Other / general inquiry");
    } else {
      const artist = artists.find((a) => a.id === selectedArtist);
      data.set("interested_in", artist ? `Artist: ${artist.name}` : "Other / general inquiry");
    }

    data.set("contact_method", contactMethod);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ---------- Hero ---------- */}
      <Section background="surface" ariaLabel="Contact page introduction">
        <motion.div
          className="mx-auto max-w-2xl space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-1)" }}
          >
            Get in touch
          </p>
          <h1 className="font-heading text-4xl font-bold text-text md:text-5xl lg:text-6xl">
            Contact
          </h1>
          <div
            className="mx-auto h-1 w-16 rounded-full"
            style={{ backgroundColor: "var(--accent-1)" }}
            aria-hidden="true"
          />
          <p className="text-lg leading-relaxed text-text-muted md:text-xl">
            [Have a question about a piece, want to learn about an artist,
            or just want to say hello? Fill out the form below and
            we&rsquo;ll get back to you as soon as messages clear the
            Securus system.]
          </p>
        </motion.div>
      </Section>

      {/* ---------- Form ---------- */}
      <Section width="narrow" ariaLabel="Inquiry form">
        {!FORMSPREE_URL ? (
          <div className="rounded-lg border border-border bg-surface p-6 text-center text-sm text-text-muted">
            <p className="font-medium text-text">Formspree not configured</p>
            <p className="mt-1">
              Set <code className="text-accent-1">VITE_FORMSPREE_URL</code> in{" "}
              <code>.env.local</code> to enable form submissions.
            </p>
          </div>
        ) : status === "success" ? (
          <div className="space-y-6 text-center">
            <h2 className="font-heading text-2xl font-bold text-text">
              Message sent!
            </h2>
            <p className="text-text-muted">
              Thanks for reaching out. We&rsquo;ll get back to you as soon
              as messages clear the Securus system.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--accent-1)",
                color: "var(--bg)",
              }}
            >
              ← Back to shop
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {status === "error" && (
              <div
                className="rounded-md border border-error-border bg-error-bg p-4 text-sm text-error-text"
                role="alert"
                aria-live="polite"
              >
                Something went wrong. Please try again or reach out
                directly via Securus.
              </div>
            )}

            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium text-text">
                Name <span className="text-error-text" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                aria-required="true"
                className={INPUT_CLASSES}
                placeholder="Your name"
              />
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-text">
                Preferred contact method
              </span>
              <SegmentedToggle
                options={[
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Phone" },
                ]}
                value={contactMethod}
                onChange={(v) => setContactMethod(v as ContactMethod)}
                groupLabel="Preferred contact method"
              />
            </div>

            {/* Email or Phone (swapped by toggle) */}
            {contactMethod === "email" ? (
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-text"
                >
                  Email <span className="text-error-text" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  className={INPUT_CLASSES}
                  placeholder="you@example.com"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-text"
                >
                  Phone <span className="text-error-text" aria-hidden="true">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  aria-required="true"
                  className={INPUT_CLASSES}
                  placeholder="(555) 123-4567"
                />
              </div>
            )}

            {/* Interested In */}
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-text">
                Interested in
              </span>
              <SegmentedToggle
                options={[
                  { value: "item", label: "Item" },
                  { value: "artist", label: "Artist" },
                ]}
                value={interestType}
                onChange={(v) => setInterestType(v as InterestType)}
                groupLabel="Interested in"
              />
            </div>

            {/* Item or Artist select (swapped by toggle) */}
            {interestType === "item" ? (
              <div className="space-y-1.5">
                <label
                  htmlFor="item-select"
                  className="text-sm font-medium text-text"
                >
                  Item{" "}
                  <span className="font-normal text-text-muted">
                    (optional)
                  </span>
                </label>
                <select
                  id="item-select"
                  name="item"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className={INPUT_CLASSES}
                >
                  <option value="other">Other / general inquiry</option>
                  {shopItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label
                  htmlFor="artist-select"
                  className="text-sm font-medium text-text"
                >
                  Artist{" "}
                  <span className="font-normal text-text-muted">
                    (optional)
                  </span>
                </label>
                <select
                  id="artist-select"
                  name="artist"
                  value={selectedArtist}
                  onChange={(e) => setSelectedArtist(e.target.value)}
                  className={INPUT_CLASSES}
                >
                  <option value="other">Other / general inquiry</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-text"
              >
                Message <span className="text-error-text" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                aria-required="true"
                rows={5}
                className={INPUT_CLASSES}
                placeholder="Tell us what you're interested in..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              aria-disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-sm font-semibold no-underline transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{
                backgroundColor: "var(--accent-1)",
                color: "var(--bg)",
              }}
            >
              {status === "submitting" ? "Sending..." : "Send message →"}
            </button>
          </form>
        )}
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Local sub-component                                                */
/* ------------------------------------------------------------------ */

interface SegmentedToggleProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  /** Human-readable label exposed to screen readers via `aria-label`. */
  groupLabel: string;
}

/**
 * Accessible segmented toggle (radio group) following the WAI-ARIA radio
 * group pattern:
 *
 * - Single tab stop (only the checked option has `tabIndex={0}`).
 * - ArrowRight/ArrowDown moves focus to the next option AND selects it.
 * - ArrowLeft/ArrowUp moves focus to the previous option AND selects it.
 * - Home/End jump to first/last option.
 * - Wraps at the ends of the group.
 *
 * The active segment uses accent-1 background; inactive segments use
 * surface/border. `groupLabel` should be human-readable text ("Preferred
 * contact method"), not a technical slug.
 */
function SegmentedToggle({
  options,
  value,
  onChange,
  groupLabel,
}: SegmentedToggleProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let nextIndex: number | null = null;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (i + 1) % options.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = i === 0 ? options.length - 1 : i - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = options.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    onChange(options[nextIndex].value);

    // Move focus to the newly selected option after React updates the DOM.
    requestAnimationFrame(() => {
      const group = e.currentTarget.parentElement;
      const target = group?.children[nextIndex!] as HTMLElement | undefined;
      target?.focus();
    });
  };

  return (
    <div role="radiogroup" aria-label={groupLabel} className="flex gap-0">
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              i === 0 ? "rounded-l-md" : ""
            } ${i === options.length - 1 ? "rounded-r-md" : ""} ${
              active
                ? "text-bg"
                : "border border-border bg-surface text-text hover:border-accent-1"
            }`}
            style={
              active
                ? {
                    backgroundColor: "var(--accent-1)",
                    color: "var(--bg)",
                  }
                : undefined
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
