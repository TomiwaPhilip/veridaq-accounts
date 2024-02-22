import type { Metadata } from "next";

import "./globals.css";
import Rightsvgs from "@/components/blurSvgs/Rightsvg";

export const metadata: Metadata = {
  title: "Auth",
  description: "Sign in to Veridaq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bgcolor">
        {children}
        <Rightsvgs />
      </body>
    </html>
  );
}
