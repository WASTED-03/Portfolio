import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from 'lucide-react'

const CaseStudy = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [isSticky, setIsSticky] = useState(false)
  
  const heroRef = useRef(null)
  const overviewRef = useRef(null)
  const processRef = useRef(null)
  const outcomeRef = useRef(null)
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const isOverviewInView = useInView(overviewRef, { once: true, margin: "-200px" })
  const isProcessInView = useInView(processRef, { once: true, margin: "-200px" })
  const isOutcomeInView = useInView(outcomeRef, { once: true, margin: "-200px" })

  // Mock project data - in a real app, this would come from an API
  const projectData = {
    1: {
      title: "E-Commerce Platform",
      subtitle: "A modern, full-stack e-commerce solution",
      heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      category: "Full Stack",
      duration: "3 months",
      client: "Tech Startup",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      overview: {
        problem: "The client needed a scalable e-commerce platform that could handle high traffic and provide a seamless shopping experience for their customers.",
        solution: "I developed a modern, responsive e-commerce platform with advanced features including real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
        role: "Full-stack Developer & UI/UX Designer"
      },
      process: [
        {
          phase: "Discovery & Planning",
          description: "Conducted user research and market analysis to understand the target audience and define project requirements.",
          duration: "2 weeks",
          deliverables: ["User personas", "Technical specifications", "Project roadmap"]
        },
        {
          phase: "Design & Prototyping",
          description: "Created wireframes and high-fidelity prototypes focusing on user experience and conversion optimization.",
          duration: "3 weeks",
          deliverables: ["Wireframes", "UI designs", "Interactive prototypes"]
        },
        {
          phase: "Development",
          description: "Built the application using modern technologies with a focus on performance and scalability.",
          duration: "8 weeks",
          deliverables: ["Frontend application", "Backend API", "Database design"]
        },
        {
          phase: "Testing & Launch",
          description: "Comprehensive testing and deployment with monitoring and analytics integration.",
          duration: "2 weeks",
          deliverables: ["Test reports", "Performance optimization", "Live deployment"]
        }
      ],
      outcome: {
        metrics: [
          { label: "Conversion Rate", value: "+45%", description: "Increase in sales conversion" },
          { label: "Page Load Speed", value: "1.2s", description: "Average page load time" },
          { label: "User Satisfaction", value: "4.8/5", description: "Customer rating" },
          { label: "Mobile Traffic", value: "65%", description: "Mobile users percentage" }
        ],
        challenges: [
          "Implementing real-time inventory updates without affecting performance",
          "Creating a seamless checkout experience across different devices",
          "Integrating multiple payment gateways while maintaining security"
        ],
        learnings: [
          "The importance of user testing in e-commerce design",
          "How to optimize for both performance and user experience",
          "Best practices for handling high-traffic applications"
        ]
      },
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
      ]
    }
  }

  const project = projectData[id] || projectData[1]

  const sections = [
    { id: 'overview', label: 'Overview', ref: overviewRef },
    { id: 'process', label: 'Process', ref: processRef },
    { id: 'outcome', label: 'Outcome', ref: outcomeRef }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsSticky(scrollY > 100)

      // Determine active section by choosing the visible section whose center
      // is closest to an anchor line at ~35% of viewport height. This avoids
      // lag where the previous section remains active when the next begins.
      const anchorY = window.innerHeight * 0.35
      let bestId = activeSection
      let bestDist = Infinity

      sections.forEach(section => {
        const node = section.ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        // Consider only sections that intersect the viewport at all
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight
        if (!isVisible) return
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - anchorY)
        if (dist < bestDist) {
          bestDist = dist
          bestId = section.id
        }
      })

      if (bestId !== activeSection) setActiveSection(bestId)
    }

    window.addEventListener('scroll', handleScroll)
    // Run once on mount to set initial state correctly
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection, sections])

  const scrollToSection = (sectionId) => {
    const section = sections.find(s => s.id === sectionId)
    if (section?.ref.current) {
      section.ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isSticky 
            ? 'bg-zinc-900/60 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.4)]' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-zinc-300 hover:text-primary-300 transition-colors duration-300"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Portfolio</span>
            </motion.button>

            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === section.id
                      ? 'text-primary-300'
                      : 'text-zinc-400 hover:text-primary-300'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-16">
        <div className="relative h-[60vh] sm:h-[70vh] lg:h-screen flex items-center justify-center overflow-hidden">
          {/* Per-page hero image background removed to allow shared Three.js background to show */}
          
          <motion.div
            className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.category}
            </motion.span>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag size={16} />
                <span>{project.tags.length} technologies</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section ref={overviewRef} className="py-20">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isOverviewInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-zinc-100 mb-12 text-center">
              Project Overview
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-display font-semibold text-zinc-100 mb-4">
                  The Problem
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {project.overview.problem}
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-semibold text-zinc-100 mb-4">
                  The Solution
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {project.overview.solution}
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold text-zinc-100 mb-4">
                My Role
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {project.overview.role}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 bg-primary-500/10 text-primary-300 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isOverviewInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20">
        <div className="container-custom">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-zinc-100 mb-12 text-center">
              Development Process
            </h2>

            <div className="space-y-12">
              {project.process.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  className="flex flex-col lg:flex-row gap-8 items-center"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isProcessInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`flex-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-display font-semibold text-gray-800">
                          {phase.phase}
                        </h3>
                        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed mb-6">
                        {phase.description}
                      </p>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Deliverables:</h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-zinc-400">
                              <div className="w-2 h-2 bg-primary-600 rounded-full" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex-1 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.images[index % project.images.length]}
                        alt={`${phase.phase} process`}
                        className="w-full h-64 object-cover rounded-2xl shadow-lg"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outcome Section */}
      <section ref={outcomeRef} className="py-20">
        <div className="container-custom">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isOutcomeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-zinc-100 mb-12 text-center">
              Results & Impact
            </h2>

            {/* Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {project.outcome.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="text-center p-6 bg-gray-50 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isOutcomeInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-display font-bold gradient-text mb-2">
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-zinc-100 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {metric.description}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Challenges */}
              <div>
                <h3 className="text-2xl font-display font-semibold text-zinc-100 mb-6">
                  Key Challenges
                </h3>
                <ul className="space-y-4">
                  {project.outcome.challenges.map((challenge, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isOutcomeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-zinc-400">{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Learnings */}
              <div>
                <h3 className="text-2xl font-display font-semibold text-zinc-100 mb-6">
                  Key Learnings
                </h3>
                <ul className="space-y-4">
                  {project.outcome.learnings.map((learning, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isOutcomeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-zinc-400">{learning}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isOutcomeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="btn-primary text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="inline-block mr-2" size={20} />
                  View Live Project
                </motion.button>
                <motion.button
                  className="btn-secondary text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="inline-block mr-2" size={20} />
                  View Code
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CaseStudy
