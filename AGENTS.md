<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Tech Stack

- **Next.js 16** - React framework with app router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **next-themes** - Theme/dark mode management
- **Biome** - Code formatting and linting
- **react-icons** - Icon component library

# Project Structure

```
/src
  /app              # Next.js app router (pages, layouts, routes)
  /components       # React components
    /ui             # Reusable UI components (Button, Card, Badge, etc.)
  /data             # Static data files (portfolio.json)
  /lib              # Utilities (cn() for class merging, etc.)
/public             # Static assets
  /v1/              # Legacy static version (archive)
```

# Portfolio Data Schema

Content is stored in `/src/data/portfolio.json`. This file is imported and used throughout the application.

## Data Structure

```typescript
{
  profile: {
    name: string                    // Full name
    title: string                   // Job title/headline
    bio: string                     // Short biography
    email: string                   // Contact email
    links: {                        // Social links array
      id: string                    // Unique identifier (github, linkedin, email)
      platform: string              // Platform name
      url: string                   // Full URL
      label: string                 // Display label
    }[]
  }
  about: string                     // Full about section text
  experience: {                     // Work experience array
    id: string                      // Unique identifier (exp-1, exp-2, etc.)
    company: string                 // Company name
    role: string                    // Job title
    period: string                  // Display period (e.g., "Jul 2024 - Present")
    startDate: string               // ISO date (YYYY-MM-DD)
    endDate?: string                // ISO date, optional for current role
    description: string             // Job description (will be converted to bullets)
    technologies: string[]          // Array of tech skills used
  }[]
  technologies: string[]            // Global technology stack
  projects: {                       // Portfolio projects array
    id: string                      // Unique identifier (proj-1, proj-2, etc.)
    title: string                   // Project name
    description: string             // Brief description
    technologies: string[]          // Tech stack for project
    githubLink: string              // GitHub repository URL
    link: string                    // Project link/demo URL
  }[]
}
```

## Why This Matters

AI needs to know:
- **Portfolio data is centralized** in one JSON file
- **String values are often converted** to components (descriptions → bullet lists)
- **Arrays are iterated** to create UI (experience → experience cards, projects → project cards)
- **When modifying content**, edit this JSON file, not hardcoded strings in components

# Theme System

Light and dark mode are implemented using CSS variables and `next-themes` library.

## How It Works

1. **CSS Variables** defined in `/src/app/globals.css`:
   - `:root` selector for light mode
   - `.dark` selector for dark mode
   - Variables: `--primary`, `--background`, `--foreground`, `--muted`, etc.

2. **Switching** happens via `next-themes` (manages localStorage and DOM class)

3. **Components use variables** via Tailwind's `@apply` or inline `var(--color-name)`

## Why This Architecture

- **Consistent theming** across all components
- **Easy to extend** - add new colors by defining new CSS variables
- **No runtime overhead** - pure CSS, no state management needed
- **Accessible** - respects user's OS preference initially, allows override

## For AI: When Building Components

Always use CSS variables for colors:
```typescript
// ✅ CORRECT - Uses theme variables
className="bg-[var(--background)] text-[var(--foreground)]"

// ❌ WRONG - Hardcoded colors
className="bg-white text-black"
```

# NPM Commands

Always run npm commands with `-E` or `--save-exact` flag to lock exact versions.

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run lint     # Run Biome linter
npm run format   # Format code with Biome
```

# General Rules

- Do not create folders or access anything outside the project directory
- Run `pwd` to verify current directory before executing commands
- All components must follow conventions in `/src/app/AGENTS.md`

# Commit Pattern

Use conventional commit format:
```
type(scope): description

feat(profile): add social links
fix(theme): resolve dark mode toggle
docs(readme): update installation steps
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`, `perf`
