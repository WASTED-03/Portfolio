"use client"

import { cn } from "@/lib/utils"
import {
  IconArrowUp,
  IconBrandGithub,
  IconMenu2,
  IconX,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

import { Logo } from "../svg/logo"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { Separator } from "@radix-ui/react-dropdown-menu"

const links = [
  {
    title: "All",
    href: "/",
  },

  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
    isComingSoon: true,
  },
  // {
  //   title: "Sponsors",
  //   href: "/sponsors",
  // },
]

const pathNameDisableHeaderScroll = [""]

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const pathname = usePathname()

  const isDisableHeaderScroll = pathNameDisableHeaderScroll.includes(pathname)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    if (isDisableHeaderScroll) {
      setIsScrolled(false)
      return
    }

    if (currentScrollY === 0) {
      setIsScrolled(false)
    } else if (currentScrollY > 0) {
      setIsScrolled(true)
    }

    lastScrollY.current = currentScrollY
  }, [isDisableHeaderScroll])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })

    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll, isDisableHeaderScroll])

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
      >
        <div
          className={cn(
            "mx-auto flex justify-between items-center z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] w-full",
            isScrolled
              ? "liquid-glass-heavy py-2 px-5 md:px-6 mt-3 max-w-[620px] gap-4 rounded-full"
              : "liquid-glass p-4 max-w-[1100px] gap-10 rounded-2xl md:rounded-3xl mt-2"
          )}
        >
          <div className="flex items-center gap-2">
            <Link href="/">
              <Logo className="size-14" />
            </Link>
          </div>
          <div className="flex-1 items-center gap-3 justify-center hidden sm:flex">
            {links.map((link) => (
              <HeaderLink
                key={link.title}
                title={link.title}
                href={link.href}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={"https://github.com/WASTED-03/Portfolio"}
              target="_blank"
              rel="noopener noreferrer"
              className="border p-2 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-300"
            >
              <IconBrandGithub />
            </a>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border size-10 rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-300 sm:hidden"
                >
                  <IconMenu2 />
                  <span className="sr-only">Menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="min-h-dvh">
                <DrawerHeader className="flex justify-between">
                  <DrawerTitle className="flex items-center gap-2">
                    <Logo className="size-14" />
                    Portfolio
                  </DrawerTitle>
                  <DrawerClose
                    asChild
                    className="self-end -translate-y-14 z-50"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="size-8"
                    >
                      <IconX />
                    </Button>
                  </DrawerClose>
                </DrawerHeader>

                <div className="px-6 flex flex-col gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="flex items-center gap-2 font-medium text-xl"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {link.title}
                      {link.isComingSoon && (
                        <span className="text-sm bg-blue-300/10 text-blue-500 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </Link>
                  ))}
                  <Separator />

                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      {isDisableHeaderScroll && <ScrollToTopButton />}
    </>
  )
}

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!isVisible) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-10 !bg-zinc-900/80 backdrop-blur-md rounded-xl p-2 hover:scale-110 duration-300 fixed bottom-4 right-8 md:right-20 z-[9999]"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }}
    >
      <IconArrowUp className="text-white" />
    </Button>
  )
}

const HeaderLink = ({ title, href }: { title: string; href: string }) => {
  const pathname = usePathname() || "/"
  const isActive = href === pathname
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-full transition-colors",
        isActive
          ? "dark:bg-white dark:text-black bg-zinc-900 text-white"
          : "dark:hover:bg-zinc-800 hover:bg-zinc-100"
      )}
    >
      <Link href={href}>{title}</Link>
    </div>
  )
}
