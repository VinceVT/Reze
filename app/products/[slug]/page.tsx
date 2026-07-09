import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products } from "@/lib/products";
import { ProductArt } from "@/components/ProductArt";
import { PurchasePanel } from "@/components/PurchasePanel";
import { WaitlistForm } from "@/components/WaitlistForm";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const crossSell = products.filter((p) => p.slug !== product.slug && !p.comingSoon).slice(0, 3);
  const accentClass =
    product.accent === "night" || product.accent === "core"
      ? `pdp--${product.accent} pdp--${product.accent}-accent`
      : product.accent === "day"
        ? "pdp--day"
        : "";

  return (
    <div className={`pdp ${accentClass}`}>
      <div className="container pdp__crumb">
        <Link href="/#system">← All formulas</Link>
      </div>

      <div className="container pdp__grid">
        <div className="pdp__stage" role="img" aria-label={`${product.name} packaging`}>
          <ProductArt accent={product.accent} size="stage" />
        </div>

        <div className="pdp__info">
          <p className={`eyebrow eyebrow--${product.accent}`}>
            {product.comingSoon ? `Coming soon · ${product.tagline}` : product.tagline} ·{" "}
            {product.format}
          </p>
          <h1>{product.name}</h1>
          <p className="pdp__desc">{product.description}</p>

          <ul className="pdp__benefits">
            {product.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          {product.comingSoon ? (
            <div className="purchase" style={{ background: "transparent" }}>
              <p className="eyebrow eyebrow--core">Expected pricing</p>
              <p style={{ marginTop: 10 }} className="price">
                ${product.priceSubscription}/mo on subscription · ${product.priceOneTime} one-time
              </p>
              <p style={{ marginTop: 16, color: "var(--ink-soft)", fontSize: "0.95rem" }}>
                Core is in final third-party testing. Join the waitlist for first allocation and
                founding-member pricing, locked for life.
              </p>
              <div style={{ marginTop: 4 }} className="on-dark-form-light">
                <WaitlistForm context="Launch news only — typically one email a month." />
              </div>
            </div>
          ) : (
            <PurchasePanel product={product} />
          )}
        </div>
      </div>

      {/* Ingredients */}
      <section
        className={`ingredients on-dark${product.accent === "night" ? " ingredients--night" : ""}`}
        aria-labelledby="ingredients-heading"
      >
        <div className="container">
          <div className="section__head">
            <p className={`eyebrow eyebrow--${product.accent}`}>Inside every packet</p>
            <h2 id="ingredients-heading">Full label, full doses.</h2>
            <p>No proprietary blends — every dose printed here is printed on the box.</p>
          </div>
          <div className="ingredient-list">
            {product.ingredients.map((ing) => (
              <Reveal key={ing.name} className="ingredient-reveal">
                <div className="ingredient">
                  <p className="ingredient__name">{ing.name}</p>
                  <p className="ingredient__dose">{ing.dose}</p>
                  <p className="ingredient__why">{ing.purpose}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual */}
      <section className="pdp-ritual" aria-labelledby="ritual-heading">
        <div className="container">
          <div
            className="meridian"
            style={{
              background:
                product.accent === "night"
                  ? "var(--meridian-night)"
                  : product.accent === "core"
                    ? "var(--meridian-core)"
                    : "var(--meridian-day)",
            }}
            aria-hidden="true"
          />
          <figure>
            <h2 className="sr-only" id="ritual-heading">
              How to take it
            </h2>
            <blockquote>{product.ritual}</blockquote>
            <figcaption>The ritual</figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-heading">Asked and answered.</h2>
          </div>
          <div className="faq__list">
            {product.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="crosssell" aria-labelledby="crosssell-heading">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Completes the system</p>
            <h2 id="crosssell-heading">Works better together.</h2>
          </div>
          <div className="system-grid">
            {crossSell.map((p) => (
              <article key={p.slug} className={`product-card product-card--${p.accent}`}>
                <div className="product-card__art" aria-hidden="true">
                  <ProductArt accent={p.accent} />
                </div>
                <div className="product-card__body">
                  <p className={`eyebrow eyebrow--${p.accent}`}>{p.tagline}</p>
                  <h3>
                    <Link href={`/products/${p.slug}`}>{p.name}</Link>
                  </h3>
                  <p className="product-card__desc">{p.description}</p>
                  <div className="product-card__meta">
                    <p className="product-card__price price">
                      ${p.priceSubscription}/mo
                      <small>or ${p.priceOneTime} one-time</small>
                    </p>
                    <AddToCartButton slug={p.slug} name={p.name} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
