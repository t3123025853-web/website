import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://yiwu-summer-pet-products.t3123025853.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico?v=alonrunlife-1", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/brand/alonrunlife-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/alonrunlife-icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/alonrunlife-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=alonrunlife-1",
    apple: [{ url: "/brand/alonrunlife-icon-180.png", sizes: "180x180", type: "image/png" }],
  },
  title: "B2B Pet Grooming & Cleaning Products | Yiwu Summer",
  description:
    "Yiwu Summer Daily Necessities Co., Ltd. supplies pet grooming brushes, cleaning gloves, and bath massage products for international B2B sourcing.",
  keywords: [
    "pet grooming products supplier",
    "pet grooming tools wholesale",
    "pet cleaning gloves",
    "pet bath brushes",
    "B2B pet supplies",
  ],
  openGraph: {
    title: "Yiwu Summer | Pet Grooming & Cleaning Products",
    description:
      "Pet grooming, cleaning, and bathing products for importers, distributors, and online wholesalers.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1728,
        height: 909,
        alt: "Yiwu Summer B2B pet product collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yiwu Summer | B2B Pet Grooming Products",
    description:
      "Pet grooming and cleaning products for international importers, distributors, and online wholesalers.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
