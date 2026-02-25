'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Pencil,
  MoreVertical,
  Plus,
  Dumbbell,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const DEFAULT_SETS_PER_EXERCISE = 2

// Design tokens from DESIGN_WORKOUT_LOGGING_SCREEN.md
const colors = {
  primaryCta: '#007AFF',
  success: '#34C759',
  textPrimary: '#1C1C1E',
  textSecondary: '#3C3C43',
  cardBg: '#F2F2F7',
  surface: '#FFFFFF',
  inputBg: '#E5E5EA',
} as const

interface SetEntry {
  weight: string
  reps: string
  done: boolean
}

interface Exercise {
  id: string
  name: string
  target: string
  equipment: string
  bodyPart: string
  gifUrl: string
  instructions?: string[]
}

interface ExerciseWithSets extends Exercise {
  sets: SetEntry[]
}

interface WorkoutModalProps {
  isOpen: boolean
  onClose: () => void
  workoutName: string
  duration: string
  intensity: string
  focus: string[]
}

function createDefaultSets(count: number): SetEntry[] {
  return Array.from({ length: count }, () => ({
    weight: '',
    reps: '',
    done: false,
  }))
}

function ExerciseImageCircle({
  gifUrl,
  exerciseName,
}: {
  gifUrl: string
  exerciseName: string
}) {
  const [imageError, setImageError] = useState(false)
  useEffect(() => {
    setImageError(false)
  }, [gifUrl, exerciseName])
  const showPlaceholder = !gifUrl || imageError

  return (
    <div
      className="shrink-0 w-14 h-14 rounded-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: colors.inputBg }}
    >
      {showPlaceholder ? (
        <Dumbbell className="w-6 h-6" style={{ color: colors.textSecondary }} />
      ) : (
        <img
          src={gifUrl}
          alt={exerciseName}
          className="w-full h-full object-cover"
          loading="eager"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  )
}

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function WorkoutModal({
  isOpen,
  onClose,
  workoutName: initialWorkoutName,
  duration,
  intensity,
  focus,
}: WorkoutModalProps) {
  const [workoutName, setWorkoutName] = useState(initialWorkoutName)
  const [editingTitle, setEditingTitle] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [exercises, setExercises] = useState<ExerciseWithSets[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(
    null
  )
  const [allSetsDone, setAllSetsDone] = useState(false)

  useEffect(() => {
    setWorkoutName(initialWorkoutName)
  }, [initialWorkoutName, isOpen])

  useEffect(() => {
    if (!isOpen) return
    setElapsedSeconds(0)
    const id = setInterval(() => {
      setElapsedSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [isOpen])

  const formatFromApi = useCallback((data: any[]): ExerciseWithSets[] => {
    return (data || []).map((ex: any) => ({
      id: ex.id || `${ex.name}-${Math.random()}`,
      name: ex.name,
      target: ex.target || '',
      equipment: ex.equipment || '',
      bodyPart: ex.bodyPart || '',
      gifUrl: ex.gifUrl || '',
      instructions: ex.instructions || [],
      sets: createDefaultSets(DEFAULT_SETS_PER_EXERCISE),
    }))
  }, [])

  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    setLoading(true)
    setError(null)

    const demoExercises: ExerciseWithSets[] = [
      {
        id: '1',
        name: 'Push-ups',
        target: 'chest',
        equipment: 'body weight',
        bodyPart: 'chest',
        gifUrl: '',
        instructions: [
          'Get into a plank position',
          'Lower your body until chest is near floor',
          'Push back up to starting position',
        ],
        sets: createDefaultSets(DEFAULT_SETS_PER_EXERCISE),
      },
      {
        id: '2',
        name: 'Dumbbell Bench Press',
        target: 'chest',
        equipment: 'dumbbell',
        bodyPart: 'chest',
        gifUrl: '',
        instructions: [
          'Lie on a flat bench',
          'Hold dumbbells at shoulder height',
          'Press dumbbells upward',
        ],
        sets: createDefaultSets(DEFAULT_SETS_PER_EXERCISE),
      },
    ]

    async function fetchExercises() {
      try {
        let response = await fetch('/api/exercisedb/all?limit=8')
        let data: any[] = response.ok ? await response.json() : []
        if (
          !response.ok ||
          !Array.isArray(data) ||
          data.length === 0
        ) {
          const targetsRes = await fetch('/api/exercisedb/targets')
          const validTargets: string[] = targetsRes.ok
            ? await targetsRes.json()
            : []
          const validTarget =
            Array.isArray(validTargets) && validTargets.length > 0
              ? validTargets[0]
              : 'chest'
          response = await fetch(
            `/api/exercisedb/exercises?target=${encodeURIComponent(validTarget)}&limit=8`
          )
          data = response.ok ? await response.json() : []
        }
        if (cancelled) return
        if (Array.isArray(data) && data.length > 0) {
          const withSets = formatFromApi(data)
          setExercises(withSets)
          setExpandedExerciseId(withSets[0]?.id ?? null)
        } else {
          setError('No exercises found.')
          setExercises(demoExercises)
          setExpandedExerciseId(demoExercises[0]?.id ?? null)
        }
      } catch (err) {
        console.error('WorkoutModal: failed to fetch exercises', err)
        if (!cancelled) {
          setError('Failed to load exercises. Using demo exercises.')
          setExercises(demoExercises)
          setExpandedExerciseId(demoExercises[0]?.id ?? null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchExercises()
    return () => {
      cancelled = true
    }
  }, [isOpen, formatFromApi])

  const updateExerciseSets = useCallback(
    (exerciseId: string, updater: (sets: SetEntry[]) => SetEntry[]) => {
      setExercises((prev) =>
        prev.map((ex) =>
          ex.id === exerciseId ? { ...ex, sets: updater(ex.sets) } : ex
        )
      )
    },
    []
  )

  const setSetDone = useCallback(
    (exerciseId: string, setIndex: number, done: boolean) => {
      updateExerciseSets(exerciseId, (sets) =>
        sets.map((s, i) => (i === setIndex ? { ...s, done } : s))
      )
    },
    [updateExerciseSets]
  )

  const addSet = useCallback(
    (exerciseId: string) => {
      updateExerciseSets(exerciseId, (sets) => [
        ...sets,
        { weight: '', reps: '', done: false },
      ])
    },
    [updateExerciseSets]
  )

  const updateSetValues = useCallback(
    (
      exerciseId: string,
      setIndex: number,
      field: 'weight' | 'reps',
      value: string
    ) => {
      updateExerciseSets(exerciseId, (sets) =>
        sets.map((s, i) =>
          i === setIndex ? { ...s, [field]: value } : s
        )
      )
    },
    [updateExerciseSets]
  )

  const removeExercise = useCallback((exerciseId: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== exerciseId))
  }, [])

  const exerciseIdList = exercises.map((e) => e.id).join(',')
  useEffect(() => {
    if (exercises.length === 0) {
      setExpandedExerciseId(null)
      return
    }
    setExpandedExerciseId((current) =>
      exercises.some((e) => e.id === current) ? current : exercises[0]!.id
    )
  }, [exerciseIdList])

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0)
  const doneSets = exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.done).length,
    0
  )
  const allDone = totalSets > 0 && doneSets === totalSets

  useEffect(() => {
    setAllSetsDone(allDone)
  }, [allDone])

  const handleAllCheckbox = useCallback(
    (checked: boolean) => {
      setAllSetsDone(checked)
      setExercises((prev) =>
        prev.map((ex) => ({
          ...ex,
          sets: ex.sets.map((s) => ({ ...s, done: checked })),
        }))
      )
    },
    []
  )

  const getNextIncompleteSet = (): {
    exerciseId: string
    setIndex: number
  } | null => {
    for (const ex of exercises) {
      const idx = ex.sets.findIndex((s) => !s.done)
      if (idx !== -1) return { exerciseId: ex.id, setIndex: idx }
    }
    return null
  }

  const handleLogNextSet = useCallback(() => {
    const next = getNextIncompleteSet()
    if (!next) return
    setSetDone(next.exerciseId, next.setIndex, true)
    setExpandedExerciseId(next.exerciseId)
  }, [exercises, setSetDone])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          backgroundColor: colors.surface,
          paddingTop: 'env(safe-area-inset-top, 0)',
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
        }}
      >
        {/* Header */}
        <header
          className="flex items-center justify-between px-4 shrink-0 border-b border-[#E5E5EA]"
          style={{
            minHeight: 61,
            backgroundColor: colors.surface,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2 text-[#1C1C1E] active:opacity-70"
            aria-label="Back"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: colors.textPrimary }} />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center min-w-0 px-2">
            {editingTitle ? (
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingTitle(false)
                }}
                className="w-full max-w-[240px] text-center text-base font-medium border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-[#007AFF]/30"
                style={{ color: colors.textPrimary }}
                autoFocus
              />
            ) : (
              <span
                className="text-base font-medium truncate max-w-full"
                style={{ color: colors.textPrimary }}
              >
                {workoutName}
              </span>
            )}
            <span
              className="text-[28px] font-bold leading-tight"
              style={{ color: colors.textPrimary }}
            >
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setEditingTitle(true)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#1C1C1E] active:opacity-70"
            aria-label="Edit title"
          >
            <Pencil className="w-4 h-4" style={{ color: colors.textPrimary }} />
          </button>
        </header>

        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto px-4 py-4"
          style={{ maxWidth: 430, margin: '0 auto', width: '100%' }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div
                className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin mb-4"
                style={{ borderColor: colors.primaryCta }}
              />
              <p style={{ color: colors.textSecondary }}>Loading exercises...</p>
            </div>
          ) : error ? (
            <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/10">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold" style={{ color: colors.textPrimary }}>
                  {error}
                </p>
                <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                  Showing demo exercises instead.
                </p>
              </div>
            </div>
          ) : null}

          {!loading && exercises.length > 0 ? (
            <div className="space-y-3">
              {exercises.map((exercise) => {
                const isExpanded = expandedExerciseId === exercise.id
                const doneCount = exercise.sets.filter((s) => s.done).length
                const totalCount = exercise.sets.length
                const activeSetIndex = exercise.sets.findIndex((s) => !s.done)

                return (
                  <div
                    key={exercise.id}
                    className="rounded-2xl p-4 shadow-sm"
                    style={{
                      backgroundColor: colors.cardBg,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* Card header */}
                    <div
                      className="flex items-start gap-3 cursor-pointer"
                      onClick={() =>
                        setExpandedExerciseId(isExpanded ? null : exercise.id)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setExpandedExerciseId(isExpanded ? null : exercise.id)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center justify-center w-8 h-8 shrink-0">
                        {isExpanded ? (
                          <ChevronUp
                            className="w-5 h-5"
                            style={{ color: colors.textPrimary }}
                          />
                        ) : (
                          <ChevronDown
                            className="w-5 h-5"
                            style={{ color: colors.textPrimary }}
                          />
                        )}
                      </div>
                      <ExerciseImageCircle
                        gifUrl={exercise.gifUrl}
                        exerciseName={exercise.name}
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-semibold truncate"
                          style={{
                            color: colors.textPrimary,
                            fontSize: isExpanded ? 20 : 16,
                          }}
                        >
                          {exercise.name} • {exercise.equipment}
                        </h3>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: colors.textSecondary }}
                        >
                          {doneCount}/{totalCount} Done
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Popover>
                          <PopoverTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 active:opacity-70"
                              style={{ color: colors.textPrimary }}
                              aria-label="Instructions"
                            >
                              <HelpCircle className="w-4 h-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="end"
                            className="max-w-[280px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <p className="font-medium mb-2" style={{ color: colors.textPrimary }}>
                              Instructions
                            </p>
                            {exercise.instructions && exercise.instructions.length > 0 ? (
                              <ol className="list-decimal list-inside space-y-1 text-sm" style={{ color: colors.textSecondary }}>
                                {exercise.instructions.map((step, i) => (
                                  <li key={i}>{step}</li>
                                ))}
                              </ol>
                            ) : (
                              <p className="text-sm" style={{ color: colors.textSecondary }}>
                                No instructions available.
                              </p>
                            )}
                          </PopoverContent>
                        </Popover>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded hover:bg-black/5 active:opacity-70"
                              style={{ color: colors.textPrimary }}
                              aria-label="Options"
                            >
                              <MoreVertical className="w-6 h-6" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeExercise(exercise.id)
                              }}
                            >
                              Remove exercise
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Set rows (expanded only) */}
                    {isExpanded ? (
                      <div className="mt-4 space-y-3 pl-0">
                        {exercise.sets.map((setEntry, setIndex) => {
                          const isActive = activeSetIndex === setIndex
                          return (
                            <div
                              key={setIndex}
                              className="flex items-center gap-3 rounded-xl p-3 relative"
                              style={{
                                backgroundColor: colors.surface,
                                borderRadius: 12,
                              }}
                            >
                              {isActive ? (
                                <div
                                  className="absolute left-0 top-2 bottom-2 w-2 rounded-full shrink-0"
                                  style={{
                                    backgroundColor: colors.success,
                                    width: 8,
                                  }}
                                />
                              ) : null}
                              <div className="flex items-center gap-3 flex-1 min-w-0 pl-2">
                                <Checkbox
                                  checked={setEntry.done}
                                  onCheckedChange={(checked) =>
                                    setSetDone(
                                      exercise.id,
                                      setIndex,
                                      checked === true
                                    )
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                  className="rounded-full border-2 w-5 h-5 data-[state=checked]:bg-[#34C759] data-[state=checked]:border-[#34C759]"
                                />
                                <span
                                  className="w-5 text-base shrink-0"
                                  style={{ color: colors.textPrimary }}
                                >
                                  {setIndex + 1}
                                </span>
                                <div className="flex items-center gap-1 flex-1 min-w-0">
                                  <Input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="0"
                                    value={setEntry.weight}
                                    onChange={(e) =>
                                      updateSetValues(
                                        exercise.id,
                                        setIndex,
                                        'weight',
                                        e.target.value
                                      )
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-[72px] h-10 text-base font-semibold rounded-lg border-0 text-center"
                                    style={{
                                      backgroundColor: colors.inputBg,
                                      color: colors.textPrimary,
                                    }}
                                  />
                                  <span
                                    className="text-sm shrink-0"
                                    style={{ color: colors.textSecondary }}
                                  >
                                    KG
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 flex-1 min-w-0">
                                  <Input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="0"
                                    value={setEntry.reps}
                                    onChange={(e) =>
                                      updateSetValues(
                                        exercise.id,
                                        setIndex,
                                        'reps',
                                        e.target.value
                                      )
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-[72px] h-10 text-base font-semibold rounded-lg border-0 text-center"
                                    style={{
                                      backgroundColor: colors.inputBg,
                                      color: colors.textPrimary,
                                    }}
                                  />
                                  <span
                                    className="text-sm shrink-0"
                                    style={{ color: colors.textSecondary }}
                                  >
                                    Reps
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            addSet(exercise.id)
                          }}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-base active:opacity-80"
                          style={{
                            backgroundColor: colors.inputBg,
                            color: colors.textPrimary,
                            borderRadius: 12,
                          }}
                        >
                          <Plus className="w-5 h-5" />
                          Add a set
                        </button>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          ) : null}
        </main>

        {/* Bottom bar */}
        <footer
          className="shrink-0 flex items-center gap-4 px-4 py-3 border-t border-[#E5E5EA]"
          style={{
            minHeight: 62,
            backgroundColor: colors.surface,
          }}
        >
          <label className="flex flex-col items-center gap-0.5 cursor-pointer min-w-[44px] min-h-[44px] justify-center">
            <Checkbox
              checked={allSetsDone}
              onCheckedChange={(checked) => handleAllCheckbox(checked === true)}
              className="rounded border-2 w-5 h-5 data-[state=checked]:bg-[#007AFF] data-[state=checked]:border-[#007AFF]"
            />
            <span
              className="text-sm font-medium"
              style={{ color: colors.textPrimary }}
            >
              ALL
            </span>
          </label>
          <button
            type="button"
            onClick={handleLogNextSet}
            disabled={allDone}
            className="flex-1 min-h-[44px] flex items-center justify-center rounded-xl font-medium text-base text-white active:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: colors.primaryCta,
              borderRadius: 12,
            }}
          >
            LOG NEXT SET
          </button>
        </footer>
      </motion.div>
    </AnimatePresence>
  )
}
