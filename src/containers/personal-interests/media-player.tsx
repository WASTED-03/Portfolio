"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Pause, Play } from "lucide-react"
import Image from "next/image"

export const MediaPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative w-full h-full bg-black rounded-3xl overflow-hidden p-6 flex flex-col items-center justify-between shadow-2xl border border-white/10"
        >
            {/* Background blur effect */}
            <div className="absolute inset-0 z-0 opacity-30 blur-3xl">
                <Image
                    src="/images/media/music.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center gap-6 mt-4">
                {/* Rotating Vinyl/Album Art */}
                <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{
                        repeat: isPlaying ? Infinity : 0,
                        duration: 10,
                        ease: "linear",
                    }}
                    className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden"
                >
                    <Image
                        src="/images/media/music.jpg"
                        alt="Album Art"
                        fill
                        className="object-cover"
                    />
                    {/* Vinyl center hole */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border border-white/20 z-20" />
                </motion.div>

                {/* Track Info */}
                <div className="text-center space-y-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Fainted</h3>
                    <p className="text-white/60 font-medium">Narvent</p>
                </div>
            </div>

            {/* Controls */}
            <div className="relative z-10 w-full flex flex-col gap-4 mb-2">
                {/* Progress Bar (Visual) */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: isPlaying ? "100%" : "0%" }}
                        transition={{ duration: 249, ease: "linear" }} // Approx duration of song
                    />
                </div>

                <div className="flex items-center justify-between px-2">
                    <div className="text-xs text-white/40 font-mono">0:00</div>
                    <button
                        onClick={togglePlay}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                    >
                        {isPlaying ? (
                            <Pause className="w-6 h-6 text-black fill-current" />
                        ) : (
                            <Play className="w-6 h-6 text-black fill-current ml-1" />
                        )}
                    </button>
                    <div className="text-xs text-white/40 font-mono">4:09</div>
                </div>
            </div>

            <audio
                ref={audioRef}
                src="/images/media/Narvent_-_Fainted_(mp3.pm).mp3"
                onEnded={() => setIsPlaying(false)}
                loop
            />
        </motion.div>
    )
}
