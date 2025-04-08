import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans", // Enables CSS variable
  weight: ["400", "700"],     // Optional, but recommended
  display: "swap",            // Optional, improves performance
});

export const metadata: Metadata = {
  title: "Preperr",
  description: "An AI powered interview preparation app, made to help you excel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={dmSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
