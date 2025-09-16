import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const RevealOnScroll = ({ 
  children, 
  className = '',
  direction = 'up',
  distance = 50,
  duration = 0.6,
  delay = 0,
  once = true
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export default RevealOnScroll
