/**
 * Minimal site footer. Real footer content (links, contact, legal, etc.)
 * lands in a later phase — foundations just need a visible closing boundary
 * so the layout has proper shape in every page stub.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface px-4 py-6 text-center text-sm text-text-muted">
      <p className="m-0">
        <strong className="text-text">Bead-In</strong> &middot; &copy; {year}
      </p>
      <p className="m-0 mt-1">
        <small>
          Handmade beadwork by Sebastian Smith and Noah Doty. Portfolio and
          inquiries only — no online checkout.
        </small>
      </p>
    </footer>
  );
}
