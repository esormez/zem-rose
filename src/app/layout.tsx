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
  metadataBase: new URL("https://zemrose.me"),

  title: {
    default: "John Zemrose — Principal AI Architect",
    template: "%s | John Zemrose",
  },

  description:
    "Principal AI Architect at Intralytics. I build AI systems and the organizations to run them. AI Systems · Context Architecture · Agentic AI · Data Platforms.",

  keywords: [
    "Principal AI Architect",
    "AI Systems",
    "Context Architecture",
    "Agentic AI",
    "Data Platforms",
    "Organizational Transformation",
    "RAG Architecture",
    "Multi-Agent Systems",
    "LLM Engineering",
    "AWS Bedrock",
    "LangChain",
    "Engineering Transformation",
    "Intralytics",
    "John Zemrose",
  ],

  authors: [{ name: "John Zemrose", url: "https://zemrose.me" }],
  creator: "John Zemrose",

  openGraph: {
    type: "website",
    url: "https://zemrose.me",
    siteName: "John Zemrose",
    title: "John Zemrose — Principal AI Architect",
    description: "I build AI systems and the organizations to run them.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "John Zemrose — Principal AI Architect",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "John Zemrose — Principal AI Architect",
    description: "I build AI systems and the organizations to run them.",
    images: ["/api/og"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://zemrose.me",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://zemrose.me/#person",
      name: "John Zemrose",
      url: "https://zemrose.me",
      jobTitle: "Principal AI Architect",
      worksFor: {
        "@type": "Organization",
        name: "Intralytics",
        url: "https://www.intralytics.com",
      },
      description:
        "I build AI systems and the organizations to run them.",
      sameAs: [
        "https://www.linkedin.com/in/esormez/",
        "https://zemrose.me",
      ],
      knowsAbout: [
        "AI Systems",
        "Context Architecture",
        "Agentic AI",
        "RAG Architecture",
        "Data Platforms",
        "Engineering Transformation",
        "AWS Bedrock",
        "LangChain",
        "Multi-Agent Systems",
        "Organizational Design",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nashville",
        addressRegion: "Tennessee",
        addressCountry: "US",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://zemrose.me/#website",
      url: "https://zemrose.me",
      name: "John Zemrose — Principal AI Architect",
      description:
        "Portfolio site for John Zemrose, Principal AI Architect at Intralytics.",
      publisher: { "@id": "https://zemrose.me/#person" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#2563EB" />
        <meta name="color-scheme" content="dark" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${ibmPlexMono.variable}`}
        style={{ margin: 0, padding: 0, background: "#0A0A0B" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
