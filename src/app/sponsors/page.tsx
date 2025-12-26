import { FullScreen } from "@/components/full-screen"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sponsors | Arnav Ashok",
  description: "Sponsors",
}

export default function Page() {
  return (
    <FullScreen>
      <div className="text-center text-xl font-bold">No sponsors yet.</div>
    </FullScreen>
  )
}
