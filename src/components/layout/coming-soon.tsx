"use client"

import { useEffect, useState } from "react"
import { AnimatedSpan, Terminal, TypingAnimation } from "../magicui/terminal"
import { HoverBorderGradient } from "../ui/hover-border-gradient"
import { Logo } from "../svg/logo"
import { useRouter } from "next/navigation"
import { FullScreen } from "../full-screen"

export const ComingSoonPage = ({ pageName }: { pageName?: string }) => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <FullScreen className="flex-col">
      <Terminal>
        <TypingAnimation>
          :: Spring Boot :: (v3.2.0)
        </TypingAnimation>

        <TypingAnimation delay={1000}>
          Starting ArnavAshokApplication using Java 17...
        </TypingAnimation>

        <AnimatedSpan delay={2000} className="text-green-500">
          <span>✔ Loading application context</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2500} className="text-green-500">
          <span>✔ Initializing embedded Tomcat server</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3000} className="text-green-500">
          <span>✔ Configuring REST controllers and services</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3500} className="text-green-500">
          <span>✔ Connecting to PostgreSQL datasource</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4000} className="text-green-500">
          <span>✔ Applying Spring Security filters</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4500} className="text-green-500">
          <span>✔ Loading ML inference modules</span>
        </AnimatedSpan>

        <AnimatedSpan delay={5000} className="text-green-500">
          <span>✔ Registering API routes (/api/**)</span>
        </AnimatedSpan>

        <AnimatedSpan delay={5500} className="text-blue-500">
          <span>ℹ {pageName ?? "Endpoint"}:</span>
          <span className="pl-2">Initialization in progress</span>
        </AnimatedSpan>

        <TypingAnimation delay={6000} className="text-muted-foreground">
          Application started successfully in 3.742 seconds.
        </TypingAnimation>

        <TypingAnimation delay={6500} className="text-muted-foreground">
          Listening on port 8080 — arnavashok.dev
        </TypingAnimation>
      </Terminal>

      <div className="flex mt-10 justify-center text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Logo className="size-5" />
          <span>Back to home</span>
        </HoverBorderGradient>
      </div>
    </FullScreen>
  )
}
