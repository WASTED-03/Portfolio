import { FullScreen } from "@/components/full-screen"
import { ExperienceTimeline } from "./containers/experience-timeline"

export const metadata = {
  title: "Experience | Arnav Ashok",
  description:
    "Explore the professional journey of Arnav Ashok - software engineer with experience in distributed systems.",
  openGraph: {
    title: "Experience | Arnav Ashok",
    description:
      "Software Engineer with hands-on experience in Java, Spring Boot, and Cloud Architecture.",
    siteName: "Arnav Ashok",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Arnav Ashok",
    description:
      "Check out Arnav Ashok's past work and achievements in backend development.",
  },
}

export default function Page() {
  return (
    <div>
      <FullScreen>
        <ExperienceTimeline />
      </FullScreen>
    </div>
  )
}
