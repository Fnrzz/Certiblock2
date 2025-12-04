import { Outfit } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "CertiBlock - Blockchain Certificate Platform",
    template: "%s | CertiBlock",
  },

  description:
    "Official platform for verifying certificates UMS securely on the blockchain.",

  keywords: [
    "blockchain",
    "certificate",
    "verification",
    "ethereum",
    "web3",
    "education",
  ],

  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/logo/logo-icon-light.png",
        type: "image/png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/logo/logo-icon-dark.png",
        type: "image/png",
      },
    ],
    shortcut: "/images/logo/logo-icon-dark.png",
    apple: "/images/logo/logo-icon-dark.png",
  },

  openGraph: {
    title: "CertiBlock - Secure Blockchain Certificates",
    description:
      "Issue and verify tamper-proof certificates using blockchain technology.",
    url: "/",
    siteName: "CertiBlock",
    images: [
      {
        url: "/images/logo/logo-icon-light.png",
        width: 1200,
        height: 630,
        alt: "CertiBlock Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CertiBlock",
    description: "Official platform for creating certificates with blockchain",
    images: ["/images/logo/logo-icon-light.png"],
  },
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") || "";
  return (
    <html lang="en" className="scroll-smooth" id="home">
      <head>
        <meta property="csp-nonce" content={nonce} />
      </head>
      <body className={`${outfit.className} dark:bg-gray-900`}>{children}</body>
    </html>
  );
}
