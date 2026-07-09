"use client";

import { useCart } from "@/lib/cart";

export function AddToCartButton({ slug, name }: { slug: string; name: string }) {
  const { addLine } = useCart();
  return (
    <button
      type="button"
      className="product-card__cta"
      onClick={() => addLine(slug, "subscription")}
      aria-label={`Add ${name} monthly refill to cart`}
    >
      Add to cart
    </button>
  );
}
