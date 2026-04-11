export default function Contact() {
  // TODO: Read `?item=<id>` from useSearchParams and pre-fill the inquiry form
  // with a reference to the specific item the user clicked through from.
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-semibold">Contact</h1>
      <p className="text-lg text-text-muted">
        [Contact form goes here — Formspree-backed inquiry form. Opens via
        <code> /contact?item=&lt;id&gt;</code> from item detail pages with the
        item reference pre-filled.]
      </p>
    </section>
  );
}
