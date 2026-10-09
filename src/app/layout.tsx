import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Fraunces, Kalam } from "next/font/google";
import * as React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeUrlSync } from "@/components/theme/ThemeUrlSync";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { FloatingDock } from "@/components/dock/FloatingDock";
import { RouteTransitionLoader } from "@/components/ui/RouteTransitionLoader";
import { ThemeTransitionLoader } from "@/components/ui/ThemeTransitionLoader";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammed Rashid | Full Stack & Distributed Systems Developer",
  description:
    "Portfolio of Muhammed Rashid, Full Stack Developer from Kerala. Building performant web applications and distributed systems with Next.js, Node.js, PostgreSQL, MongoDB, Redis, and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${jetbrainsMono.variable} ${fraunces.variable} ${kalam.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const params = new URLSearchParams(window.location.search);
                const themeParam = params.get('theme');
                if (themeParam === 'light' || themeParam === 'dark') {
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(themeParam);
                  localStorage.setItem('theme', themeParam);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-[var(--accent)] selection:text-white font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={true}
        >
          <React.Suspense fallback={null}>
            <ThemeUrlSync />
            <RouteTransitionLoader />
          </React.Suspense>
          <ThemeTransitionLoader />
          <NoiseOverlay />
          <main className="relative w-full flex flex-col">
            {children}
          </main>
          <FloatingDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
