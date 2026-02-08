import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import NetworkGraph from "@/components/NetworkGraph";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Zemrose",
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
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <NetworkGraph />
        {children}
      </body>
    </html>
  );
}
