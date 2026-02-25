'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sidebar, MobileNav } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PageWrapper } from '@/components/page-wrapper'
import { ChevronDown, Flame, Droplet, Zap, Target } from 'lucide-react'

const nutritionPlans = [
  {
    id: 1,
    name: 'Muscle Gain Protocol',
    description: 'High protein, caloric surplus for maximum muscle growth',
    macros: { protein: '1.2g/lb', carbs: 'High', fat: 'Moderate' },
    meals: [
      {
        name: 'Breakfast',
        items: ['Oats', 'Eggs', 'Banana', 'Almond Butter'],
        calories: 650,
      },
      {
        name: 'Mid-Morning Snack',
        items: ['Protein Shake', 'Granola', 'Berries'],
        calories: 300,
      },
      {
        name: 'Lunch',
        items: ['Grilled Chicken', 'Rice', 'Vegetables'],
        calories: 750,
      },
      {
        name: 'Pre-Workout',
        items: ['Apple', 'Peanut Butter'],
        calories: 250,
      },
      {
        name: 'Dinner',
        items: ['Salmon', 'Sweet Potato', 'Broccoli'],
        calories: 700,
      },
      {
        name: 'Evening Snack',
        items: ['Greek Yogurt', 'Honey'],
        calories: 200,
      },
    ],
  },
  {
    id: 2,
    name: 'Fat Loss Shred',
    description: 'Caloric deficit with balanced nutrition for lean physique',
    macros: { protein: '1.0g/lb', carbs: 'Moderate', fat: 'Low' },
    meals: [
      {
        name: 'Breakfast',
        items: ['Egg Whites', 'Oatmeal', 'Berries'],
        calories: 350,
      },
      {
        name: 'Mid-Morning Snack',
        items: ['Protein Shake', 'Apple'],
        calories: 200,
      },
      {
        name: 'Lunch',
        items: ['Chicken Breast', 'Brown Rice', 'Vegetables'],
        calories: 450,
      },
      {
        name: 'Pre-Workout',
        items: ['Banana'],
        calories: 100,
      },
      {
        name: 'Dinner',
        items: ['Turkey', 'Quinoa', 'Vegetables'],
        calories: 450,
      },
      {
        name: 'Evening Snack',
        items: ['Casein Shake'],
        calories: 150,
      },
    ],
  },
  {
    id: 3,
    name: 'Athlete Performance',
    description: 'Optimized for athletic performance and recovery',
    macros: { protein: '0.8g/lb', carbs: 'Very High', fat: 'Moderate' },
    meals: [
      {
        name: 'Breakfast',
        items: ['Pancakes', 'Eggs', 'Orange Juice'],
        calories: 750,
      },
      {
        name: 'Mid-Morning Snack',
        items: ['Trail Mix', 'Banana'],
        calories: 300,
      },
      {
        name: 'Lunch',
        items: ['Beef', 'Pasta', 'Vegetables'],
        calories: 800,
      },
      {
        name: 'Pre-Workout',
        items: ['White Rice', 'Honey'],
        calories: 400,
      },
      {
        name: 'Dinner',
        items: ['Fish', 'Potatoes', 'Vegetables'],
        calories: 750,
      },
      {
        name: 'Evening Snack',
        items: ['Chocolate Milk'],
        calories: 300,
      },
    ],
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

function NutritionAccordion({ plan }: { plan: (typeof nutritionPlans)[0] }) {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      {plan.meals.map((meal, index) => (
        <motion.div
          key={index}
          className="border border-border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === index ? null : index)}
            className="w-full px-4 py-4 flex items-center justify-between bg-card hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3 text-left">
              <span className="font-semibold text-foreground">{meal.name}</span>
              <span className="text-sm text-primary font-bold">
                {meal.calories} cal
              </span>
            </div>
            <motion.div
              animate={{ rotate: expanded === index ? 180 : 0 }}
              className="text-muted-foreground"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={expanded === index ? { height: 'auto' } : { height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 bg-background border-t border-border">
              <ul className="space-y-2">
                {meal.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function NutritionPage() {
  const [selectedPlan, setSelectedPlan] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        <section className="px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <PageWrapper title="Nutrition Plans">
              {/* Plan Selection */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
              >
                {nutritionPlans.map((plan, index) => (
                  <motion.button
                    key={plan.id}
                    variants={itemVariants}
                    onClick={() => setSelectedPlan(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      selectedPlan === index
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-muted'
                    }`}
                  >
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </motion.button>
                ))}
              </motion.div>

              {/* Macros Overview */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
              >
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Protein</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {nutritionPlans[selectedPlan].macros.protein}
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Flame className="w-5 h-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">Carbs</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {nutritionPlans[selectedPlan].macros.carbs}
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Droplet className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-muted-foreground">Fat</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {nutritionPlans[selectedPlan].macros.fat}
                  </p>
                </motion.div>
              </motion.div>

              {/* Meal Plan */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Daily Meal Plan
                </h3>
                <NutritionAccordion plan={nutritionPlans[selectedPlan]} />
              </motion.div>

              {/* Tips Section */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg"
                >
                  <h4 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Key Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Stay hydrated throughout the day</li>
                    <li>• Time your carbs around workouts</li>
                    <li>• Track your progress weekly</li>
                  </ul>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-lg"
                >
                  <h4 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-secondary" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Meal prep on weekends</li>
                    <li>• Use a food scale for accuracy</li>
                    <li>• Adjust based on results</li>
                  </ul>
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
