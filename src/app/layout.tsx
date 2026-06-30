import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import { NewsletterPopup } from '@/components/newsletter/newsletter-popup';
import { LiveChat } from "@/components/chat/live-chat";
import { ErrorBoundary } from "@/components/ui/error/error-boundary";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "CineTravel Airlines — Cinematic Travel Platform", template: "%s | CineTravel Airlines" },
  description: "Book flights to 150+ destinations worldwide. Premium airline experience with AI-powered planning, real-time tracking, and cinematic travel stories.",
  keywords: ["flights", "airline", "travel", "booking", "premium airline", "cinematic travel"],
  authors: [{ name: "CineTravel Airlines" }],
  creator: "CineTravel Airlines",
  publisher: "CineTravel Airlines",
  metadataBase: new URL("https://cinetravel.ai"),
  openGraph: {
    type: "website", locale: "en_US", siteName: "CineTravel Airlines",
    title: "CineTravel Airlines — Fly Beyond Expectations",
    description: "Premium airline experience with AI-powered planning, real-time tracking, and cinematic travel stories.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "CineTravel Airlines", description: "Fly Beyond Expectations" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        <Providers>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>
        <NewsletterPopup /><LiveChat />
      </body>
    </html>
  );
}
