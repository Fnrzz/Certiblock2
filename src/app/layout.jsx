import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "CertiBlock",
  description: "Official platform for creating certificates with blockchain",
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
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" id="home">
      <body className={`${outfit.className} dark:bg-gray-900`}>{children}</body>
    </html>
  );
}
