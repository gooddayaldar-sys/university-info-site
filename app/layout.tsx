import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Их Сургууль | Мэдээллийн портал",
  description: "Их сургуулийн мэдээ, зарлал, элсэлтийн мэдээлэл",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
