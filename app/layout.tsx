import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

import NavbarServer from "@/components/layout/NavbarServer";
import Footer from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/ui/FloatingButtons";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/language-context";
import AutoPopupEnquiry from "@/components/ui/AutoPopupEnquiry";

// import GoogleTag from "@/components/analytics/GoogleTag";
// import MetaPixel from "@/components/analytics/MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ================= SOBHA CENTRAL PAGE FONTS ================= */
/* Playfair Display -> headings, Poppins -> body text */

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/* ================= SEO METADATA ================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grpremium.com"),

  title: {
    default: "G R Premium Properties LLC",
    template: "%s | G R Premium Properties LLC",
  },

  description:
    "G R Premium Properties LLC is a trusted real estate company registered in mainland Dubai, committed to delivering premium real estate services across the UAE. Explore luxury apartments, villas, and investment opportunities with flexible payment plans.",

  keywords: [
    "GR Premium Properties",
    "Dubai real estate",
    "Luxury property Dubai",
    "Dubai apartments",
    "Dubai villas",
    "Real estate company Dubai",
  ],

  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },

  openGraph: {
    title: "G R Premium Properties LLC",
    description:
      "Trusted real estate company registered in mainland Dubai delivering premium real estate services across the UAE.",
    url: "https://www.grpremium.com",
    siteName: "G R Premium Properties LLC",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "G R Premium Properties LLC",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "G R Premium Properties LLC",
    description:
      "Premium real estate company in Dubai offering luxury apartments, villas, and investment properties.",
    images: ["/assets/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${poppins.variable} antialiased bg-[#0F172A] text-white`}
      >
         {/* <GoogleTag />
        <MetaPixel /> */}
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

            <AnnouncementBar />
            <NavbarServer />

            <main className="w-full">{children}</main>

            <FloatingButtons />
            <AutoPopupEnquiry />


            {/* ================= STRUCTURED DATA ================= */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "RealEstateAgent",
                  name: "G R Premium Properties LLC",
                  url: "https://www.grpremium.com",
                  logo: "https://www.grpremium.com/assets/logo.png",
                  image: "https://www.grpremium.com/assets/logo.png",
                  description:
                    "Trusted real estate company registered in mainland Dubai delivering premium real estate services.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "Aspin Commercial Tower - 401C - 104 Sheikh Zayed Rd",
                    addressLocality: "Dubai",
                    addressCountry: "UAE",
                  },
                  telephone: "+971585964689",
                }),
              }}
            />

          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}