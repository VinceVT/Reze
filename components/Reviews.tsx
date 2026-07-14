"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { seedReviews, type Rating, type Review } from "@/lib/reviews";

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-hidden="true" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= full ? "star star--on" : "star"}>
          ★
        </span>
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(iso));
}

export function Reviews({ slug, productName }: { slug: string; productName: string }) {
  const storageKey = `reze-reviews-${slug}`;
  const formId = useId();
  const [added, setAdded] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState<Rating | null>(null);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed: Review[] = JSON.parse(raw);
        if (Array.isArray(parsed)) setAdded(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
    // storageKey is stable per mount (derived from the product slug prop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const all = useMemo(() => [...added, ...(seedReviews[slug] ?? [])], [added, slug]);
  const average = all.length ? all.reduce((sum, r) => sum + r.rating, 0) / all.length : 0;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedBody = body.trim();
    if (!trimmedName || !trimmedBody || !rating) {
      setError("Add your name, a rating, and a few words before submitting.");
      return;
    }
    setError(null);
    const review: Review = {
      id: `local-${Date.now()}`,
      name: trimmedName,
      rating,
      body: trimmedBody,
      date: new Date().toISOString(),
      verified: false,
    };
    const next = [review, ...added];
    setAdded(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // storage unavailable; review still shows for this session
    }
    setName("");
    setRating(null);
    setBody("");
    setFormOpen(false);
    setAnnouncement("Thanks — your review has been posted.");
  }

  return (
    <section className="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews__head">
          <div className="section__head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Reviews</p>
            <h2 id="reviews-heading">What people are saying.</h2>
          </div>
          {all.length > 0 && (
            <div className="reviews__summary">
              <Stars rating={average} size={22} />
              <p>
                <strong>{average.toFixed(1)}</strong> out of 5
                <span className="reviews__count"> · {all.length} review{all.length === 1 ? "" : "s"}</span>
              </p>
            </div>
          )}
        </div>

        {all.length === 0 && (
          <p className="reviews__empty">No reviews yet — be the first to share your experience with {productName}.</p>
        )}

        {all.length > 0 && (
          <ul className="review-list">
            {all.map((r) => (
              <li key={r.id} className="review-card">
                <div className="review-card__head">
                  <Stars rating={r.rating} />
                  <span className="review-card__name">{r.name}</span>
                  {r.verified && <span className="review-card__verified">Verified buyer</span>}
                </div>
                <p className="review-card__body">{r.body}</p>
                <p className="review-card__date">{formatDate(r.date)}</p>
              </li>
            ))}
          </ul>
        )}

        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>

        {!formOpen ? (
          <button type="button" className="btn btn--ghost" onClick={() => setFormOpen(true)}>
            Write a review
          </button>
        ) : (
          <form className="review-form" onSubmit={handleSubmit} noValidate aria-label={`Review ${productName}`}>
            <fieldset className="star-input" role="radiogroup" aria-label="Your rating">
              {([5, 4, 3, 2, 1] as Rating[]).map((n) => {
                const id = `${formId}-star-${n}`;
                return (
                  <span key={n} className="star-input__item">
                    <input
                      type="radio"
                      id={id}
                      name={`${formId}-rating`}
                      value={n}
                      checked={rating === n}
                      onChange={() => setRating(n)}
                    />
                    <label htmlFor={id}>
                      <span className="sr-only">
                        {n} star{n === 1 ? "" : "s"}
                      </span>
                      <span aria-hidden="true">★</span>
                    </label>
                  </span>
                );
              })}
            </fieldset>

            <label className="review-form__field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jamie R…"
              />
            </label>

            <label className="review-form__field">
              <span>Your review</span>
              <textarea
                name="body"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="How has it worked for you…"
              />
            </label>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <div className="review-form__actions">
              <button type="submit" className="btn btn--primary">
                Post review
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => setFormOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
