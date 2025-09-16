import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Twitter, Mail } from 'lucide-react'

const Hero = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.1),transparent_50%)]" />
        
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary-200/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-accent-200/30 rounded-lg"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-primary-300/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        style={{ opacity }}
      >
        {/* Greeting */}
        <motion.p
          className="text-lg text-gray-600 mb-4 font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hello, I'm
        </motion.p>

        {/* Main Title */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="gradient-text">Creative</span>
          <br />
          <span className="text-gray-800">Developer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          I craft beautiful, interactive experiences that bring ideas to life through code and design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToAbout()}
          >
            View My Work
          </motion.button>
          <motion.button
            className="btn-secondary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-primary-600"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center text-gray-600 hover:text-primary-600 transition-colors duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium mb-2">Scroll Down</span>
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
