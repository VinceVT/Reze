"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

const nav = [
  { href: "/products/day", label: "Day" },
  { href: "/products/night", label: "Night" },
  { href: "/products/reset-duo", label: "The Duo" },
  { href: "/products/core", label: "Core", core: true },
];

export function Header() {
  const { count, setOpen, announcement } = useCart();
  const pathname = usePathname();

  return (
    <header className="site-header on-dark">
      <div className="container site-header__inner">
        <a href="https://rezehealth.com" className="wordmark" aria-label="REZE home" translate="no">
          <span aria-hidden="true">REZE</span>
          <span className="wordmark__line" aria-hidden="true" />
        </a>

        <nav className="site-nav" aria-label="Products">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.core ? "site-nav__core" : undefined}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="cart-button"
          onClick={() => setOpen(true)}
          aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
        >
          <span className="cart-button__label">Cart</span>
          <span className="cart-button__count" aria-hidden="true">
            {count}
          </span>
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </header>
  );
}
