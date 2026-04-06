# Portfolio

A personal portfolio and resume website showcasing experience, projects, and technical skills.

## Features

- **Dark and light theme support** - Seamless theme switching with persistent user preference
- **Responsive design** - Works across desktop and mobile devices
- **Component-driven architecture** - Reusable, maintainable UI components
- **Portfolio showcase** - Display of professional experience, projects, and technology skills
- **Social links** - Direct connections to GitHub, LinkedIn, and email

## Tech Stack

Built with:
- **Next.js 16** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **next-themes** - Theme management (light/dark mode)
- **react-icons** - Icon components

## What's Inside

- `/src/app/` - Next.js app router and page components
- `/src/components/` - Reusable React components
- `/src/data/` - Portfolio content and configuration
- `/public/v1/` - Legacy static version (v1)

## GitHub Language Chart

The portfolio displays a chart of programming languages used across GitHub repositories. The data is fetched **once at build time** and stored in `/public/github-data.json`.

### How It Works

1. **Build Time** (`npm run build`):
   - Script `/scripts/fetch-github-data.ts` runs via `prebuild`
   - Fetches language data from GitHub API for all repositories
   - Aggregates data by language with color coding
   - Saves to `/public/github-data.json` (~1.5KB)

2. **Runtime** (Production/Dev):
   - Component fetches pre-built JSON file (instant, no API calls)
   - Shows skeleton loader while fetching
   - Renders interactive language chart with Recharts

### Updating GitHub Data

#### Local Development

```bash
npm run build  # Generates /public/github-data.json
npm run dev    # Serves the pre-built data
```

## Learning: Build-Time Data Fetching Strategy

### Problem: Runtime API Rate Limiting

Initially, GitHub language data was fetched at **runtime** (every page load). This approach caused issues:

- **Rate limiting**: GitHub API enforces strict rate limits (60 requests/hour unauthenticated, 5000/hour authenticated)
- **Slow page loads**: Each request required ~30 API calls (one per repository)
- **Degraded UX**: Rate limit errors (403) broke the language chart feature
- **Scaling issues**: Every visitor triggered API calls, wasting quota

### Solution: Move to Build Time

The final approach fetches GitHub data **once at build time** and stores it as static JSON:

**Build Process** (`npm run build`):
- `/scripts/fetch-github-data.ts` runs via `prebuild` script
- Fetches all repositories and language stats from GitHub API (~13-15 seconds)
- Applies retry logic and 300ms delays between requests to respect rate limits
- Aggregates languages with color coding
- Saves to `/public/github-data.json` (~1.5KB)

**Runtime** (Production/Dev):
- Component reads pre-built JSON file (instant, ~0ms)
- Zero API calls—eliminates rate limiting entirely
- Data refreshes only when you rebuild (on deployment)

### Trade-offs

| Aspect | Before (Runtime) | After (Build-time) |
|--------|------------------|-------------------|
| Performance | Slow (30+ API calls per load) | Fast (file read only) |
| Rate limits | ❌ Issues during traffic spikes | ✅ No issues |
| Data freshness | Always current (but unreliable) | Stale until next deploy |
| Developer UX | Works immediately | Requires `npm run build` first |

### When to Use This Pattern

**Build-time fetching works well for:**
- Data that doesn't need real-time updates (portfolio projects, language stats)
- Public data (GitHub repos, language breakdowns)
- Small payloads that fit in static files
- Build steps that take reasonable time (<30 seconds)

**Consider runtime fetching for:**
- Real-time data (live dashboards, stock prices)
- User-specific data (personalized recommendations)
- Frequently changing content
- Large datasets (>5MB)

### Environment Variables

Required for the GitHub data fetch script:

```bash
GITHUB_LANG_TOKEN=your_github_token_here
```

Generate at: https://github.com/settings/tokens
- Required scope: `public_repo`

### Troubleshooting

**"GitHub data file not found" warning**

- Ensure `npm run build` was executed
- Check that `/public/github-data.json` exists
- In dev mode, file must be generated via `npm run build` first

**API rate limiting**

- The script includes 300ms delays between requests
- Ensure `GITHUB_LANG_TOKEN` is set for higher limits (5000 vs 60 per hour)
- GitHub API: 1 request per repo × ~30 repos = ~30 requests per build
