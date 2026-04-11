import type { Item } from "@/types";

/**
 * Format helpers used across price, date, and asset-path rendering.
 *
 * Pure functions only — no React, no side effects. Easy to unit-test when
 * a test runner lands in a later phase.
 */

/**
 * Format a whole-dollar value as a USD currency string.
 *
 * `formatPrice(125)` → `"$125.00"`
 * `formatPrice(106.25)` → `"$106.25"`
 */
export const formatPrice = (dollars: number): string =>
  dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/**
 * Apply an optional decimal discount to an item cost and return both the
 * final charge and the amount saved. Discount is rounded to cents.
 *
 * `applyDiscount({ price: 125, discount: 0.15 })` → `{ final: 106.25, savings: 18.75 }`
 * `applyDiscount({ price: 125 })` → `{ final: 125, savings: 0 }`
 */
export const applyDiscount = (
  cost: Item["cost"],
): { final: number; savings: number } => {
  const discount = cost.discount ?? 0;
  const savingsRaw = cost.price * discount;
  const savings = Math.round(savingsRaw * 100) / 100;
  const final = Math.round((cost.price - savings) * 100) / 100;
  return { final, savings };
};

/**
 * Format an ISO 8601 date as a long human-readable date.
 *
 * `formatDate("2026-04-01")` → `"April 1, 2026"`
 */
export const formatDate = (iso: string): string => {
  // Parse as UTC noon to avoid off-by-one timezone shifts on date-only ISO.
  const date = new Date(`${iso}T12:00:00Z`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

/**
 * Resolve a relative asset filename from the data layer (e.g.
 * `"placeholder.svg"`) into a full path under `/assets/{kind}/`.
 *
 * `resolveAsset("thunderbird.jpg", "items")` → `"/assets/items/thunderbird.jpg"`
 * `resolveAsset("sebastian.png", "artists")` → `"/assets/artists/sebastian.png"`
 */
export const resolveAsset = (
  path: string,
  kind: "items" | "artists",
): string => `/assets/${kind}/${path}`;
