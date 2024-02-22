import type { Metadata } from "next";
import "./globals.css";

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
        <div className="container">
          <div className="blurred-circle">
            <img
              src="/assets/images/blur.svg"
              alt="blur"
              width={300}
              height={300}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
