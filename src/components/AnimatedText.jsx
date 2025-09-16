import React from 'react'
import { motion } from 'framer-motion'

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  stagger = 0.05,
  as: Component = 'span'
}) => {
  const words = text.split(' ')

  return (
    <Component className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: "easeOut"
          }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  )
}

export default AnimatedText
