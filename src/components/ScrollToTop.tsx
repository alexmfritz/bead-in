import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Side-effect component that jumps the window to the top whenever the route
 * changes. React Router v7 does not do this automatically, which causes a
 * disorienting mid-page load when navigating between pages with long scroll
 * content. Instant (not smooth) scroll on route change; smooth only applies
 * to in-page anchor links.
 *
 * Renders nothing.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
