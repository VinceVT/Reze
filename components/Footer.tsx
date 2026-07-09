import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container site-footer__inner">
        <div>
          <Link href="/" className="wordmark" aria-label="REZE home" translate="no">
            <span aria-hidden="true">REZE</span>
            <span className="wordmark__line" aria-hidden="true" />
          </Link>
          <p className="site-footer__tag">
            Reset. Restore. Rise. Two daily rituals — and soon a third — formulated to support your
            body around the clock.
          </p>
        </div>
        <nav aria-label="Shop">
          <h4>Shop</h4>
          <ul>
            <li>
              <Link href="/products/day">REZE Day</Link>
            </li>
            <li>
              <Link href="/products/night">REZE Night</Link>
            </li>
            <li>
              <Link href="/products/reset-duo">The Reset Duo</Link>
            </li>
            <li>
              <Link href="/products/core">REZE Core — coming soon</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/#science">Our approach</Link>
            </li>
            <li>
              <Link href="/#ritual">The ritual</Link>
            </li>
            <li>
              <a href="mailto:hello@reze.example">hello@reze.example</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container site-footer__legal">
        <p>
          *These statements have not been evaluated by the Food and Drug Administration. This
          product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
        <p>© {new Date().getFullYear()} REZE. Demo storefront — not a real store.</p>
      </div>
    </footer>
  );
}
