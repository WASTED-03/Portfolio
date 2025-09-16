import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CaseStudy from './pages/CaseStudy'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                  <About />
                  <Projects />
                  <Contact />
                </motion.div>
              } 
            />
            <Route 
              path="/case-study/:id" 
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <CaseStudy />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
