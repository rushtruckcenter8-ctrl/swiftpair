import { Quicksand } from "next/font/google";
import "./globals.css";
import { ShipmentProvider } from "@/contexts/ShipmentContext";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "sonner";
import Script from "next/script";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.swiftpairlogistics.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "SwiftPair Logistics — Global Freight, Delivered.",
    template: "%s | SwiftPair Logistics",
  },
  description:
    "From local parcels to international freight — SwiftPair Logistics ships to 220+ destinations with real-time tracking, air, ocean, and road freight solutions.",
  keywords: [
    "international shipping",
    "logistics company",
    "track shipment",
    "express courier",
    "warehouse solutions",
    "freight forwarding",
    "global logistics",
    "package tracking",
    "international transport",
    "supply chain management",
    "air freight",
    "ocean freight",
    "road freight",
    "SwiftPair Logistics",
  ],
  authors: [{ name: "SwiftPair Logistics" }],
  creator: "SwiftPair Logistics",
  publisher: "SwiftPair Logistics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SwiftPair Logistics",
    title: "SwiftPair Logistics — Move Anything, Anywhere",
    description:
      "220+ destinations. 30 years of experience. 98% on-time delivery. SwiftPair Logistics.",
    images: [
      {
        url: "/images/track_logo.png",
        width: 1200,
        height: 630,
        alt: "SwiftPair Logistics Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftPair Logistics — Move Anything, Anywhere",
    description:
      "Fast, reliable freight across 220+ destinations worldwide.",
    images: ["/images/track_logo.png"],
    creator: "@swiftpairlogistics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/track_logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/track_logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/track_logo.png",
    apple: "/images/track_logo.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "Logistics & Transportation",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SwiftPair Logistics",
    url: siteUrl,
    logo: `${siteUrl}/images/track_logo.png`,
    description: "International Transport and Logistics Company",
    contactPoint: {
      "@type": "ContactPoint",
      // telephone: "+1-630-392-6723",
      contactType: "Customer Service",
      email: "contact@swiftpairlogistics.com",
      availableLanguage: ["English"],
    },
    sameAs: [
      // Add social media links when available
      // "https://www.facebook.com/swifttrackexpress",
      // "https://www.twitter.com/swifttrackexpress",
      // "https://www.linkedin.com/company/swifttrackexpress",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Logistics and Transportation",
    provider: {
      "@type": "Organization",
      name: "SwiftPair Logistics",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteUrl,
      serviceType: "Online",
    },
  };

  return (
    <html lang="en" className={quicksand.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/track_logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/track_logo.png"
        />
        <link rel="shortcut icon" href="/images/track_logo.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/track_logo.png"
        />
        <meta name="theme-color" content="#f97316" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <cript
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body className={quicksand.className}>
        <ShipmentProvider>
          <Toaster position="top-right" richColors />
          {children}
          <Script src="//code.jivosite.com/widget/J3iDSeoWaG" async ></Script>
        </ShipmentProvider>
      </body>
    </html>
  );
}
