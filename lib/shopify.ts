import type { CartLine } from "./cart";

/*
 * Shopify checkout wiring — Storefront Cart API.
 *
 * The site keeps its own lightweight cart; at checkout we build a Shopify
 * cart via the Storefront API (cartCreate) and redirect the buyer to the
 * `checkoutUrl` it returns. Unlike a bare /cart/ permalink, a Storefront
 * cart line can carry a `sellingPlanId`, which is what turns the
 * "Monthly refill" option into an actual recurring subscription.
 *
 * Config comes from env vars (set them in Vercel → Project → Settings →
 * Environment Variables, and in a local .env.local):
 *   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN      e.g. "rezesupps.myshopify.com"
 *   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN  public Storefront API access token
 *   NEXT_PUBLIC_SHOPIFY_SELLING_PLAN_ID   selling plan GID for the monthly plan
 *
 * The Storefront API host is always the *.myshopify.com domain — that's where
 * the API lives. Which domain the buyer actually SEES at checkout
 * (rezesupps.myshopify.com vs. checkout.yourdomain.com) is controlled by
 * Shopify admin → Settings → Domains, not by this file.
 */

const STORE_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "rezesupps.myshopify.com";
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
const STOREFRONT_API_VERSION = "2025-07";

/*
 * Selling plan GID for the monthly subscription plan. Create the plan in the
 * Shopify Subscriptions app (0% discount — the "Monthly refill" variants are
 * already priced at the discounted rate, so a plan discount here would stack),
 * apply it to REZE Day, Night, and The Reset Duo, then set
 * NEXT_PUBLIC_SHOPIFY_SELLING_PLAN_ID to its GID. Until it's set, subscription
 * lines still check out — just as a one-time purchase of the discounted variant.
 */
const SELLING_PLAN_ID = process.env.NEXT_PUBLIC_SHOPIFY_SELLING_PLAN_ID ?? "";

type VariantMap = Record<"subscription" | "one-time", string>;

/*
 * Shopify variant GIDs.
 *   REZE Day       one-time 49809698390258 · monthly 49809698423026
 *   REZE Night     one-time 49809698455794 · monthly 49809698488562
 *   The Reset Duo  one-time 49809698521330 · monthly 49809698554098
 */
export const shopifyVariants: Record<string, VariantMap> = {
  day: {
    subscription: "gid://shopify/ProductVariant/49809698423026",
    "one-time": "gid://shopify/ProductVariant/49809698390258",
  },
  night: {
    subscription: "gid://shopify/ProductVariant/49809698488562",
    "one-time": "gid://shopify/ProductVariant/49809698455794",
  },
  "reset-duo": {
    subscription: "gid://shopify/ProductVariant/49809698554098",
    "one-time": "gid://shopify/ProductVariant/49809698521330",
  },
};

export function isShopifyConfigured(): boolean {
  return STORE_DOMAIN.length > 0 && STOREFRONT_TOKEN.length > 0;
}

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
};

const CART_CREATE = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }
`;

/**
 * Build a Shopify cart for the given lines and return its hosted checkout URL,
 * or null if checkout isn't configured or a line can't be mapped. Subscription
 * lines carry the monthly selling plan so they bill recurringly.
 */
export async function createCheckoutUrl(lines: CartLine[]): Promise<string | null> {
  if (!isShopifyConfigured() || lines.length === 0) return null;

  const cartLines: CartLineInput[] = [];
  for (const line of lines) {
    const variantId = shopifyVariants[line.slug]?.[line.kind];
    if (!variantId) return null;
    const input: CartLineInput = { merchandiseId: variantId, quantity: line.qty };
    if (line.kind === "subscription" && SELLING_PLAN_ID) {
      input.sellingPlanId = SELLING_PLAN_ID;
    }
    cartLines.push(input);
  }

  try {
    const res = await fetch(
      `https://${STORE_DOMAIN}/api/${STOREFRONT_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: CART_CREATE, variables: { lines: cartLines } }),
      }
    );
    if (!res.ok) {
      console.error("Shopify cartCreate failed:", res.status, await res.text());
      return null;
    }
    const json = await res.json();
    const result = json?.data?.cartCreate;
    if (result?.userErrors?.length) {
      console.error("Shopify cartCreate userErrors:", result.userErrors);
      return null;
    }
    return result?.cart?.checkoutUrl ?? null;
  } catch (err) {
    console.error("Shopify cartCreate error:", err);
    return null;
  }
}
