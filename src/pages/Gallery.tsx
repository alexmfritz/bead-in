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

/**
 * Tile shape within the mosaic grid. A 10-item cycle mixes four accent
 * shapes among the standard 1×1 tiles so the pattern never feels
 * repetitive. `grid-auto-flow: dense` fills gaps automatically.
 *
 *   Index 0 → large  (2 col × 2 row)  — hero showcase
 *   Index 3 → wide   (2 col × 1 row)  — landscape strip
 *   Index 5 → tall   (1 col × 2 row)  — portrait column
 *   Index 8 → wide   (2 col × 1 row)  — second landscape
 *   All others → normal (1 col × 1 row)
 */
type TileShape = "normal" | "large" | "wide" | "tall";

const SHAPE_CYCLE: Record<number, TileShape> = {
  0: "large",
  3: "wide",
  5: "tall",
  8: "wide",
};

function getTileShape(index: number): TileShape {
  return SHAPE_CYCLE[index % 10] ?? "normal";
}

const SHAPE_CLASSES: Record<TileShape, string> = {
  normal: "",
  large: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
};

/**
 * Aspect ratio per tile shape so the inner content fills its grid area
 * without black bars. On mobile (single column) everything is square.
 */
const SHAPE_ASPECT: Record<TileShape, string> = {
  normal: "aspect-square",
  large: "aspect-square",
  wide: "aspect-square sm:aspect-[2/1]",
  tall: "aspect-square sm:aspect-[1/2]",
};

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
  const shape = getTileShape(index);
  const photoCount = item.images.length;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${item.name} by ${artist?.name ?? "Unknown"} — ${photoCount} photo${photoCount !== 1 ? "s" : ""}`}
      className={`group relative cursor-pointer overflow-hidden rounded-lg border border-border ${SHAPE_CLASSES[shape]}`}
    >
      <motion.div
        className={`relative w-full ${SHAPE_ASPECT[shape]}`}
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
