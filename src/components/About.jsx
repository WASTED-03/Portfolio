import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Palette, Zap, Users, Award, Coffee } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  const fullText = "React, TypeScript, Node.js, Python, Figma, Three.js, GSAP, Framer Motion"
  const skills = [
    { name: 'Frontend Development', icon: Code, color: 'text-blue-600' },
    { name: 'UI/UX Design', icon: Palette, color: 'text-purple-600' },
    { name: 'Animation', icon: Zap, color: 'text-yellow-600' },
    { name: 'Team Collaboration', icon: Users, color: 'text-green-600' },
    { name: 'Problem Solving', icon: Award, color: 'text-red-600' },
    { name: 'Coffee Consumption', icon: Coffee, color: 'text-orange-600' },
  ]

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '25+', label: 'Happy Clients' },
    { number: '100%', label: 'Satisfaction Rate' },
  ]

  useEffect(() => {
    if (isInView && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, isInView, fullText])

  return (
    <section id="about" ref={ref} className="section-padding">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-zinc-100 mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            I'm a passionate developer who loves creating digital experiences that make a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-display font-semibold text-zinc-100 mb-6">
              My Story
            </h3>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                With over 3 years of experience in web development, I specialize in creating 
                modern, responsive, and user-friendly applications. My journey began with a 
                curiosity about how websites work, and it has evolved into a passion for 
                crafting exceptional digital experiences.
              </p>
              <p>
                I believe in the power of clean code, thoughtful design, and continuous learning. 
                Every project is an opportunity to push boundaries and create something truly 
                remarkable that users will love.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or enjoying a good cup of coffee while sketching out my 
                next big idea.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-display font-semibold text-zinc-100 mb-6">
              Skills & Expertise
            </h3>
            
            {/* Typewriter Effect for Skills */}
            <div className="mb-8">
              <p className="text-gray-600 mb-3">Technologies I work with:</p>
              <div className="bg-zinc-900/60 p-4 rounded-lg shadow-sm border border-zinc-800 min-h-[60px]">
                <span className="text-primary-300 font-mono text-lg">
                  {displayedText}
                  <motion.span
                    className="inline-block w-0.5 h-6 bg-primary-300 ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </span>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center space-x-3 p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg shadow-sm hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <skill.icon className={`w-6 h-6 ${skill.color}`} />
                  <span className="text-zinc-200 font-medium text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <motion.div
                className="text-4xl font-display font-bold gradient-text mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.div>
              <p className="text-zinc-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
