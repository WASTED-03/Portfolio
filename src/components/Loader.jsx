import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background veil matching dark theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-900/95 via-background-800/95 to-background-700/95" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_-10%,rgba(56,189,248,0.08),transparent_60%)]" />

      <div className="relative text-center">
        {/* Neon rings */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Outer rotating sweep */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 40px rgba(56,189,248,0.25)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(56,189,248,0.0) 0%, rgba(56,189,248,0.55) 20%, rgba(56,189,248,0.0) 60%)'
              }}
            />
          </motion.div>

          {/* Middle dashed ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-primary-400/30"
            style={{ borderStyle: 'dashed' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner solid ring */}
          <div className="absolute inset-6 rounded-full border border-zinc-600/40" />

          {/* Orbiting particles */}
          <motion.div
            className="absolute top-1/2 left-1/2"
            style={{ transformOrigin: '0 0' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 translate-x-16">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-300 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2"
            style={{ transformOrigin: '0 0' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 translate-x-10">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-400 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
            </div>
          </motion.div>
        </div>

        {/* Branding text with shimmer */}
        <motion.h2
          className="text-2xl font-display font-semibold text-zinc-100"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="relative inline-block">
            <span className="gradient-text">Preparing</span> something amazing
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow" style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, black, transparent)' }} />
          </span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Loading experience
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Loader
