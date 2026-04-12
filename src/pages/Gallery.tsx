import { useState } from "react";
import { motion } from "motion/react";
import { getArtistById, getLatestItems } from "@/data";
import type { Item, ItemStatus } from "@/types";
import { resolveAsset } from "@/lib/format";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

/**
 * Gallery page — asymmetric mosaic grid with lightbox.
 *
 * Shows hero images for ALL items (available + sold + reserved) in a dense
 * CSS Grid where every 5th tile is double-sized. Clicking a tile opens a
 * lightbox revealing the item's full `images[]` set with thumbnails, zoom,
 * and captions.
 */
export default function Gallery() {
  const items = getLatestItems();
  const [lightboxItemIndex, setLightboxItemIndex] = useState(-1);

  const handleTileClick = (index: number) => {
    setLightboxItemIndex(index);
  };

  /* Build slides from the active item's full images array */
  const lightboxItem =
    lightboxItemIndex >= 0 ? items[lightboxItemIndex] : null;
  const artist = lightboxItem
    ? getArtistById(lightboxItem.artistId)
    : undefined;
  const slides = lightboxItem
    ? lightboxItem.images.map((img) => ({
        src: resolveAsset(img, "items"),
        alt: lightboxItem.name,
        title: lightboxItem.name,
        description: `by ${artist?.name ?? "Unknown"}`,
      }))
    : [];

  return (
    <>
      <Section width="wide">
        <div className="space-y-10">
          <SectionHeader
            as="h1"
            headline="Gallery"
            subheadline="Every piece we've made — available, sold, and reserved. Click any image to explore."
          />

          {/* Mosaic grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [grid-auto-flow:dense]">
            {items.map((item, index) => (
              <GalleryTile
                key={item.id}
                item={item}
                index={index}
                onClick={() => handleTileClick(index)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Lightbox — shows all images for the selected item */}
      <Lightbox
        open={lightboxItemIndex >= 0}
        close={() => setLightboxItemIndex(-1)}
        index={0}
        slides={slides}
        plugins={[Thumbnails, Zoom, Captions]}
        thumbnails={{
          position: "bottom",
          width: 80,
          height: 80,
          borderRadius: 4,
        }}
        zoom={{ scrollToZoom: true, maxZoomPixelRatio: 3 }}
        captions={{ descriptionTextAlign: "center" }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Local sub-components                                               */
/* ------------------------------------------------------------------ */

/** Every 5th tile gets the large 2×2 treatment. */
function isFeaturedTile(index: number): boolean {
  return index % 5 === 0;
}

const STATUS_LABELS: Record<ItemStatus, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

const STATUS_DOT_VAR: Record<ItemStatus, string> = {
  available: "var(--accent-5)",
  sold: "var(--text-muted)",
  reserved: "var(--accent-4)",
};

interface GalleryTileProps {
  item: Item;
  index: number;
  onClick: () => void;
}

function GalleryTile({ item, index, onClick }: GalleryTileProps) {
  const artist = getArtistById(item.artistId);
  const imageSrc = resolveAsset(item.images[0] ?? "placeholder.svg", "items");
  const featured = isFeaturedTile(index);
  const photoCount = item.images.length;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${item.name} by ${artist?.name ?? "Unknown"} — ${photoCount} photo${photoCount !== 1 ? "s" : ""}`}
      className={`group relative cursor-pointer overflow-hidden rounded-lg border border-border ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
    >
      <motion.div
        className="relative aspect-square w-full"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <img
          src={imageSrc}
          alt={`${item.name} by ${artist?.name ?? "Unknown"}`}
          className="h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-90"
          loading="lazy"
        />

        {/* Bottom gradient overlay with item info */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-8">
          <p className="font-heading text-sm font-semibold text-white sm:text-base">
            {item.name}
          </p>
          {artist && (
            <p className="text-xs text-white/80">by {artist.name}</p>
          )}
          {photoCount > 1 && (
            <p className="mt-1 text-xs text-white/60">
              {photoCount} photos
            </p>
          )}
        </div>

        {/* Status chip — top-right corner */}
        <div className="absolute right-2 top-2">
          <StatusChip status={item.status} />
        </div>
      </motion.div>
    </button>
  );
}

function StatusChip({ status }: { status: ItemStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: STATUS_DOT_VAR[status] }}
        aria-hidden="true"
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
