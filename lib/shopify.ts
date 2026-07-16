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

export const shopifyVariants: Record<string, VariantMap> = {
  // day:        { subscription: "", "one-time": "" },
  // night:      { subscription: "", "one-time": "" },
  // "reset-duo": { subscription: "", "one-time": "" },
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
