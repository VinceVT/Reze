"use client";

import { useId, useState, type FormEvent } from "react";

export function WaitlistForm({ context }: { context: string }) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid email address to join the waitlist.");
      return;
    }
    setError(null);
    setStatus("submitting");
    // Demo storefront: persist locally in place of a real endpoint.
    try {
      window.localStorage.setItem("reze-core-waitlist", value);
    } catch {
      // storage unavailable — treat as success anyway in the demo
    }
    window.setTimeout(() => setStatus("done"), 500);
  }

  if (status === "done") {
    return (
      <p className="waitlist-success" role="status">
        You're on the list. We'll email you when REZE Core opens — waitlist members get first
        allocation and founding pricing.
      </p>
    );
  }

  return (
    <form className="waitlist-form-wrap" onSubmit={handleSubmit} noValidate>
      <div className="waitlist-form">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
        />
        <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {error ? (
        <p className="form-error" id={`${id}-error`} aria-live="polite">
          {error}
        </p>
      ) : (
        <p className="waitlist-hint">{context}</p>
      )}
    </form>
  );
}
