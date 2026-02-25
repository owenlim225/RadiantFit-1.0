# Results Over Excuses - Premium Fitness Platform

A modern, high-performance fitness training platform built with Next.js, React, and Framer Motion. Features structured workout programs, nutrition guidance, expert blog content, and progress tracking.

## 🎯 Features

### Core Pages
- **Home/Landing** - Hero section with platform overview, feature highlights, and CTAs
- **Workouts** - Tiered training programs (Beginner/Intermediate/Advanced) with detailed program information
- **Nutrition** - Multiple nutrition plans with daily meal breakdowns and macro tracking
- **Blog** - Expert fitness articles with categories and featured content
- **Progress** - Real-time progress tracking with charts, achievements, and goal visualization

### Design System
- **Dark Theme** - Professional dark mode with electric lime (#7FFF00) and safety orange (#FFA500) accents
- **Responsive** - Mobile-first design with optimized desktop experience
- **Animations** - Smooth Framer Motion transitions and interactions throughout
- **Accessibility** - Semantic HTML, ARIA labels, and keyboard navigation support

### Navigation
- **Sidebar Navigation** - Fixed sidebar on desktop with smooth hover effects
- **Mobile Bottom Nav** - Bottom navigation bar for mobile devices
- **Mobile Menu** - Animated mobile drawer menu for easy navigation
- **Active State Indicators** - Visual feedback for current page

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: 19.2.4 with React Compiler support
- **Styling**: Tailwind CSS 4.2 with custom design tokens
- **Animations**: Framer Motion 11.0
- **Charts**: Recharts 2.15 for data visualization
- **Icons**: Lucide React for consistent iconography
- **UI Components**: shadcn/ui with Radix UI primitives

## 📁 Project Structure

```
app/
├── page.tsx                 # Home/Landing page
├── workouts/page.tsx        # Training programs page
├── nutrition/page.tsx       # Nutrition plans page
├── blog/page.tsx           # Blog articles page
├── progress/page.tsx       # Progress tracking page
└── layout.tsx              # Root layout with theme

components/
├── navigation.tsx          # Sidebar + Mobile nav
├── page-wrapper.tsx        # Page title wrapper with animations
├── footer.tsx              # Footer with links and social
└── ui/                     # shadcn/ui components

public/
├── hero-fitness.jpg        # Hero image
└── roe-logo.jpg           # Brand logo

styles/
└── globals.css             # Global styles and design tokens
```

## 🎨 Design Tokens

The app uses a carefully curated dark theme with specific accent colors:

- **Background**: #1a1a1a (Deep black)
- **Card**: #242424 (Dark gray)
- **Primary**: #7FFF00 (Electric lime)
- **Secondary**: #FFA500 (Safety orange)
- **Accents**: Cyan (#00d9ff), Pink (#ff006e), Yellow (#ffbe0b)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Recommended: 20+)
- pnpm (Package manager)

### Installation

1. **Clone and Install**
```bash
git clone <repository>
cd results-over-excuses
pnpm install
```

2. **Run Development Server**
```bash
pnpm dev
```

3. **Open in Browser**
Navigate to `http://localhost:3000`

### Build for Production
```bash
pnpm build
pnpm start
```

## 📊 Page Details

### Home Page
- Hero section with tagline "Results Over Excuses"
- Feature overview cards linking to main sections
- Statistics displaying program scale
- Call-to-action buttons
- Responsive grid layout

### Workouts Page
- Three difficulty tiers (Beginner, Intermediate, Advanced)
- Interactive tier selection with smooth transitions
- Program cards with metrics (duration, intensity, sessions)
- Rating system and focus tags
- Hover effects and smooth animations

### Nutrition Page
- Three nutrition plan types (Muscle Gain, Fat Loss, Athlete Performance)
- Plan selection with macro overview
- Expandable accordion meals with calorie information
- Tips and pro tips sections
- Responsive grid layout

### Blog Page
- Featured article section
- Category filtering
- Blog card grid with images and metadata
- Read time estimation
- Author and date information
- Load more functionality

### Progress Page
- Key statistics cards showing progress
- Line chart for strength and endurance tracking
- Bar chart for weight progress
- Recent achievements timeline
- Current goals with progress bars
- Responsive chart layouts

## 🎬 Animations

The app uses Framer Motion for smooth, performant animations:

- **Page Transitions**: Fade and slide animations for route changes
- **Stagger Effects**: Sequential animations for lists and grids
- **Hover States**: Scale and translate effects on interactive elements
- **Scroll Triggers**: Animations triggered when elements enter viewport
- **Chart Animations**: Smooth line and bar animations on data visualization

## 📱 Responsive Design

The design follows a mobile-first approach:

- **Mobile**: Single column layouts, bottom navigation
- **Tablet**: Two-column grids, optimized spacing
- **Desktop**: Multi-column layouts, fixed sidebar navigation

Breakpoints:
- `md`: 768px (Desktop starts here)
- `lg`: 1024px (Full width layouts)

## 🔧 Customization

### Adding New Pages

1. Create new directory: `app/new-page/page.tsx`
2. Import navigation components
3. Wrap with `<PageWrapper>` component
4. Add to navigation in `components/navigation.tsx`

### Modifying Colors

Edit design tokens in `app/globals.css`:

```css
--primary: #7FFF00;
--secondary: #FFA500;
```

### Adding Navigation Items

Update `navItems` array in `components/navigation.tsx`:

```typescript
const navItems = [
  { href: '/path', label: 'Label', icon: Icon },
]
```

## 📈 Performance

- **Optimized Bundle**: Tree-shaking and code splitting
- **Image Optimization**: Next.js Image component ready
- **Animation Performance**: GPU-accelerated Framer Motion
- **Chart Performance**: Recharts with responsive containers

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast colors for visibility
- Screen reader friendly text alternatives

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
vercel
```

### Deploy to Other Platforms

The app is compatible with any Node.js hosting:

```bash
pnpm build
# Deploy 'out' or '.next' directory
```

## 📝 License

This project is created as a professional fitness platform reference implementation.

## 🤝 Support

For questions or issues, please refer to the documentation or open an issue in the repository.

---

**Train Hard. Stay Disciplined.** - Results Over Excuses
