import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Marnexii - Roberto Rivera",
  description: "(787) 420-1874",
  generator: "v0.app",
  metadataBase: new URL("https://pitch.marnexii.com"),
  openGraph: {
    title: "Marnexii - Roberto Rivera",
    description: "(787) 420-1874",
    images: [
      {
        url: "https://pitch.marnexii.com/founder_thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Roberto Rivera - Marnexii Founder",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marnexii - Roberto Rivera",
    description: "(787) 420-1874",
    images: ["https://pitch.marnexii.com/founder_thumbnail.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
