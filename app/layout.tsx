import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";
import { FooterYear } from "@/components/FooterYear";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.batesstamp.pro";
const SITE_TITLE = "Free Bates Numbering for PDFs — In-Browser, No Upload";
const SITE_DESCRIPTION =
  "Add Bates numbers to PDFs entirely in your browser. No uploads, no accounts, no cost. Built for paralegals handling discovery production.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "bates numbering",
    "bates stamp",
    "bates numbering software",
    "free bates numbering",
    "bates stamp pdf",
    "client-side bates",
    "bates numbering for paralegals",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "BatesStamp",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BatesStamp — free in-browser Bates numbering for PDFs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aamannbhagat",
    creator: "@aamannbhagat",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BatesStamp",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BatesStamp",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: SITE_DESCRIPTION,
  softwareVersion: "1.0",
  author: { "@type": "Organization", name: "BatesStamp", url: SITE_URL },
  screenshot: `${SITE_URL}/og-image.png`,
  featureList: [
    "Bates numbering with custom prefix and padding",
    "Six position presets",
    "Batch processing of multiple PDFs",
    "100% in-browser — files never uploaded",
    "Works offline once loaded",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NYKSXND9QM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NYKSXND9QM');
          `}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Skip to content
        </a>
        <ServiceWorkerRegistrar />
        <header className="border-b border-neutral-900">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link
              href="/"
              aria-label="BatesStamp home"
              className="flex items-center gap-2 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 rounded"
            >
              <span className="inline-block h-6 w-6 rounded bg-emerald-500" aria-hidden="true" />
              BatesStamp
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-1 text-sm text-neutral-300 sm:gap-3">
              <Link
                href="/how-it-works/"
                className="rounded px-2 py-2 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                How it works
              </Link>
              <Link
                href="/for-paralegals/"
                className="rounded px-2 py-2 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                For paralegals
              </Link>
              <Link
                href="/faq/"
                className="rounded px-2 py-2 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                FAQ
              </Link>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1">{children}</main>
        <footer className="border-t border-neutral-900 py-10 text-xs text-neutral-300">
          <div className="mx-auto max-w-5xl px-4">
            <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3">
              <div>
                <h2 className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  The tool
                </h2>
                <ul className="space-y-1.5">
                  <li><Link href="/" className="hover:text-emerald-400">Bates numbering</Link></li>
                  <li><Link href="/how-it-works/" className="hover:text-emerald-400">How it works</Link></li>
                  <li><Link href="/privacy-verified/" className="hover:text-emerald-400">Privacy verified</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Audiences
                </h2>
                <ul className="space-y-1.5">
                  <li><Link href="/for-paralegals/" className="hover:text-emerald-400">For paralegals</Link></li>
                  <li><Link href="/faq/" className="hover:text-emerald-400">Frequently asked questions</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Alternatives
                </h2>
                <ul className="space-y-1.5">
                  <li><Link href="/alternatives/adobe-acrobat/" className="hover:text-emerald-400">vs Adobe Acrobat Pro</Link></li>
                  <li><Link href="/alternatives/bates-express/" className="hover:text-emerald-400">vs Bates Express</Link></li>
                </ul>
              </div>
            </nav>
            <p className="mt-8 border-t border-neutral-900 pt-6 text-center text-neutral-400">
              BatesStamp is free, open, and processes everything in your browser.
              {" "}
              <Link href="/privacy-verified/" className="text-emerald-400 hover:underline">
                Privacy verified
              </Link>
              .
              {" "}
              © <FooterYear /> BatesStamp.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
