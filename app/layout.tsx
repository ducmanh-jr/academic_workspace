import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "JRFN Learning OS",
  description: "Workspace học tập đa lĩnh vực với lessons, practice, projects và progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
