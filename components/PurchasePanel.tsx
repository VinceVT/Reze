"use client";

import { useState } from "react";
import { useCart, type PurchaseKind } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function PurchasePanel({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [kind, setKind] = useState<PurchaseKind>("subscription");
  const monthly = product.priceSubscription;
  const once = product.priceOneTime;

  return (
    <div className="purchase">
      <fieldset>
        <legend>Choose your plan</legend>

        <label className="plan-option">
          <input
            type="radio"
            name={`plan-${product.slug}`}
            value="subscription"
            checked={kind === "subscription"}
            onChange={() => setKind("subscription")}
          />
          <span className="plan-option__label">
            <strong>Monthly refill</strong>
            <small>Delivered every 30 days · pause or cancel anytime</small>
          </span>
          <span className="plan-option__price price">
            ${monthly}/mo
            <s aria-label={`Regular price $${once}`}>${once}</s>
          </span>
        </label>

        <label className="plan-option">
          <input
            type="radio"
            name={`plan-${product.slug}`}
            value="one-time"
            checked={kind === "one-time"}
            onChange={() => setKind("one-time")}
          />
          <span className="plan-option__label">
            <strong>One-time purchase</strong>
            <small>{product.format}</small>
          </span>
          <span className="plan-option__price price">${once}</span>
        </label>
      </fieldset>

      <button
        type="button"
        className="btn btn--primary purchase__cta"
        onClick={() => addLine(product.slug, kind)}
      >
        Add to cart — <span className="price">${kind === "subscription" ? monthly : once}</span>
      </button>

      <p className="purchase__meta">
        <span>Free shipping</span>
        <span>30-night guarantee</span>
        <span>3rd-party tested</span>
      </p>
    </div>
  );
}
