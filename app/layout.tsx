import type React from "react";
import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasyakuran Angkatan 30 - Undangan",
  description: "Undangan Tasyakuran Angkatan 30 Pesantren Terpadu Albidayah",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={amiri.className}>{children}</body>
    </html>
  );
}
