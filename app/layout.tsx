import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConsultationProvider } from "@/lib/consultation-context";
import { ConsultationModal } from "@/components/ui/ConsultationModal";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Flamestar Capital Limited",
  description:
    "Flamestar Capital Ltd is an investment management company delivering disciplined, data-driven strategies across fixed income, equities, and alternative investments in Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <ConsultationProvider>
          {children}
          <ConsultationModal />
        </ConsultationProvider>
      </body>
    </html>
  );
}
