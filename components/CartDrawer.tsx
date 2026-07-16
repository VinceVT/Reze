"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { createCheckoutUrl } from "@/lib/shopify";
import { ProductArt } from "./ProductArt";

export function CartDrawer() {
  const { lines, open, setOpen, removeLine, setQty, subtotal } = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="cart-dialog"
      aria-label="Shopping cart"
      onClose={() => setOpen(false)}
      onClick={(e) => {
        // click on the backdrop closes; clicks inside the panel don't
        if (e.target === ref.current) setOpen(false);
      }}
    >
      <div className="cart__head">
        <h2>Your cart</h2>
        <button
          type="button"
          className="cart__close"
          onClick={() => setOpen(false)}
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      <div className="cart__body">
        {lines.length === 0 ? (
          <div className="cart__empty">
            <p>Your cart is empty.</p>
            <Link href="/#system" className="btn btn--ghost" onClick={() => setOpen(false)}>
              Explore the system
            </Link>
          </div>
        ) : (
          lines.map((line) => {
            const product = getProduct(line.slug);
            if (!product) return null;
            const unit =
              line.kind === "subscription" ? product.priceSubscription : product.priceOneTime;
            return (
              <div className="cart-line" key={`${line.slug}-${line.kind}`}>
                <div className="cart-line__thumb" aria-hidden="true">
                  <ProductArt accent={product.accent} size="thumb" />
                </div>
                <div>
                  <p className="cart-line__name">{product.name}</p>
                  <p className="cart-line__kind">
                    {line.kind === "subscription" ? "Monthly refill" : "One-time"} · {product.format}
                  </p>
                  <div className="cart-line__qty">
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.kind, line.qty - 1)}
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      −
                    </button>
                    <span aria-live="polite">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.kind, line.qty + 1)}
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-line__right">
                  <span className="cart-line__price price">${unit * line.qty}</span>
                  <button
                    type="button"
                    className="cart-line__remove"
                    onClick={() => removeLine(line.slug, line.kind)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {lines.length > 0 && (
        <div className="cart__foot">
          <p className="cart__subtotal">
            <span>Subtotal</span>
            <span className="price">${subtotal}</span>
          </p>
          <p className="cart__note">Free carbon-neutral shipping. Pause or cancel anytime.</p>
          <button
            type="button"
            className="btn btn--primary cart__checkout"
            disabled={checkingOut}
            onClick={async () => {
              if (checkingOut) return;
              setCheckingOut(true);
              try {
                const url = await createCheckoutUrl(lines);
                if (url) {
                  window.location.assign(url);
                } else {
                  window.alert("Checkout isn't connected yet — the Shopify store link is coming soon.");
                }
              } finally {
                setCheckingOut(false);
              }
            }}
          >
            {checkingOut ? "Preparing checkout…" : "Continue to checkout"}
          </button>
        </div>
      )}
    </dialog>
  );
}
