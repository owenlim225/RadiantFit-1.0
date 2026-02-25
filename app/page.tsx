'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sidebar, MobileNav } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Dumbbell, Apple, BookOpen, TrendingUp, ArrowRight } from 'lucide-react'

const backgroundImages = ['/hero-bg-1.jpg', '/hero-bg-2.jpg']

const features = [
  {
    icon: Dumbbell,
    title: 'Structured Workouts',
    description: 'Progressive training programs designed for all fitness levels',
    href: '/workouts',
  },
  {
    icon: Apple,
    title: 'Nutrition Guidance',
    description: 'Complete nutrition plans and meal strategies for your goals',
    href: '/nutrition',
  },
  {
    icon: BookOpen,
    title: 'Expert Blog',
    description: 'Insights, tips, and strategies from fitness professionals',
    href: '/blog',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your growth with detailed analytics and insights',
    href: '/progress',
  },
]

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const HERO_BG_OPACITY = 0.4

function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 60000)
    return () => clearInterval(interval)
  }, [mounted])

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      {backgroundImages.map((src, index) => (
        <motion.img
          key={src}
          initial={{ opacity: index === 0 ? HERO_BG_OPACITY : 0 }}
          animate={{ opacity: activeIndex === index ? HERO_BG_OPACITY : 0 }}
          transition={{ duration: 1 }}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        {/* Hero Section */}
        <section className="min-h-screen md:min-h-screen flex items-center justify-center px-4 py-12 md:py-0 relative overflow-hidden">
          {/* Background Images */}
          <HeroBackground />

          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="max-w-4xl text-center relative z-10"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 border border-primary text-primary rounded-full text-sm font-semibold">
                  Premium Fitness Training
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance"
            >
              Radiant <span className="text-primary">Fit</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
            >
              Unlock your radiant strength. Premium fitness training, expert nutrition guidance, and real-time progress tracking all in one platform.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/workouts">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center gap-2 w-full sm:w-auto justify-center hover:shadow-lg hover:shadow-primary/50 transition-shadow"
                >
                  Start Training <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/progress">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-secondary/20 text-secondary border border-secondary rounded-lg font-semibold w-full sm:w-auto hover:bg-secondary/30 transition-colors"
                >
                  View Progress
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 md:gap-8 mt-12"
            >
              {[
                { label: 'Programs', value: '50+' },
                { label: 'Workouts', value: '200+' },
                { label: 'Tracking', value: 'Real-time' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-4"
                >
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-12 md:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Everything You Need
              </h2>
              <p className="text-muted-foreground text-lg">
                Complete tools for your fitness journey
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Link href={feature.href}>
                      <div className="h-full p-6 md:p-8 bg-card border border-border rounded-lg hover:border-primary/50 transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12 md:py-24 border-t border-border">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Ready to Transform?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands achieving their fitness goals with our structured programs and expert guidance.
            </p>
            <Link href="/workouts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-shadow"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
