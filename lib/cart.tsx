"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "./products";

export type PurchaseKind = "subscription" | "one-time";

export type CartLine = {
  slug: string;
  kind: PurchaseKind;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  addLine: (slug: string, kind: PurchaseKind) => void;
  removeLine: (slug: string, kind: PurchaseKind) => void;
  setQty: (slug: string, kind: PurchaseKind, qty: number) => void;
  count: number;
  subtotal: number;
  announcement: string;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "reze-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartLine[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(parsed.filter((l) => getProduct(l.slug) && l.qty > 0));
        }
      }
    } catch {
      // ignore corrupt storage
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage may be unavailable; cart still works in memory
    }
  }, [lines]);

  const addLine = useCallback((slug: string, kind: PurchaseKind) => {
    const product = getProduct(slug);
    if (!product || product.comingSoon) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.kind === kind);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug && l.kind === kind ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [...prev, { slug, kind, qty: 1 }];
    });
    setAnnouncement(`${product.name} added to cart`);
    setOpen(true);
  }, []);

  const removeLine = useCallback((slug: string, kind: PurchaseKind) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.kind === kind)));
  }, []);

  const setQty = useCallback((slug: string, kind: PurchaseKind, qty: number) => {
    if (qty <= 0) {
      setLines((prev) => prev.filter((l) => !(l.slug === slug && l.kind === kind)));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.slug === slug && l.kind === kind ? { ...l, qty } : l))
    );
  }, []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = getProduct(line.slug);
      if (!product) continue;
      count += line.qty;
      subtotal +=
        line.qty *
        (line.kind === "subscription" ? product.priceSubscription : product.priceOneTime);
    }
    return { count, subtotal };
  }, [lines]);

  const value = useMemo(
    () => ({ lines, open, setOpen, addLine, removeLine, setQty, count, subtotal, announcement }),
    [lines, open, addLine, removeLine, setQty, count, subtotal, announcement]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
