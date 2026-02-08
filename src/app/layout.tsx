import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import NetworkGraph from "@/components/NetworkGraph";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Zemrose | Principal Technical Program Manager",
  description: "Principal TPM specializing in AI-native engineering, ML systems, and data platforms. 210+ engineers led, $870K+ value delivered.",
  keywords: ["Principal TPM", "AI Engineering", "Machine Learning", "Data Engineering", "AWS", "Technical Program Management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <NetworkGraph />
        {children}
      </body>
    </html>
  );
}
