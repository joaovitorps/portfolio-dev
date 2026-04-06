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
    bio: BioData | string           // Biography (object with text and optional variations, or plain string)
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

3. **Components use Tailwind classes** that map to theme variables via the `@theme inline` block in globals.css

## Why This Architecture

- **Consistent theming** across all components
- **Easy to extend** - add new colors by defining new CSS variables
- **No runtime overhead** - pure CSS, no state management needed
- **Accessible** - respects user's OS preference initially, allows override

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

**Important**: Create atomic commits for each logical change. Don't combine multiple unrelated changes into a single commit. Each commit should be independently reviewable and have a clear, single purpose.

---

## Code Style Guideline: Conditional Early Return for Readability

When writing conditionals that guard against invalid or missing data, prefer the early return pattern for better readability. For example, instead of:

```js
if (active && payload && payload.length) {
  // ...
}
```

Use:

```js
if (!active || !payload?.length) {
  return null;
}
// ...rest of logic
```

This approach makes the intent clearer and reduces nesting.

---

## Comment Guidelines

### When to Comment

Only add comments that explain **WHY**, not **WHAT**. The code itself should be clear about WHAT it does.

**Good comments:**
- Explain non-obvious design decisions
- Document workarounds and gotchas
- Provide context about environment-specific behavior
- Note performance considerations
- Explain complex algorithms or Next.js patterns

**Bad comments (remove these):**
- Section labels like `/* Profile Header */` (obvious from JSX structure)
- Restating what the code clearly does: `// Render chart` → the code already renders it
- JSDoc for self-explanatory functions (function name + signature should be clear enough)
- Explaining obvious variable assignments or operations

### Examples

**❌ REMOVE:**
```typescript
/* Profile Header */
<div className="flex items-start...">
  {/* This is a header */}
  <h1>{name}</h1>
</div>

// Transform data for Recharts
const chartData = data.map(...)

// Toggle between light and dark
const handleToggle = () => setTheme(!isDark)
```

**✅ KEEP:**
```typescript
// Prevent hydration mismatch by only rendering after mount
useEffect(() => setMounted(true), []);

// In production, use deployed domain; in dev, use localhost
const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
```

### JSDoc Usage

Only use JSDoc for:
- Public API functions that need documentation
- Complex functions with non-obvious parameters
- Exported utilities used across multiple files

Skip JSDoc for:
- Simple component functions (component name + props are clear)
- Single-use internal utilities
- Self-explanatory function signatures

---

## Current Implementations

### GitHub Language Data Fetching

**Architecture**: Build-time data fetching with static JSON storage

**How it works**:
- `/scripts/fetch-github-data.ts` runs during `npm run build` (via prebuild script)
- Fetches language stats from GitHub API (~30 requests per build)
- Saves aggregated data to `public/github-data.json` (~1.5KB)
- Runtime component reads pre-built file (zero API calls, instant load)

**Benefits**:
- ✅ Eliminates API rate limiting issues
- ✅ Fastest possible runtime performance
- ✅ Works on serverless (Vercel)
- ✅ Scalable (no quota consumed per user visit)

**Trade-off**:
- Data refreshes only when deployed (stale between deploys)

**Future Enhancement**:
- See `src/specs/github-actions-automation.md` for scheduled refresh workflow
- This template can automatically update data weekly via GitHub Actions
- Currently a reference/future implementation (not required for functionality)

**Related files**:
- `scripts/fetch-github-data.ts` - Fetch and aggregate logic
- `src/lib/github.ts` - Runtime utilities (`generateLanguageSummary`)
- `src/components/ui/language-chart.tsx` - Server component that reads the file
- `README.md` - Learning section explaining the problem/solution

