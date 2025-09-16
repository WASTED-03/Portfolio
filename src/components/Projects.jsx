import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full Stack",
      featured: true
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A responsive portfolio website with smooth animations and modern design principles.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8b6ef3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["React", "Framer Motion", "TailwindCSS"],
      category: "Frontend",
      featured: true
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80",
      tags: ["Vue.js", "Socket.io", "Express"],
      category: "Full Stack",
      featured: true
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "An interactive weather dashboard with beautiful data visualizations and forecasts.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["React", "D3.js", "API Integration"],
      category: "Frontend",
      featured: false
    },
    {
      id: 5,
      title: "Social Media Analytics",
      description: "A comprehensive analytics platform for social media performance tracking and insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["Python", "Django", "PostgreSQL", "Chart.js"],
      category: "Backend",
      featured: false
    },
    {
      id: 6,
      title: "Mobile Banking App",
      description: "A secure mobile banking application with biometric authentication and transaction management.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      tags: ["React Native", "Node.js", "Blockchain"],
      category: "Mobile",
      featured: true
    }
  ]

  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  const handleProjectClick = (projectId) => {
    navigate(`/case-study/${projectId}`)
  }

  return (
    <section id="projects" ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-800 mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of my recent work showcasing different technologies and design approaches.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <motion.button
                      className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                    </motion.button>
                    <motion.button
                      className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                  <motion.div
                    className="text-primary-600 group-hover:translate-x-1 transition-transform duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-display font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-display font-semibold text-gray-800 mb-8 text-center">
            More Projects
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group flex items-center space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ x: 10 }}
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {project.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded">
                      {project.category}
                    </span>
                    <ArrowRight size={16} className="text-primary-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
