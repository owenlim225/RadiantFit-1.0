# Development Guide - Results Over Excuses

## 🔧 Local Development Setup

### Prerequisites
- Node.js 18+ (recommend v20.x)
- pnpm 8+ (or npm/yarn as alternative)
- Git for version control

### Initial Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open browser
# Navigate to http://localhost:3000
```

### Development Scripts

```bash
# Start dev server with verbose logging
pnpm dev

# Build for production
pnpm build

# Start production server (after build)
pnpm start

# Run linter
pnpm lint

# Run linter with fix
pnpm lint --fix
```

## 📁 Project Structure

### App Directory Structure
```
app/
├── layout.tsx           # Root layout component
├── page.tsx             # Home page
├── globals.css          # Global styles & design tokens
├── workouts/
│   └── page.tsx        # Workouts page
├── nutrition/
│   └── page.tsx        # Nutrition page
├── blog/
│   └── page.tsx        # Blog page
└── progress/
    └── page.tsx        # Progress page
```

### Components Directory
```
components/
├── navigation.tsx       # Sidebar + Mobile navigation
├── page-wrapper.tsx     # Page title header wrapper
├── footer.tsx           # Global footer component
└── ui/                  # shadcn/ui components (pre-installed)
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    └── ... (30+ components)
```

## 🎯 Key Development Patterns

### Page Template

```typescript
'use client'

import { motion } from 'framer-motion'
import { Sidebar, MobileNav } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PageWrapper } from '@/components/page-wrapper'

export default function NewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="md:ml-64 pt-16 md:pt-0 pb-16 md:pb-0">
        <section className="px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <PageWrapper title="Page Title">
              {/* Page content here */}
            </PageWrapper>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
```

### Animation Patterns

**Staggered list animations:**
```typescript
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

<motion.div variants={containerVariants} initial="initial" animate="animate">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

**Hover effects:**
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-4 py-2 bg-primary rounded-lg"
>
  Click Me
</motion.button>
```

**Scroll-triggered animations:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Animates when scrolled into view
</motion.div>
```

## 🎨 Styling Guidelines

### Using Design Tokens

```typescript
// ✅ GOOD - Using design tokens
className="bg-background text-foreground border-border rounded-lg p-4"

// ❌ BAD - Using direct colors
className="bg-black text-white border-gray-300 rounded-lg p-4"
```

### Common Classes

```typescript
// Layout
"flex items-center justify-between"
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Spacing (multiples of 4px/0.25rem)
"p-4 m-2 gap-6"

// Borders & Dividers
"border border-border rounded-lg"
"border-t border-border"

// Typography
"text-sm text-muted-foreground"
"text-xl font-bold text-foreground"

// Colors
"bg-card text-foreground"
"text-primary bg-primary/10"
"hover:text-secondary transition-colors"
```

### Responsive Prefixes

```typescript
// Mobile first approach
"text-2xl md:text-4xl lg:text-5xl"  // Size increases at breakpoints
"block md:hidden"                   // Hidden on desktop
"hidden md:flex"                    // Hidden on mobile
"p-4 md:p-6 lg:p-8"               // Spacing increases
```

## 🔄 Common Tasks

### Add a New Page

1. **Create the route:**
```bash
mkdir -p app/new-section
```

2. **Create page.tsx:**
```typescript
// Use the page template above
```

3. **Update navigation:**
```typescript
// In components/navigation.tsx
const navItems = [
  // ... existing items ...
  { href: '/new-section', label: 'New Section', icon: IconComponent },
]
```

### Add a New Component

1. **Create file:**
```bash
touch components/my-component.tsx
```

2. **Template:**
```typescript
'use client'

import { motion } from 'framer-motion'

interface MyComponentProps {
  // Define props
}

export function MyComponent({ }: MyComponentProps) {
  return (
    <motion.div>
      {/* Component content */}
    </motion.div>
  )
}
```

3. **Use in pages:**
```typescript
import { MyComponent } from '@/components/my-component'

// In JSX:
<MyComponent {...props} />
```

### Modify Design Tokens

Edit `/app/globals.css`:

```css
:root {
  --primary: #7FFF00;        /* Primary accent color */
  --secondary: #FFA500;      /* Secondary accent color */
  --background: #1a1a1a;     /* Background color */
  --foreground: #ffffff;     /* Text color */
  /* ... other tokens ... */
}

.dark {
  /* Dark theme overrides - already configured */
}
```

### Add Data Visualization

1. **Import Recharts:**
```typescript
import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
```

2. **Create data array:**
```typescript
const data = [
  { name: 'Week 1', value: 100 },
  { name: 'Week 2', value: 120 },
  // ...
]
```

3. **Render chart:**
```typescript
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
    <XAxis dataKey="name" stroke="#a0a0a0" />
    <YAxis stroke="#a0a0a0" />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="value"
      stroke="#7FFF00"
      strokeWidth={3}
    />
  </LineChart>
</ResponsiveContainer>
```

## 🧪 Testing Patterns

### Mobile Responsiveness

1. **Use browser DevTools:**
   - Press F12 to open DevTools
   - Click device toolbar (Ctrl+Shift+M)
   - Test at 375px, 768px, 1024px

2. **Test navigation:**
   - Mobile: Tap menu, verify bottom nav
   - Desktop: Verify sidebar persists

3. **Test animations:**
   - Verify smooth 60fps performance
   - Check hover states work
   - Test scroll animations

### Dark Mode Verification

- Verify all text is readable on dark backgrounds
- Check color contrast (WCAG AA minimum)
- Test accent colors stand out
- Verify images display properly

## 🐛 Debugging

### Console Logging

```typescript
// Use prefixed logs for clarity
console.log("[v0] Component mounted:", props)
console.log("[v0] Data fetched:", data)
console.log("[v0] Animation triggered:", trigger)

// Log errors with context
console.error("[v0] Failed to load:", error.message)
```

### React DevTools

1. Install React DevTools browser extension
2. Use Component profiler to check render performance
3. Inspect props and state
4. Check for unnecessary re-renders

### Next.js Debugging

```bash
# Run with debug logging
DEBUG=* pnpm dev

# Profile build time
pnpm build --profile

# Analyze bundle size
npm install -g next-bundle-analyzer
```

## 📦 Dependency Management

### Current Dependencies

```json
{
  "next": "16.1.6",
  "react": "19.2.4",
  "tailwindcss": "4.2.0",
  "framer-motion": "11.0.0",
  "recharts": "2.15.0",
  "lucide-react": "0.564.0"
}
```

### Adding Dependencies

```bash
# Add new package
pnpm add package-name

# Add dev dependency
pnpm add -D package-name

# Update all packages
pnpm update
```

## 🚀 Performance Tips

1. **Component Splitting:**
   - Break large pages into smaller components
   - Use React.memo for expensive renders
   - Lazy load heavy components

2. **Image Optimization:**
   - Use next/image component
   - Provide width/height attributes
   - Use appropriate formats (WebP)

3. **Animation Performance:**
   - Use GPU-accelerated properties (transform, opacity)
   - Avoid animating: width, height, position
   - Use `will-change` CSS sparingly

4. **Bundle Size:**
   - Tree-shake unused code
   - Dynamic imports for large components
   - Monitor bundle with `next/bundle-analyzer`

## 📚 Reference Documentation

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev)

## 🎓 Best Practices

### Code Organization
- Keep components focused and single-purpose
- Use clear, descriptive names
- Group related imports
- Separate logic from JSX

### Performance
- Use `'use client'` only where needed
- Optimize images aggressively
- Monitor Core Web Vitals
- Profile regularly

### Accessibility
- Use semantic HTML
- Add ARIA labels
- Test keyboard navigation
- Ensure color contrast

### Security
- Validate all inputs
- Sanitize user data
- Keep dependencies updated
- Use environment variables for secrets

## 🤝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

## 💡 Quick Tips

- Always use the page template for consistency
- Test on mobile first, then scale up
- Use Framer Motion's whileHover for interactivity
- Keep design tokens centralized
- Comment complex logic
- Test animations at different speeds

---

**Happy developing!** 🚀

For questions or issues, refer to the README.md or check the individual page implementations for examples.
