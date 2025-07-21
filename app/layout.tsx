import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NotificationPermission } from "@/components/NotificationPermission";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Educamer",
  description: "Application Educamer PWA",
  icons: {
    icon: "/logo-educamer.svg",
    shortcut: "/logo-educamer.svg",
    apple: "/logo-educamer.svg",
  },
  openGraph: {
    images: ["/logo-educamer.svg"],
  },
  twitter: {
    images: ["/logo-educamer.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NotificationPermission />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
