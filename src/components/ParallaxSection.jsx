import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ParallaxSection = ({ 
  children, 
  className = '', 
  speed = 0.5,
  offset = ["start end", "end start"]
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxSection
