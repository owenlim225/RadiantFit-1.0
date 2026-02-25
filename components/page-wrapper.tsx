'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  title?: string
}

export function PageWrapper({ children, title }: PageWrapperProps) {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {title && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            {title}
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>
      )}
      {children}
    </motion.div>
  )
}
