import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { CircularityAssistant } from "@/components/layout/circularity-assistant";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoLoop | Circular OS",
  description: "Track, repair, and redistribute internal assets to prevent waste and save costs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex h-full bg-background text-foreground overflow-hidden">
        <Sidebar aria-label="Main navigation" />
        <main className="flex-1 overflow-y-auto relative" role="main">
          {children}
          <CircularityAssistant />
          <Toaster position="top-center" />
        </main>
      </body>
    </html>
  );
}

