import Link from "next/link";
import { products } from "@/lib/products";
import { BoxFront, Capsules, Packet, ProductArt } from "@/components/ProductArt";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Reveal } from "@/components/Reveal";

const buyable = products.filter((p) => !p.comingSoon);
const core = products.find((p) => p.slug === "core")!;

export default function HomePage() {
  return (
    <>
      {/* Hero: the day→night split, same axis as the packaging meridian */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <p className="eyebrow hero__kicker">A circadian supplement system</p>
            <h1>
              Reset. Restore. <em>Rise.</em>
            </h1>
            <p className="hero__lede">
              Two daily rituals — morning capsules for waking, an evening pour for sleep —
              formulated at clinical doses to work as a single system. Because a better morning
              starts the night before.
            </p>
            <div className="hero__actions">
              <Link href="/products/reset-duo" className="btn btn--primary">
                Build your system
              </Link>
              <Link href="/#system" className="btn btn--ghost">
                Explore formulas
              </Link>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
            <BoxFront accent="day" width={180} label="Day" sublabel="Daily Support*" />
            <BoxFront
              accent="night"
              width={180}
              label="Night"
              sublabel="Nighttime Support*"
              className="float-night"
            />
          </div>
        </div>
      </section>

      <div className="strip" aria-label="Product standards">
        <div className="container strip__inner">
          <span>Melatonin-free</span>
          <span>Stimulant-free</span>
          <span>Clinical doses, printed on the box</span>
          <span>Third-party tested</span>
        </div>
      </div>

      {/* The system */}
      <section className="section" aria-labelledby="system-heading">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">The system</p>
            <h2 id="system-heading">Every hour, accounted for.</h2>
            <p>
              Start with one ritual or run the full system. Each box holds a month of doses — two
              capsules at sunrise, one 10-gram pour at night.
            </p>
          </div>

          <div className="system-grid">
            {buyable.map((product, i) => (
              <Reveal key={product.slug} delay={i * 90}>
                <article className={`product-card product-card--${product.accent}`}>
                  <div className="product-card__art" aria-hidden="true">
                    <ProductArt accent={product.accent} />
                  </div>
                  <div className="product-card__body">
                    <p className={`eyebrow eyebrow--${product.accent}`}>{product.tagline}</p>
                    <h3>
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="product-card__desc">{product.description}</p>
                    <div className="product-card__meta">
                      <p className="product-card__price price">
                        ${product.priceSubscription}/mo
                        <small>or ${product.priceOneTime} one-time</small>
                      </p>
                      <AddToCartButton slug={product.slug} name={product.name} />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <aside className="core-teaser on-dark" aria-labelledby="core-teaser-heading">
              <div>
                <p className="eyebrow eyebrow--core">Coming soon · {core.tagline}</p>
                <h3 id="core-teaser-heading">REZE Core — NAD+ &amp; liposomal glutathione</h3>
                <p>
                  The third formulation: the two molecules your cells spend down as you age, in one
                  daily packet. Waitlist members get first allocation.
                </p>
              </div>
              <Link href="/products/core" className="btn btn--ghost">
                Join the waitlist
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Ritual: the page itself travels from day to night */}
      <section className="ritual" id="ritual" aria-labelledby="ritual-heading">
        <div className="ritual__spine" aria-hidden="true" />
        <div className="container ritual__inner">
          <div className="ritual__head">
            <p className="eyebrow">The ritual</p>
            <h2 id="ritual-heading">One line through your day.</h2>
          </div>

          <Reveal>
            <div className="moment">
              <div className="moment__art" aria-hidden="true">
                <Capsules width={150} />
              </div>
              <div className="moment__copy">
                <span className="moment__time">07:10 — WITHIN AN HOUR OF WAKING</span>
                <h3>Day, two capsules</h3>
                <p>
                  Lion&rsquo;s mane, rhodiola, and a methylated B-complex meet your cortisol peak —
                  steady focus that doesn&rsquo;t ask caffeine to do all the work.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="moment moment--flip">
              <div className="moment__art" aria-hidden="true">
                <BoxFront accent="day" width={150} label="Day" sublabel="Daily Support*" />
              </div>
              <div className="moment__copy">
                <span className="moment__time">15:00 — THE AFTERNOON DIP</span>
                <h3>No crash to recover from</h3>
                <p>
                  Because the morning ran on adaptogens rather than stimulants, there is no spike
                  to fall off. The dip flattens out over weeks of consistent use.*
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="moment moment--dark">
              <div className="moment__art" aria-hidden="true">
                <Packet accent="night" label="Night" grams="10G" width={86} />
              </div>
              <div className="moment__copy">
                <span className="moment__time">22:30 — SCREENS OFF</span>
                <h3>Night, as the wind-down</h3>
                <p>
                  Magnesium bisglycinate, three grams of glycine, and apigenin lower the
                  temperature on a racing mind — no melatonin, no morning fog.*
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="moment moment--flip moment--dark">
              <div className="moment__art" aria-hidden="true">
                <BoxFront accent="night" width={150} label="Night" sublabel="Nighttime Support*" />
              </div>
              <div className="moment__copy">
                <span className="moment__time">02:00 — DEEP SLEEP</span>
                <h3>Recovery is the product</h3>
                <p>
                  Glycine and tart cherry support the deep-sleep stages where tissue repairs and
                  memory consolidates. Tomorrow&rsquo;s Day packet starts working tonight.*
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Science */}
      <section className="section science on-dark" id="science" aria-labelledby="science-heading">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Formulated, not blended</p>
            <h2 id="science-heading">The boring rigor behind the box.</h2>
            <p>
              No proprietary blends, no pixie dusting. Every ingredient appears at the dose it was
              studied at — and the dose is printed on the box.
            </p>
          </div>
          <div className="science-grid">
            <Reveal>
              <div className="tenet">
                <p className="tenet__num">01 / DOSE</p>
                <h3>Clinical doses only</h3>
                <p>
                  If the research used 300&nbsp;mg, the formula has 300&nbsp;mg. An underdosed
                  ingredient is marketing, not formulation — so we&rsquo;d rather leave it out.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="tenet">
                <p className="tenet__num">02 / FORM</p>
                <h3>Forms that absorb</h3>
                <p>
                  Magnesium as bisglycinate, B-vitamins methylated, glutathione liposomal. The form
                  decides whether an ingredient reaches your cells or your plumbing.
                </p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="tenet">
                <p className="tenet__num">03 / PROOF</p>
                <h3>Tested by strangers</h3>
                <p>
                  Every lot is verified by an independent lab for identity, dose accuracy, heavy
                  metals, and microbes. Certificates ship with every box.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core waitlist */}
      <section className="section corewait on-dark" aria-labelledby="corewait-heading">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow eyebrow--core">Next from REZE</p>
            <h2 id="corewait-heading">Core: longevity, made daily.</h2>
            <p>
              NMN to restore the NAD+ your cells burn making energy, liposomal glutathione to clean
              up after it. In final testing now.
            </p>
          </div>
          <WaitlistForm context="First allocation and founding pricing. No spam — launch news only." />
        </div>
      </section>
    </>
  );
}
