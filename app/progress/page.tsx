'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { Sidebar, MobileNav } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PageWrapper } from '@/components/page-wrapper'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { TrendingUp, Calendar, Target, Flame } from 'lucide-react'

const progressData = [
  { week: 'Week 1', strength: 185, endurance: 4.2, weight: 195 },
  { week: 'Week 2', strength: 192, endurance: 4.5, weight: 194 },
  { week: 'Week 3', strength: 198, endurance: 4.8, weight: 193 },
  { week: 'Week 4', strength: 205, endurance: 5.1, weight: 192 },
  { week: 'Week 5', strength: 215, endurance: 5.4, weight: 190 },
  { week: 'Week 6', strength: 225, endurance: 5.7, weight: 189 },
  { week: 'Week 7', strength: 232, endurance: 6.0, weight: 187 },
  { week: 'Week 8', strength: 245, endurance: 6.3, weight: 185 },
]

const stats = [
  {
    label: 'Current Strength',
    value: '245 lbs',
    change: '+60 lbs',
    icon: TrendingUp,
    color: 'from-primary to-cyan-500',
  },
  {
    label: 'Endurance (miles)',
    value: '6.3 mi',
    change: '+2.1 mi',
    icon: Flame,
    color: 'from-secondary to-red-500',
  },
  {
    label: 'Weight Lost',
    value: '10 lbs',
    change: '-10 lbs',
    icon: Target,
    color: 'from-green-500 to-emerald-500',
  },
  {
    label: 'Workouts Completed',
    value: '32',
    change: '+32',
    icon: Calendar,
    color: 'from-purple-500 to-pink-500',
  },
]

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

type ProgressPageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function ProgressPage(props: ProgressPageProps) {
  use(props?.searchParams ?? Promise.resolve({}))
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        <section className="px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <PageWrapper title="Your Progress">
              {/* Stats Grid */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="group"
                    >
                      <div
                        className={`p-6 rounded-lg border border-border bg-card relative overflow-hidden`}
                      >
                        {/* Background gradient accent */}
                        <div
                          className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -mr-12 -mt-12`}
                        />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-muted-foreground font-medium">
                              {stat.label}
                            </span>
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} p-2 flex items-center justify-center`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                          </div>

                          <div className="mb-2">
                            <p className="text-3xl font-bold text-foreground">
                              {stat.value}
                            </p>
                          </div>

                          <p className="text-sm font-semibold text-primary">
                            {stat.change} this month
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Charts Section */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="space-y-6"
              >
                {/* Strength & Endurance Chart */}
                <motion.div variants={itemVariants} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Strength & Endurance Progress
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="week" stroke="#a0a0a0" />
                      <YAxis stroke="#a0a0a0" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#242424',
                          border: '1px solid #333333',
                          borderRadius: '8px',
                          color: '#ffffff',
                        }}
                        labelStyle={{ color: '#7FFF00' }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="strength"
                        stroke="#7FFF00"
                        strokeWidth={3}
                        dot={{ fill: '#7FFF00', r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Strength (lbs)"
                      />
                      <Line
                        type="monotone"
                        dataKey="endurance"
                        stroke="#FFA500"
                        strokeWidth={3}
                        dot={{ fill: '#FFA500', r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Endurance (miles)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Weight Progress Chart */}
                <motion.div variants={itemVariants} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Weight Progress
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="week" stroke="#a0a0a0" />
                      <YAxis stroke="#a0a0a0" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#242424',
                          border: '1px solid #333333',
                          borderRadius: '8px',
                          color: '#ffffff',
                        }}
                        labelStyle={{ color: '#7FFF00' }}
                      />
                      <Bar
                        dataKey="weight"
                        fill="#7FFF00"
                        radius={[8, 8, 0, 0]}
                        name="Weight (lbs)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="mt-12"
              >
                <motion.h3 variants={itemVariants} className="text-2xl font-bold text-foreground mb-6">
                  Recent Achievements
                </motion.h3>

                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {[
                    {
                      date: 'Feb 20, 2024',
                      achievement: 'Hit new personal record: 245 lbs bench press',
                      category: 'Milestone',
                    },
                    {
                      date: 'Feb 18, 2024',
                      achievement:
                        'Completed 32 consecutive workouts without missing',
                      category: 'Consistency',
                    },
                    {
                      date: 'Feb 15, 2024',
                      achievement: 'Lost 10 lbs total body weight',
                      category: 'Goal',
                    },
                    {
                      date: 'Feb 12, 2024',
                      achievement: 'Improved endurance by 50% (4.2 to 6.3 miles)',
                      category: 'Progress',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      className="p-4 bg-card border border-border rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">
                            {item.date}
                          </p>
                          <p className="text-foreground font-semibold">
                            {item.achievement}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold flex-shrink-0">
                          {item.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Goals Section */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="mt-12"
              >
                <motion.h3 variants={itemVariants} className="text-2xl font-bold text-foreground mb-6">
                  Current Goals
                </motion.h3>

                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  className="space-y-4"
                >
                  {[
                    { goal: 'Reach 275 lbs bench press', progress: 89 },
                    { goal: 'Run 10 miles without stopping', progress: 63 },
                    { goal: 'Achieve 8% body fat', progress: 45 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-card border border-border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-foreground font-semibold">
                          {item.goal}
                        </span>
                        <span className="text-primary font-bold">
                          {item.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </PageWrapper>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
