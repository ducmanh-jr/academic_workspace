import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JRFN Algorithm",
  description: "Nền tảng học thuật toán có hệ thống",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
