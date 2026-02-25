'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const footerLinks = [
  {
    section: 'Platform',
    links: [
      { label: 'Workouts', href: '/workouts' },
      { label: 'Nutrition', href: '/nutrition' },
      { label: 'Blog', href: '/blog' },
      { label: 'Progress', href: '/progress' },
    ],
  },
  {
    section: 'Resources',
    links: [
      { label: 'Getting Started', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    section: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12 md:mt-0">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-12 md:py-16"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
                RF
              </div>
              <span className="font-bold text-foreground">Radiant Fit</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium fitness training, nutrition guidance, and progress tracking to help you shine.
            </p>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section) => (
            <motion.div key={section.section} variants={itemVariants}>
              <h3 className="font-semibold text-foreground mb-4">{section.section}</h3>
              <ul className="space-y-2">
              {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="h-px bg-border mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            © 2024 Radiant Fit. All rights reserved. Shine bright. Stay strong.
          </motion.p>

          {/* Social Links */}
          <motion.div variants={containerVariants} initial="initial" whileInView="animate" viewport={{ once: true }} className="flex gap-4 mt-6 md:mt-0">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
                  variants={itemVariants}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
