import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import { lazy, Suspense } from 'react'
const Hero = lazy(() => import('./components/Hero'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'
import BackgroundAnimation from './components/BackgroundAnimation'
import CursorEffect from './components/CursorEffect'
// Removed InfiniteScrollLayout to restore natural vertical scrolling

function AppContent() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const isCaseStudy = location.pathname.startsWith('/case-study/')

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
    <div className="App">
      {!isCaseStudy && <Navbar />}
      <ScrollToTop />
      <BackgroundAnimation />
      <CursorEffect />
        
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
                  <Suspense fallback={<Loader />}>
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                  </Suspense>
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
                  <Suspense fallback={<Loader />}>
                    <CaseStudy />
                  </Suspense>
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
