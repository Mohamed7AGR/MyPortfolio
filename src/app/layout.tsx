import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "@/../utils/ScrollToTopButton";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://mohamed-hager-portfolio.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/Logo.png",
    apple: "/Logo.png",
  },
  title: "Mohamed Hager | Frontend Developer",
  description:
    "Explore the portfolio of Mohamed Hager, a Frontend Developer with one year of experience, specializing in Next.js, React, and modern web solutions. Built for performance and user experience.",
  keywords: [
    "Mohamed Hager",
    "Frontend Developer",
    "Next.js Portfolio",
    "React Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Mohamed Hager" }],
  openGraph: {
    title: "Mohamed Hager | Personal Portfolio",
    description:
      "Frontend Developer — Building the future of the web with React and Next.js.",
    url: baseUrl,
    siteName: "Mohamed Hager Portfolio",
    images: [
      {
        url: "/Website-overview.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Hager Portfolio Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Hager | Frontend Developer",
    description: "Building modern web applications with React and Next.js.",
    images: ["/Website-overview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden ">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden`}
      >
        <Navbar />
        <main className="text-white w-full max-w-full min-w-0 pt-20 md:pt-24 overflow-x-hidden">
          {children}
        </main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
