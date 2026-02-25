'use client'

import { motion } from 'framer-motion'
import { Sidebar, MobileNav } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PageWrapper } from '@/components/page-wrapper'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Progressive Overload',
    excerpt:
      'Understand how progressive overload is the fundamental principle for continuous muscle growth and strength gains.',
    author: 'Coach Marcus',
    date: '2024-02-15',
    readTime: 8,
    category: 'Training',
    image: 'bg-gradient-to-br from-primary to-cyan-500',
  },
  {
    id: 2,
    title: 'Nutrition Timing: Myth vs Reality',
    excerpt:
      'Debunk common myths about meal timing and learn what actually matters for your fitness goals.',
    author: 'Dr. Sarah Chen',
    date: '2024-02-12',
    readTime: 6,
    category: 'Nutrition',
    image: 'bg-gradient-to-br from-secondary to-red-500',
  },
  {
    id: 3,
    title: 'Recovery is Where the Magic Happens',
    excerpt:
      'Learn why recovery is just as important as your workouts for achieving your fitness goals.',
    author: 'Coach Marcus',
    date: '2024-02-10',
    readTime: 7,
    category: 'Recovery',
    image: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  {
    id: 4,
    title: 'Building Mental Toughness for Long-Term Success',
    excerpt:
      'The mental aspect of fitness is often overlooked but crucial for sustained success and motivation.',
    author: 'Coach Alex',
    date: '2024-02-08',
    readTime: 10,
    category: 'Mindset',
    image: 'bg-gradient-to-br from-amber-500 to-orange-500',
  },
  {
    id: 5,
    title: 'Cardio vs Weights: The Real Answer',
    excerpt:
      'End the debate once and for all. Learn the optimal combination of cardio and resistance training.',
    author: 'Dr. Sarah Chen',
    date: '2024-02-05',
    readTime: 9,
    category: 'Training',
    image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    id: 6,
    title: 'Supplementation: What Actually Works',
    excerpt:
      'An evidence-based guide to supplements that actually deliver results and which ones are a waste.',
    author: 'Coach Marcus',
    date: '2024-02-02',
    readTime: 11,
    category: 'Nutrition',
    image: 'bg-gradient-to-br from-green-500 to-emerald-500',
  },
]

const categories = ['All', 'Training', 'Nutrition', 'Recovery', 'Mindset']

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        <section className="px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <PageWrapper title="Expert Insights">
              {/* Featured Post */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 overflow-hidden rounded-lg border border-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Featured Image */}
                  <div
                    className={`${blogPosts[0].image} h-64 md:h-full min-h-96`}
                  />

                  {/* Featured Content */}
                  <div className="bg-card p-8 flex flex-col justify-center">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold w-fit mb-4"
                    >
                      Featured
                    </motion.span>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-bold text-foreground mb-4"
                    >
                      {blogPosts[0].title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-muted-foreground mb-6 text-lg"
                    >
                      {blogPosts[0].excerpt}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-6 text-sm text-muted-foreground mb-6"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {blogPosts[0].author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(blogPosts[0].date).toLocaleDateString()}
                      </div>
                      <div>{blogPosts[0].readTime} min read</div>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-fit px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Category Filter */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="mb-12 flex flex-wrap gap-3"
              >
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {cat}
                  </motion.button>
                ))}
              </motion.div>

              {/* Blog Grid */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {blogPosts.slice(1).map((post) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer h-full"
                  >
                    <div className="h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all">
                      {/* Image */}
                      <div className={`${post.image} h-48 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div>{post.readTime} min</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-card border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Load More Articles
                </motion.button>
              </motion.div>
            </PageWrapper>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
