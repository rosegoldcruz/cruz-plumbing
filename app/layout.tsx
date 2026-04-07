import type { Metadata, Viewport } from "next";
import { Archivo_Narrow, Sora } from "next/font/google";
import "./globals.css";

const bodyFont = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const displayFont = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cruz Plumbing | Trusted Family Plumbing – Avondale, Goodyear & West Valley AZ",
  description:
    "Family-owned, licensed & insured plumbing in Avondale, Goodyear, and surrounding West Valley communities. Fast response, honest pricing, respectful in-home service. Call 24/7.",
  keywords: "plumbing Avondale AZ, Goodyear plumber, emergency plumbing West Valley, Cruz Plumbing, licensed plumber Arizona",
  openGraph: {
    title: "Cruz Plumbing | Trusted Family Plumbing",
    description: "Fast response. Honest work. Real people who treat you like family.",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Cruz Plumbing",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
