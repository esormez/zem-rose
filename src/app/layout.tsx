import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Zemrose — Principal AI Architect",
  description: "I build AI systems and the organizations to run them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0A0A0B" />
      </head>
      <body className={`${ibmPlexMono.variable}`} style={{ margin: 0, padding: 0, background: "#0A0A0B" }}>
        {children}
      </body>
    </html>
  );
}
