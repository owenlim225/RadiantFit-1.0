'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar, MobileNav } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PageWrapper } from '@/components/page-wrapper'
import { WorkoutModal } from '@/components/workout-modal'
import { Clock, Flame, Users, Star, ChevronRight } from 'lucide-react'

type ExerciseCard = {
  id: string
  name: string
  bodyPart?: string
  target?: string
  equipment?: string
  gifUrl?: string
}

const workoutTiers = [
  {
    level: 'Beginner',
    color: 'from-blue-500 to-cyan-500',
    workouts: [
      {
        id: 1,
        name: 'Full Body Fundamentals',
        duration: '45 min',
        difficulty: 'Beginner',
        intensity: 'Low',
        workouts: 12,
        rating: 4.8,
        description: 'Master the basics with essential movements for beginners',
        focus: ['Strength', 'Endurance'],
      },
      {
        id: 2,
        name: 'Core Activation',
        duration: '30 min',
        difficulty: 'Beginner',
        intensity: 'Low',
        workouts: 8,
        rating: 4.7,
        description: 'Build a strong foundation with core-focused exercises',
        focus: ['Core', 'Stability'],
      },
      {
        id: 3,
        name: 'Cardio Basics',
        duration: '20 min',
        difficulty: 'Beginner',
        intensity: 'Low',
        workouts: 15,
        rating: 4.6,
        description: 'Improve cardiovascular health with beginner-friendly cardio',
        focus: ['Cardio', 'Endurance'],
      },
    ],
  },
  {
    level: 'Intermediate',
    color: 'from-amber-500 to-orange-500',
    workouts: [
      {
        id: 4,
        name: 'Hypertrophy Split',
        duration: '60 min',
        difficulty: 'Intermediate',
        intensity: 'Medium',
        workouts: 16,
        rating: 4.9,
        description: 'Build muscle with scientifically-designed splits',
        focus: ['Hypertrophy', 'Strength'],
      },
      {
        id: 5,
        name: 'Power & Explosiveness',
        duration: '50 min',
        difficulty: 'Intermediate',
        intensity: 'Medium',
        workouts: 12,
        rating: 4.8,
        description: 'Develop explosive power for athletic performance',
        focus: ['Power', 'Strength'],
      },
      {
        id: 6,
        name: 'HIIT Training',
        duration: '30 min',
        difficulty: 'Intermediate',
        intensity: 'High',
        workouts: 20,
        rating: 4.7,
        description: 'Maximize results with high-intensity interval training',
        focus: ['Cardio', 'Fat Loss'],
      },
    ],
  },
  {
    level: 'Advanced',
    color: 'from-red-500 to-pink-600',
    workouts: [
      {
        id: 7,
        name: 'Elite Strength Program',
        duration: '75 min',
        difficulty: 'Advanced',
        intensity: 'High',
        workouts: 20,
        rating: 5.0,
        description: 'Compete at elite levels with periodized strength training',
        focus: ['Strength', 'Power'],
      },
      {
        id: 8,
        name: 'Conditioning Specialist',
        duration: '60 min',
        difficulty: 'Advanced',
        intensity: 'High',
        workouts: 18,
        rating: 4.9,
        description: 'Advanced conditioning for peak athletic performance',
        focus: ['Conditioning', 'Endurance'],
      },
      {
        id: 9,
        name: 'Bodybuilding Mastery',
        duration: '90 min',
        difficulty: 'Advanced',
        intensity: 'High',
        workouts: 24,
        rating: 5.0,
        description: 'Advanced muscle-building strategies for competitors',
        focus: ['Hypertrophy', 'Aesthetics'],
      },
    ],
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

export default function WorkoutsPage() {
  const [selectedLevel, setSelectedLevel] = useState('Beginner')
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [exerciseCards, setExerciseCards] = useState<ExerciseCard[]>([])
  const [exerciseError, setExerciseError] = useState<string | null>(null)
  const selectedTier = workoutTiers.find((tier) => tier.level === selectedLevel)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setApiStatus('loading')
        const res = await fetch('/api/exercise-status')
        const data = await res.json().catch(() => null)

        if (!res.ok) {
          const message =
            (data && (data.error || data.message)) || `Exercise API error (${res.status})`
          throw new Error(message)
        }

        setApiStatus('ok')
        setApiMessage(
          typeof data === 'string'
            ? data
            : data.gateway
            ? `Gateway: ${data.gateway} • Exercise: ${data.exerciseService ?? 'unknown'}`
            : data.status || data.message || 'Exercise API online',
        )
      } catch (error) {
        console.error('Failed to load ExerciseDB status', error)
        setApiStatus('error')
        setApiMessage(error instanceof Error ? error.message : 'Exercise API unavailable')
      }
    }

    checkStatus()
  }, [])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setExerciseError(null)
        const res = await fetch('/api/exercisedb/images?limit=9')
        const data = await res.json()

        if (!res.ok) {
          const message = (data && (data.error || data.message)) || 'Failed to load exercises'
          throw new Error(message)
        }

        setExerciseCards(data as ExerciseCard[])
      } catch (error) {
        console.error('Failed to load exercise cards', error)
        setExerciseError(
          error instanceof Error ? error.message : 'Unable to load exercise data',
        )
      }
    }

    fetchExercises()
  }, [])

  const handleStartProgram = (workout: any) => {
    setSelectedWorkout(workout)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedWorkout(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        <section className="px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <PageWrapper title="Training Programs">
              {/* Exercise API Status */}
              <div className="mb-6 flex items-center justify-between gap-4 text-xs md:text-sm text-muted-foreground">
                <span>Exercise database connection</span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 border ${
                    apiStatus === 'ok'
                      ? 'border-emerald-500 text-emerald-400'
                      : apiStatus === 'loading'
                      ? 'border-border'
                      : 'border-red-500 text-red-400'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      apiStatus === 'ok'
                        ? 'bg-emerald-500'
                        : apiStatus === 'loading'
                        ? 'bg-amber-400'
                        : 'bg-red-500'
                    }`}
                  />
                  {apiStatus === 'loading'
                    ? 'Checking ExerciseDB status...'
                    : apiMessage || 'Status unknown'}
                </span>
              </div>
              {/* Level Filter */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="mb-12"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {workoutTiers.map((tier) => (
                    <motion.button
                      key={tier.level}
                      variants={itemVariants}
                      onClick={() => setSelectedLevel(tier.level)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedLevel === tier.level
                          ? `bg-gradient-to-r ${tier.color} text-white shadow-lg shadow-current`
                          : 'bg-card text-foreground border border-border hover:border-muted'
                      }`}
                    >
                      {tier.level}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Workout Grid */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {selectedTier?.workouts.map((workout, index) => {
                  const tierIndex = workoutTiers.findIndex(
                    (tier) => tier.level === selectedLevel,
                  )
                  const perTier = 3
                  const startIndex = tierIndex * perTier
                  const exercise = exerciseCards[startIndex + index]

                  const combinedTags = [
                    ...workout.focus,
                    ...(exercise?.bodyPart ? [exercise.bodyPart] : []),
                    ...(exercise?.target ? [exercise.target] : []),
                    ...(exercise?.equipment ? [exercise.equipment] : []),
                  ]

                  return (
                  <motion.div
                    key={workout.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group h-full"
                  >
                    <div className="h-full p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all overflow-hidden relative">
                      {/* Background gradient accent */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${selectedTier?.color} opacity-5 rounded-full -mr-16 -mt-16`}
                      />

                      <div className="relative z-10">
                        {/* Exercise image (from ExerciseDB) */}
                        {exercise?.gifUrl && (
                          <div className="mb-4 rounded-lg overflow-hidden bg-muted aspect-video">
                            <img
                              src={exercise.gifUrl}
                              alt={exercise.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {exercise?.name || workout.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {workout.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                            <span className="text-sm font-semibold text-secondary">
                              {workout.rating}
                            </span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-border">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-primary mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-semibold">
                                {workout.duration}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">Duration</span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                              <Flame className="w-4 h-4" />
                              <span className="text-sm font-semibold">
                                {workout.intensity}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Intensity
                            </span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-primary mb-1">
                              <Users className="w-4 h-4" />
                              <span className="text-sm font-semibold">
                                {workout.workouts}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Sessions
                            </span>
                          </div>
                        </div>

                        {/* Focus Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {combinedTags.map((tag, tagIndex) => (
                            <span
                              key={`${tag}-${tagIndex}`}
                              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={() => handleStartProgram(workout)}
                          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
                        >
                          Start Program <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )})}
              </motion.div>
            </PageWrapper>
          </div>
        </section>

        <Footer />

        {selectedWorkout && (
          <WorkoutModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            workoutName={selectedWorkout.name}
            duration={selectedWorkout.duration}
            intensity={selectedWorkout.intensity}
            focus={selectedWorkout.focus}
          />
        )}
      </main>
    </div>
  )
}
