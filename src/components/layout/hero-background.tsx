"use client"
import { motion } from "motion/react"
import { HeroHighlight } from "../ui/hero-highlight"
import { cn } from "@/lib/utils"

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"

export function HeroBackground({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Full-screen video background at z-0 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src={VIDEO_SRC}
      />

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 z-[1] bg-black/40" />

      {/* Existing HeroHighlight with transparent bg so video shows through */}
      <div className="relative z-[2]">
        <HeroHighlight
          className="min-h-screen"
          containerClassName="!bg-transparent [&>div:not(.relative)]:hidden"
        >
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className={cn(className)}
          >
            {children}
          </motion.h1>
        </HeroHighlight>
      </div>
    </div>
  )
}
