"use client"

import { Pointer } from "@/components/magicui/pointer"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { EvervaultCard } from "@/components/ui/evervault-card"
import { cn } from "@/lib/utils"
import { IconClipboardCopy } from "@tabler/icons-react"
import { Blocks, Music2, Rss } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { MediaPlayer } from "./media-player"
import { StackCloud } from "./stack-cloud"
import { BlurImage } from "@/components/ui/apple-cards-carousel"
import { LEARNING_RESOURCES } from "@/data/learning-resource"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { TECH_STACK } from "@/data/tech-stack"

export function PersonalInterests() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[352px] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
    )
  }
  return (
    <>
      <BentoGrid className="w-full mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </>
  )
}

const SkeletonOne = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <EvervaultCard
        text={
          <a
            href="/files/Arnav%20Ashok%20Resume%20J.pdf"
            download
            className="flex flex-col items-center justify-center"
          >
            Resume
            <div className="text-sm text-gray-500">(Click to download)</div>
          </a>
        }
      />

      <Pointer>
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-pink-600"
          >
            <motion.path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      </Pointer>
    </motion.div>
  )
}

const slugToName: Record<string, string> = {
  java: "Java",
  springboot: "Spring Boot",
  springsecurity: "Spring Security",
  apachemaven: "Maven",
  apachekafka: "Kafka",
  amazonaws: "AWS",
  docker: "Docker",
  kubernetes: "Kubernetes",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  mongodb: "MongoDB",
  python: "Python",
  fastapi: "FastAPI",
  react: "React",
  nodedotjs: "Node.js",
  git: "Git",
  linux: "Linux",
}

const SkeletonTwo = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 "
    >
      <Drawer>
        <DrawerTrigger asChild>
          <div className="relative flex h-full w-full flex-col items-center justify-center cursor-pointer">
            <StackCloud />
            <Pointer>
              <div className="text-2xl">👆</div>
            </Pointer>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl font-bold">
              My Tech Stack
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
              {TECH_STACK.map((tech) => (
                <div key={tech} className="flex flex-col items-center gap-2">
                  <div className="relative w-12 h-12">
                    <img
                      src={
                        tech === "java"
                          ? "/images/media/JAVALOGO.png"
                          : tech === "amazonaws"
                            ? "/images/media/AWSLOGO.webp"
                            : `https://cdn.simpleicons.org/${tech}`
                      }
                      alt={tech}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium capitalize text-center">
                    {slugToName[tech] || tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </motion.div>
  )
}
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div className="h-full w-full rounded-lg flex-1">
        <MediaPlayer />
      </motion.div>
    </motion.div>
  )
}
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      {LEARNING_RESOURCES.map(
        ({ href, imgSrc, alt, description, imageWrapperClass }, index) => {
          const variant = index === 0 ? first : index === 2 ? second : undefined

          return (
            <motion.a
              key={href}
              variants={variant}
              className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center cursor-none relative z-20"
              href={href}
              target="_blank"
            >
              <div className={imageWrapperClass}>
                <BlurImage src={imgSrc} alt={alt} height={100} width={100} />
              </div>
              <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                {description}
              </p>
            </motion.a>
          )
        }
      )}
      <Pointer className="fill-blue-500" />
    </motion.div>
  )
}

const items = [
  {
    title: "Download My Resume",
    description: (
      <span className="text-sm">
        A quick summary of my experience, projects, and skills — available for
        download.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Tech Stack",
    description: (
      <span className="text-sm">
        The tools I rely on to build performant, modern web apps.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <Blocks className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Music & Mood",
    description: (
      <span className="text-sm">
        From deep focus to feel-good vibes, I create playlists that fuel my day
        — &ldquo;Working Energy&ldquo; is one of my favorites.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1 row-span-2 min-h-[520px]",
    icon: <Music2 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Go-To Tech Resources",
    description: (
      <span className="text-sm">
        Where I learn system design, backend engineering, and applied AI.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Rss className="h-4 w-4 text-neutral-500" />,
  },
]
