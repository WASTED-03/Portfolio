import { LayoutWithHeader } from "@/components/layout/layout-with-header"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"

import { Exo_2 } from "next/font/google"

const exo2 = Exo_2({
  subsets: ["latin", "vietnamese", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
})

export const metadata: Metadata = {
  title: "Arnav Ashok | Java Backend Developer Portfolio",
  description:
    "Explore Arnav Ashok's portfolio – a skilled Java Backend Developer specializing in Spring Boot, Microservices, and Cloud Architecture (AWS). Showcasing scalable systems and distributed applications.",
  keywords: [
    "Backend Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Arnav Ashok Portfolio",
    "Software Engineer",
    "Microservices",
    "System Design",
    "Cloud Architecture",
    "AWS",
  ],
  openGraph: {
    title: "Arnav Ashok | Java Backend Developer Portfolio",
    description:
      "Discover Arnav Ashok's expertise in Backend Development, Spring Boot, and Microservices. View projects, case studies, and technical skills.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnav Ashok | Java Backend Developer Portfolio",
    description:
      "Explore Arnav Ashok's backend projects and expertise in Java, Spring Boot, and Cloud Architecture.",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${exo2.variable} antialiased scroll-smooth w-full max-w-dvw overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <LayoutWithHeader>{children}</LayoutWithHeader>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
