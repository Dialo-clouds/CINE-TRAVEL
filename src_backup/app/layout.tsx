import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/providers";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  title: "CineTravel AI — Cinematic Exploration Platform",
  description: "Discover destinations like scenes from a film.",
};

export const viewport: Viewport = {
  themeColor: "#070B14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`} suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500,400&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#070B14] text-[#F8FAFC] antialiased overflow-x-hidden">
        <Providers>
          <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)]" />
          </div>
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
