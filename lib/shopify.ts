import type { CartLine } from "./cart";

/*
 * Shopify checkout wiring.
 *
 * The site keeps its own lightweight cart; at checkout we hand the cart to
 * Shopify using a cart permalink:
 *   https://{SHOPIFY_DOMAIN}/cart/{variantId}:{qty},{variantId}:{qty}
 * which lands the buyer directly on Shopify's hosted checkout.
 *
 * Each product below maps to a Shopify product with two variants:
 * "Monthly refill" (subscription price) and "One-time" (full price).
 * The numeric IDs are Shopify variant IDs (the tail of the variant GID).
 */

export const SHOPIFY_DOMAIN = "rezesupps.myshopify.com";

type VariantMap = Partial<Record<"subscription" | "one-time", string>>;

/*
 * Numeric variant IDs (the tail of each gid://shopify/ProductVariant/… GID):
 *   REZE Day       product 9170022138098 · one-time 49809698390258 · monthly 49809698423026
 *   REZE Night     product 9170022170866 · one-time 49809698455794 · monthly 49809698488562
 *   The Reset Duo  product 9170022203634 · one-time 49809698521330 · monthly 49809698554098
 */
export const shopifyVariants: Record<string, VariantMap> = {
  day: { subscription: "49809698423026", "one-time": "49809698390258" },
  night: { subscription: "49809698488562", "one-time": "49809698455794" },
  "reset-duo": { subscription: "49809698554098", "one-time": "49809698521330" },
};

export function isShopifyConfigured(): boolean {
  return SHOPIFY_DOMAIN.length > 0 && Object.keys(shopifyVariants).length > 0;
}

/** Build a Shopify cart permalink for the given lines, or null if any line is unmapped. */
export function shopifyCheckoutUrl(lines: CartLine[]): string | null {
  if (!isShopifyConfigured() || lines.length === 0) return null;
  const parts: string[] = [];
  for (const line of lines) {
    const variantId = shopifyVariants[line.slug]?.[line.kind];
    if (!variantId) return null;
    parts.push(`${variantId}:${line.qty}`);
  }
  return `https://${SHOPIFY_DOMAIN}/cart/${parts.join(",")}`;
}
