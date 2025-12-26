"use client"

import { IconCloud } from "@/components/magicui/icon-cloud"
import { TECH_STACK } from "@/data/tech-stack"

export function StackCloud() {
  const images = TECH_STACK.map((slug) => {
    if (slug === "java") return "/images/media/JAVALOGO.png"
    if (slug === "amazonaws") return "/images/media/AWSLOGO.webp"
    return `https://cdn.simpleicons.org/${slug}`
  })

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <div className="scale-75">
        <IconCloud images={images} />
      </div>
    </div>
  )
}
