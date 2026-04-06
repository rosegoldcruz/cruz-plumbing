import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
