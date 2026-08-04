import type { Metadata } from "next";
import { headers } from "next/headers";
import SplashCursor from "./SplashCursor";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "B2B Pet Grooming & Cleaning Products | Yiwu Summer",
    description: "Yiwu Summer Daily Necessities Co., Ltd. supplies pet grooming brushes, cleaning gloves, and bath massage products for international B2B sourcing.",
    keywords: ["pet grooming products supplier", "pet grooming tools wholesale", "pet cleaning gloves", "pet bath brushes", "B2B pet supplies"],
    openGraph: {
      title: "Yiwu Summer | Pet Grooming & Cleaning Products",
      description: "Pet grooming, cleaning, and bathing products for importers, distributors, and online wholesalers.",
      type: "website",
      locale: "en_US",
      images: [{ url: socialImage, width: 1728, height: 909, alt: "Yiwu Summer B2B pet product collection" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yiwu Summer | B2B Pet Grooming Products",
      description: "Pet grooming and cleaning products for international importers, distributors, and online wholesalers.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SplashCursor
          SIM_RESOLUTION={64}
          DYE_RESOLUTION={512}
          CAPTURE_RESOLUTION={256}
          DENSITY_DISSIPATION={2.4}
          VELOCITY_DISSIPATION={1.6}
          PRESSURE_ITERATIONS={12}
          CURL={2.4}
          SPLAT_RADIUS={0.13}
          SPLAT_FORCE={2800}
          COLOR_UPDATE_SPEED={1.5}
          RAINBOW_MODE={false}
          COLOR="#f27c4b"
        />
        {children}
      </body>
    </html>
  );
}
