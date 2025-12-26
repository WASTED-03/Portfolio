import { Metadata } from "next"
import { ComingSoonPage } from "@/components/layout/coming-soon"

export const metadata: Metadata = {
  title: "About | Arnav Ashok",
  description:
    "Learn more about Arnav Ashok - Backend Developer, Java enthusiast, and tech explorer.",
  keywords: [
    "Arnav Ashok",
    "About Arnav",
    "Backend Developer",
    "Java",
    "Spring Boot",
    "Developer",
  ],
  openGraph: {
    title: "About | Arnav Ashok",
    description:
      "Discover the story and journey of Arnav Ashok in the world of software engineering.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Arnav Ashok",
    description:
      "Learn more about Arnav Ashok - Backend Developer and tech enthusiast.",
  },
}

export default function Page() {
  return <ComingSoonPage pageName="About" />
}
