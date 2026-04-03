# GitHub Contribution Graph - Implementation Plan

**Status**: Frontend UI Phase (Complete → Ready for API Integration)  
**Priority**: Medium  
**GitHub Username**: joaovitorps

---

## Feature Overview

Display a visual representation of GitHub contribution history (contribution graph) on the portfolio. This creates a visual indicator of coding activity and commitment, following the GitHub-style contribution calendar pattern.

---

## Current Phase: Frontend UI Only

The focus is on building a beautiful, responsive UI component using mock data. The API integration will be added later without major refactoring.

### UI Requirements Checklist

- [ ] Responsive grid display of contribution squares
- [ ] Color-coded intensity (0 contributions → high contributions)
- [ ] Tooltip showing contribution count per day on hover
- [ ] Smooth animations and transitions
- [ ] Dark/Light mode support via CSS custom properties
- [ ] Minimal and modern design matching Bento layout aesthetic
- [ ] Accessible with ARIA labels and semantic HTML
- [ ] Performance optimized for mobile and desktop

---

## Component Architecture

```
GitHubGraph Component
├── Header Section
│   ├── GitHub username link
│   ├── Time period selector (1yr/3mo/all time)
│   └── Total contribution count
├── Graph Container (Main)
│   ├── Y-axis labels (Mon/Wed/Fri)
│   ├── X-axis labels (Month abbreviations)
│   └── Contribution squares grid
│       ├── Individual cells (12×12px + 2px gap)
│       ├── Hover state with tooltip
│       └── Color intensity based on level
└── Legend Section
    └── Color intensity scale (Level 0-4+)
```

---

## Design Specifications

### Grid Dimensions
- **Cell size**: 12px × 12px
- **Gap between cells**: 2px
- **Grid layout**: 52 weeks (x-axis) × 7 days (y-axis)
- **Border radius**: Use `--radius-sm` CSS variable

### Color Mapping (Light Mode)

```
Contribution Level → CSS Variable → Color Usage
─────────────────────────────────────────────
0 contributions    → --muted / 10%  → Very light background
1-5 contributions  → --chart-1 / 50% → Light accent
6-15 contributions → --chart-1 / 75% → Medium accent
16-30 contributions → --chart-1 / 90% → Strong accent
31+ contributions  → --chart-1 / 100% → Full accent
```

### Color Mapping (Dark Mode)

```
Same mapping but using dark mode versions of CSS variables
from globals.css .dark class
```

### Typography

- **Header**: Use `headline-md` from design system (Geist)
- **Month labels**: `label-sm` all-caps
- **Tooltip**: `body-sm` for contribution count
- **Legend**: `label-xs` for level descriptions

### Spacing

- **Top padding**: `1.5rem` (24px)
- **Bottom padding**: `1rem` (16px)
- **Side padding**: `1rem` (16px)
- **Between sections**: `1.5rem` (24px)
- **Month label offset**: `0.5rem` (8px) from grid

### Interactive States

- **Hover**: Scale cell to 1.1, show tooltip with delay
- **Tooltip**: Appear on hover, disappear on mouse leave
- **Animation**: Smooth transition (200ms ease-out)

---

## Data Structure for Mock Data

### Interface: `ContributionData`

```typescript
interface ContributionDay {
  date: string;           // "2026-04-02"
  count: number;          // 0-50+
  level: 0 | 1 | 2 | 3 | 4; // Intensity level
}

interface ContributionWeek {
  week: number;           // 0-51
  days: ContributionDay[];
}

interface GitHubContributions {
  username: string;
  totalContributions: number;
  year: number;
  weeks: ContributionWeek[];
  lastUpdated: string;
}
```

### Mock Data Generation

The mock data will be generated to simulate realistic GitHub activity:
- Weekdays generally have more contributions
- Weekends have fewer/zero contributions
- Some "streaks" of high activity (10-20 days)
- Some gaps (0 contributions for periods)
- Current week partially filled

---

## Files to Create

### 1. `src/components/GitHubGraph.tsx`

Main component with:
- Props interface for customization
- Header with username and year selector
- Grid rendering logic
- Tooltip component
- Legend section
- Responsive layout

**Props**:
```typescript
interface GitHubGraphProps {
  data: GitHubContributions;
  year?: number;
  showLegend?: boolean;
  showHeader?: boolean;
  maxWidth?: string;
}
```

### 2. `src/lib/github-utils.ts`

Utility functions:
- `getContributionLevel(count: number): 0|1|2|3|4`
- `getColorForLevel(level: number, isDark: boolean): string`
- `formatDate(date: string): string` (e.g., "Apr 2")
- `generateMockData(): GitHubContributions` (for development)
- `calculateTotalContributions(weeks: ContributionWeek[]): number`

### 3. `src/data/github-mock.ts`

Static mock data file with:
- 52 weeks of realistic contribution data
- Mixed contribution levels
- Realistic patterns (weekday > weekend)
- Can be easily replaced with API data

### 4. `src/lib/types.ts`

Update with GitHubGraph interfaces:
- `ContributionDay`
- `ContributionWeek`
- `GitHubContributions`
- `GitHubGraphProps`

---

## Implementation Phases

### Phase 1: UI Structure (Frontend Only)

1. Create component skeleton with mock data
2. Build grid layout using CSS Grid
3. Render contribution cells with color intensity
4. Add hover states and tooltips
5. Test responsive behavior

### Phase 2: Polish & Animation

1. Add smooth transitions
2. Implement tooltip animations
3. Optimize performance (memoization)
4. Add accessibility features
5. Test dark/light mode switching

### Phase 3: API Integration (Future)

When ready to add real GitHub data:

1. Create `src/app/api/github/contributions.ts`
2. Implement GitHub GraphQL query:
   ```graphql
   query {
     user(login: "joaovitorps") {
       contributionsCollection(year: 2026) {
         contributionCalendar {
           totalContributions
           weeks {
             contributionDays {
               date
               contributionCount
             }
           }
         }
       }
     }
   }
   ```
3. Add error boundary and loading states
4. Implement caching strategy (revalidate: 3600 = 1 hour)
5. Add retry logic for failed requests
6. Update component to use API endpoint instead of mock data

---

## Styling Strategy

### CSS Approach

Use `@layer components` in `globals.css` for the GitHubGraph:

```css
@layer components {
  .github-graph {
    @apply py-6 px-4;
  }
  
  .github-graph__grid {
    @apply grid gap-1 auto-fit;
    grid-template-columns: repeat(52, minmax(14px, 1fr));
    grid-template-rows: repeat(7, minmax(14px, 1fr));
  }
  
  .github-graph__cell {
    @apply rounded-sm transition-all duration-200 cursor-pointer;
    width: 12px;
    height: 12px;
    
    &:hover {
      @apply scale-110;
      box-shadow: var(--shadow-md);
    }
  }
}
```

### Tailwind Classes

Use a mix of Tailwind utilities and custom CSS:
- `rounded-sm` for border radius
- `transition-all duration-200` for animations
- `cursor-pointer` for interactivity
- Custom `background-color` with CSS variables

---

## Accessibility Requirements

- [ ] Semantic HTML: `<article>`, `<header>`, `<section>`
- [ ] ARIA labels: Each cell has `aria-label="X contributions on DATE"`
- [ ] Keyboard support: Tab through cells, Enter to view tooltip
- [ ] Screen reader: Announces total contributions and current cell info
- [ ] Sufficient color contrast: WCAG AA minimum
- [ ] Focus indicators: Visible on keyboard navigation
- [ ] Alternative text: Graph description for screen readers

### ARIA Labels Example

```html
<div 
  class="github-graph__cell"
  aria-label="3 contributions on April 2, 2026"
  role="button"
  tabindex="0"
>
</div>
```

---

## Performance Considerations

- **Memoization**: Use `React.memo()` to prevent unnecessary re-renders
- **Lazy loading**: Use `next/dynamic` if graph isn't above the fold
- **Grid optimization**: Use CSS Grid instead of DOM heavy solutions
- **Tooltip performance**: Render tooltips only on hover (not pre-rendered)
- **Bundle size**: Component should be < 15KB (minified + gzipped)

---

## Testing Checklist

### Visual Testing
- [ ] Light mode colors correct
- [ ] Dark mode colors correct
- [ ] Mobile layout (< 640px)
- [ ] Tablet layout (640px - 1024px)
- [ ] Desktop layout (> 1024px)
- [ ] Hover states work
- [ ] Tooltip displays correctly

### Functional Testing
- [ ] Year selector works (if implemented)
- [ ] Tooltip shows correct count
- [ ] Legend colors match cells
- [ ] Responsive grid adapts to width
- [ ] No layout shift on hover

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] ARIA labels are correct
- [ ] Screen reader announces content
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA

---

## Future API Integration Guide

### Step 1: Create API Route

**File**: `src/app/api/github/contributions.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'joaovitorps';
  const year = searchParams.get('year') || new Date().getFullYear();

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `query {
          user(login: "${username}") {
            contributionsCollection(year: ${year}) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`
      }),
    });

    const data = await response.json();
    
    // Transform data to our format
    const contributions = transformGitHubData(data, username, year);
    
    return NextResponse.json(contributions, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    );
  }
}
```

### Step 2: Update Environment Variables

Add to `.env.local`:
```
GITHUB_TOKEN=your_token_here
```

### Step 3: Update Component

Replace mock data import with API call:

```typescript
const [data, setData] = useState<GitHubContributions | null>(null);

useEffect(() => {
  fetch(`/api/github/contributions?username=joaovitorps`)
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
}, []);
```

---

## Related Documentation

- **Design System**: See Stitch "Portfolio Home (Bento Layout)" for styling inspiration
- **Accessibility**: WAI-ARIA Authoring Practices - https://www.w3.org/WAI/ARIA/apg/
- **GitHub API**: https://docs.github.com/en/graphql
- **Tailwind CSS**: @layer directive documentation

---

## Troubleshooting

### Issue: Grid not responsive
**Solution**: Use `auto-fit` or `auto-fill` in CSS Grid with `minmax()`

### Issue: Tooltip positioning off-screen
**Solution**: Calculate tooltip position and adjust with transform

### Issue: Colors not matching in dark mode
**Solution**: Verify CSS variables are defined in `.dark` class in `globals.css`

### Issue: Performance slow on large datasets
**Solution**: Virtualize grid or lazy load weeks as user scrolls

---

## Related Issues & PRs

(To be filled as development progresses)

- [ ] Component created and styled
- [ ] Mock data implemented
- [ ] Tests written
- [ ] Accessibility verified
- [ ] Performance optimized
- [ ] API plan documented
- [ ] Ready for API integration
