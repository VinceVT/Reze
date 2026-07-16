import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/jost";
import "@fontsource-variable/spline-sans-mono";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "REZE — Reset. Restore. Rise.",
    template: "%s · REZE",
  },
  description:
    "Two daily rituals — Day capsules for energy and focus, a Night drink for sleep and recovery — formulated to work as one circadian system. Longevity support coming soon.",
};

export const viewport: Viewport = {
  themeColor: "#0c1424",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
