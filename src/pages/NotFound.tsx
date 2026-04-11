import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-semibold">Page not found</h1>
      <p className="mb-6 text-lg text-text-muted">
        The page you were looking for doesn&rsquo;t exist. It may have moved or
        never been there at all.
      </p>
      <Link to="/" className="font-medium">
        ← Back to home
      </Link>
    </section>
  );
}
