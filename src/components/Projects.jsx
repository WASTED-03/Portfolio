import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const [trackWidth, setTrackWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const projects = [
    { id: 1, title: "E-Commerce Platform", description: "A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", tags: ["React", "Node.js", "MongoDB", "Stripe"], category: "Full Stack", featured: true },
    { id: 2, title: "Portfolio Website", description: "A responsive portfolio website with smooth animations and modern design principles.", image: "https://images.unsplash.com/photo-1467232004584-a241de8b6ef3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", tags: ["React", "Framer Motion", "TailwindCSS"], category: "Frontend", featured: true },
    { id: 3, title: "Task Management App", description: "A collaborative task management application with real-time updates and team features.", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80", tags: ["Vue.js", "Socket.io", "Express"], category: "Full Stack", featured: true },
    { id: 4, title: "Weather Dashboard", description: "An interactive weather dashboard with beautiful data visualizations and forecasts.", image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", tags: ["React", "D3.js", "API Integration"], category: "Frontend", featured: true },
    { id: 6, title: "Mobile Banking App", description: "A secure mobile banking application with biometric authentication and transaction management.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", tags: ["React Native", "Node.js", "Blockchain"], category: "Mobile", featured: true }
  ]

  const featuredProjects = projects.filter(p => p.featured)
  const loopItems = [...featuredProjects, ...featuredProjects]

  useEffect(() => {
    setIsTouch(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
    const measure = () => {
      if (!trackRef.current) return
      const width = trackRef.current.scrollWidth / 2
      setTrackWidth(width)
      // normalize x to avoid visible jump when width changes
      const current = x.get()
      if (width > 0) {
        let normalized = current
        while (normalized <= -width) normalized += width
        while (normalized > 0) normalized -= width
        x.set(normalized)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((t, delta) => {
    if (!trackWidth) return
    if (isPaused && !isTouch) return
    const speed = 60 // px per second
    const moveBy = (delta / 1000) * speed
    let next = x.get() - moveBy
    // wrap seamlessly preserving overshoot
    while (next <= -trackWidth) next += trackWidth
    x.set(next)
  })

  const handleProjectClick = (id) => navigate(`/case-study/${id}`)

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-zinc-100 mb-3">Featured <span className="gradient-text">Projects</span></h2>
          <p className="text-lg text-zinc-400">Explore selected work, continuously in motion.</p>
        </div>

        <div ref={containerRef} className="relative overflow-hidden group/row" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <motion.div ref={trackRef} className="flex gap-6 will-change-transform" style={{ x }}>
            {loopItems.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="group relative bg-zinc-900/60 border border-zinc-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.25)] overflow-hidden cursor-pointer flex-shrink-0 w-[260px] sm:w-[320px] md:w-[360px] transition-shadow transition-transform transition-[filter] duration-300 ease-out group-hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] filter group-hover/row:grayscale hover:!grayscale-0 hover:!brightness-110"
                onMouseEnter={() => !isTouch && setIsPaused(true)}
                onMouseLeave={() => !isTouch && setIsPaused(false)}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="relative h-44 sm:h-56 md:h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <motion.button className="p-2.5 bg-zinc-900/80 border border-zinc-700 rounded-full text-zinc-100 hover:bg-zinc-800 shadow-[0_0_18px_rgba(56,189,248,0.25)]" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <ExternalLink size={18} />
                      </motion.button>
                      <motion.button className="p-2.5 bg-zinc-900/80 border border-zinc-700 rounded-full text-zinc-100 hover:bg-zinc-800 shadow-[0_0_18px_rgba(56,189,248,0.25)]" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Github size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 bg-primary-500/10 text-primary-300 text-xs font-medium rounded-full">{project.category}</span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-semibold text-zinc-100 mb-2 group-hover:text-primary-300 transition-colors duration-300">{project.title}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-[11px] font-medium rounded">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-0 ring-primary-500/0 group-hover:ring-2 group-hover:ring-primary-500/30 hover:ring-4 hover:ring-primary-400/40 transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Projects
