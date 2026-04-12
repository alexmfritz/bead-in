import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

/**
 * Top-level app shell composed into every route via `<Route element={<Layout />}>`.
 *
 * Order matters:
 * - ScrollToTop is a side-effect component — it doesn't render anything but
 *   needs access to useLocation, so it lives inside the router.
 * - AnimatePresence + keyed motion.div around the Outlet gives smooth route
 *   transitions. The mode="wait" means the outgoing page finishes fading
 *   before the incoming page starts, so there is never a double-render flash.
 * - Reduced-motion users get the CSS override from index.css which collapses
 *   transition-duration to 0.01ms — motion animations still dispatch but
 *   visually snap.
 */
export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
