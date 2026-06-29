import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import { LiveChat } from "@/components/chat/live-chat";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "CineTravel AI — Cinematic Exploration Platform",
  description: "Discover destinations like scenes from a film.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        <Providers>{children}</Providers>
        <LiveChat />
      </body>
    </html>
  );
}