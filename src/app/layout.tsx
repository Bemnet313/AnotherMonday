import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Another MONday! | Weekly Whiteboard",
  description: "Digital weekly whiteboard for Bemnet & Nati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen font-sans antialiased bg-[var(--bg-deep)] text-cream">
        {children}
      </body>
    </html>
  );
}
