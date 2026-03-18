"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Ripple } from "@/components/magicui/ripple"
import Image from "next/image"

export const MyResume = () => {
    return (
        <Card className="col-span-1 md:col-span-1 lg:col-span-2 liquid-glass p-0 order-2 md:order-1 h-full no-custom-cursor border-0">
            <CardContent className="!p-0 h-full">
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                    <Image
                        src="/images/resources/avt-card.png"
                        alt="avatar"
                        width={1000}
                        height={1000}
                        className="z-10 object-contain"
                    />
                    <Ripple className="" />
                </div>
            </CardContent>
        </Card>
    )
}
