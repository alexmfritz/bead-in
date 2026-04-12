import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Gallery from "@/pages/Gallery";
import Artists from "@/pages/Artists";
import ArtistProfile from "@/pages/ArtistProfile";
import ItemDetail from "@/pages/ItemDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

/**
 * Root application.
 *
 * - `<ThemeProvider>` owns the theme + contrast state and sets `data-theme`
 *   and `data-contrast` attributes on `<html>` in sync with user toggles.
 * - `<BrowserRouter>` wraps everything so all descendants can use router
 *   hooks (`useLocation`, `useParams`, etc.).
 * - Nested `<Route element={<Layout />}>` shares the ScrollToTop,
 *   PreviewBanner, Navbar, AnimatePresence wrapper, and Footer across every
 *   route. The catch-all `path="*"` matches any unknown URL and renders
 *   NotFound.
 */
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:id" element={<ArtistProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
