# Mobile Tab Navigation Component - Implementation Plan

**Status**: Planning  
**Priority**: High (Post-First Deploy)  
**Estimated Effort**: M (Medium)  
**Dependencies**: Base UI (`@mui/base`), Tailwind CSS, Next.js App Router  
**Owner**: João

---

## Feature Overview

A mobile-first tab navigation system that replaces the vertical scrolling layout on mobile devices with a horizontal tab interface. Users can switch between portfolio sections (About, Experience, Technologies, Projects) without scrolling. Desktop layout remains untouched. This improves mobile UX by reducing scroll fatigue and providing a clearer section hierarchy.

---

## Current State Analysis

### Existing Layout Structure

**Current Desktop Layout** (`src/app/page.tsx`):
- **Left Column**: ProfileCard (sticky, full height)
- **Right Column**: AboutCard, ExperienceCard, TechnologiesCard, ProjectsCard (scrollable)
- Grid: `grid-cols-1 lg:grid-cols-3` (mobile stacks, desktop 3-column)

**Sections Identified** (to become tabs):
1. **About** - `AboutCard` component
2. **Experience** - `ExperienceCard` component
3. **Technologies** - `TechnologiesCard` component
4. **Projects** - `ProjectsCard` component

### Mobile Breakpoints
- Mobile: `< 768px` (current `sm` breakpoint)
- Tablet: `768px - 1024px` (skip tabs, keep scrolling)
- Desktop: `> 1024px` (keep current layout)

---

## User Stories

- [ ] As a mobile user, I can tap on tab labels to switch between portfolio sections without scrolling
- [ ] As a mobile user, I can see which tab is currently active with a visual indicator
- [ ] As a mobile user, I can swipe left/right to navigate between tabs (optional enhancement)
- [ ] As a user, I can return to the page and the previously selected tab persists (if I close and reopen)
- [ ] As a user, I can share a URL that opens to a specific tab (e.g., `/?tab=projects`)
- [ ] As a desktop/tablet user, the layout remains unchanged and tabs don't interfere
- [ ] As a mobile user, the tab component is responsive and works at all mobile breakpoints

---

## Technical Requirements

### 1. **Tab Component Architecture**
- Build using **Base UI Tabs** (`@mui/base/Tabs`, `@mui/base/TabsList`, `@mui/base/TabsPanel`)
- Styled with **Tailwind CSS** (matching existing design system)
- Supports **keyboard navigation** (Tab, Arrow Keys)
- Semantic HTML with proper **ARIA attributes**

### 2. **State Management**
- **Active Tab State**: Controlled component using React `useState`
- **URL Persistence**: Read/update URL search params (`?tab=about|experience|technologies|projects`)
- **Local Storage** (optional): Store last active tab for persistence across sessions

### 3. **Responsive Breakpoints**
```
Mobile (< 768px):   Tab navigation visible
Tablet (768-1024px): Keep current scrolling layout
Desktop (≥ 1024px): Current layout (tabs hidden/disabled)
```

### 4. **Animation & Transitions**
- **Tab Switch**: Smooth fade/slide transition (200-300ms)
- **Tab Indicator**: Animated underline following active tab
- **Content Transition**: Fade-in effect when tab changes
- Use Tailwind `transition-*` classes or CSS animations

### 5. **Mobile Navigation Bar**
- **Position**: Bottom of viewport (fixed/sticky)
- **Height**: ~56px (standard mobile nav height)
- **Tab Labels**: Icon + text (or text-only if space constrained)
- **Visual Hierarchy**: Primary color for active, muted for inactive

---

## Implementation Approach

### Option 1: Hybrid Layout with Conditional Rendering
**Approach**: Render two separate layouts - one for mobile (tabs), one for desktop (current)

**Pros**:
- Clean separation of concerns
- No complexity in existing desktop layout
- Easy to maintain and update independently
- Clear mobile-first progressive enhancement

**Cons**:
- Code duplication for card components
- Larger bundle size (rendering both layouts)
- Harder to keep UX in sync between layouts

---

### Option 2: Single Layout with Smart Tab Container
**Approach**: Wrap content in a responsive tab container that activates only on mobile

**Pros**:
- Single source of truth for content
- Smaller bundle size
- Easier to keep UX consistent
- Leverages existing component structure

**Cons**:
- More complex conditional logic in layout
- Base UI Tabs might add overhead

---

### **Recommended**: Option 2 - Single Layout with Smart Tab Container

**Rationale**:
- Aligns with Next.js philosophy of progressive enhancement
- Your portfolio content is already well-structured
- Base UI provides good mobile support
- Can incrementally enhance without refactoring

---

## Architecture Design

### Component Hierarchy

```
MobileTabsLayout (New Wrapper Component)
├── Conditional Rendering:
│   ├── Mobile (< 768px):
│   │   ├── ProfileCard (top)
│   │   ├── Tabs Component (Base UI)
│   │   │   ├── TabsList
│   │   │   │   ├── Tab (About)
│   │   │   │   ├── Tab (Experience)
│   │   │   │   ├── Tab (Technologies)
│   │   │   │   └── Tab (Projects)
│   │   │   ├── TabsPanel (About Content)
│   │   │   ├── TabsPanel (Experience Content)
│   │   │   ├── TabsPanel (Technologies Content)
│   │   │   └── TabsPanel (Projects Content)
│   └── Desktop/Tablet (≥ 768px):
│       └── Current Layout (no changes)
```

### Data Structure

```typescript
// Tab metadata
interface PortfolioTab {
  id: string;              // 'about' | 'experience' | 'technologies' | 'projects'
  label: string;           // 'About' | 'Experience' | 'Technologies' | 'Projects'
  icon?: React.ReactNode;  // Optional icon from react-icons
  content: React.ReactNode; // Component to render
}
```

### URL Query Parameter Handling

```typescript
// Example URLs
/?tab=about          // Opens About tab
/?tab=experience     // Opens Experience tab
/?tab=technologies   // Opens Technologies tab
/?tab=projects       // Opens Projects tab
/                    // Defaults to first tab (about)

// Implementation: useSearchParams() from Next.js
const searchParams = useSearchParams();
const activeTab = searchParams.get('tab') || 'about';

// On tab change:
const handleTabChange = (newTab: string) => {
  const params = new URLSearchParams(searchParams);
  params.set('tab', newTab);
  router.push(`?${params.toString()}`);
};
```

---

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `src/components/MobileTabsLayout.tsx` | Main mobile tabs wrapper component |
| `src/lib/tab-utils.ts` | Utility functions for tab management |
| `src/specs/mobile-tabs.md` | This implementation plan (already created) |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/page.tsx` | Replace layout with `MobileTabsLayout` wrapper |
| `src/lib/types.ts` | Add `PortfolioTab`, `MobileTabsLayoutProps` types |

### Reference Files (No Changes)

- `src/components/profile-card.tsx` (reuse as-is)
- `src/components/about-card.tsx` (reuse as-is)
- `src/components/experience-card.tsx` (reuse as-is)
- `src/components/technologies-card.tsx` (reuse as-is)
- `src/components/projects-card.tsx` (reuse as-is)

---

## Implementation Details

### 1. MobileTabsLayout Component Structure

```typescript
// src/components/MobileTabsLayout.tsx

import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabsPanel } from "@mui/base/TabsPanel";
import Tab from "@mui/base/Tab";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MobileTabsLayoutProps {
  profile: PortfolioData['profile'];
  about: PortfolioData['about'];
  experience: PortfolioData['experience'];
  technologies: PortfolioData['technologies'];
  projects: PortfolioData['projects'];
}

export const MobileTabsLayout = ({ 
  profile, 
  about, 
  experience, 
  technologies, 
  projects 
}: MobileTabsLayoutProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('about');

  // Sync URL with active tab
  useEffect(() => {
    const tab = searchParams.get('tab') || 'about';
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (_: React.SyntheticEvent, value: string | number) => {
    const tabValue = String(value);
    setActiveTab(tabValue);
    
    // Update URL
    const params = new URLSearchParams(searchParams);
    params.set('tab', tabValue);
    router.push(`?${params.toString()}`);
  };

  // Desktop layout (unchanged)
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return <DesktopLayout {...props} />;
  }

  // Mobile layout with tabs
  return (
    <main className="min-h-screen bg-background">
      {/* Profile Card */}
      <div className="p-4">
        <ProfileCard profile={profile} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange}>
        <TabsList className="sticky bottom-0 w-full bg-background border-t border-border flex justify-around">
          <Tab value="about" className="...">About</Tab>
          <Tab value="experience" className="...">Experience</Tab>
          <Tab value="technologies" className="...">Tech</Tab>
          <Tab value="projects" className="...">Projects</Tab>
        </TabsList>

        {/* Tab Panels */}
        <TabsPanel value="about" className="p-4">
          <AboutCard content={about} />
        </TabsPanel>
        
        <TabsPanel value="experience" className="p-4">
          <ExperienceCard experiences={experience} />
        </TabsPanel>
        
        <TabsPanel value="technologies" className="p-4">
          <TechnologiesCard technologies={technologies} />
        </TabsPanel>
        
        <TabsPanel value="projects" className="p-4">
          <ProjectsCard projects={projects} />
        </TabsPanel>
      </Tabs>
    </main>
  );
};
```

### 2. Tab Styling with Tailwind

```typescript
// Tab styling classes (will be applied to Base UI components)

const tabListClasses = cn(
  "fixed bottom-0 left-0 right-0",
  "bg-background border-t border-border",
  "flex justify-around items-center",
  "h-14 gap-0",
  "z-40"
);

const tabClasses = cn(
  "flex-1 h-full",
  "flex items-center justify-center",
  "text-sm font-medium",
  "border-b-2 border-transparent",
  "transition-all duration-200",
  "text-muted-foreground hover:text-foreground",
  "data-[selected]:text-foreground",
  "data-[selected]:border-primary",
  "data-[selected]:bg-muted"
);

const tabsPanelClasses = cn(
  "pb-16", // Add padding for fixed bottom nav
  "animate-fadeIn" // Smooth fade-in transition
);
```

### 3. Responsive Implementation

```typescript
// In src/app/page.tsx

"use client";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery"; // Custom hook
import { MobileTabsLayout } from "@/components/MobileTabsLayout";
import { DesktopLayout } from "@/components/DesktopLayout"; // Extract current layout

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const portfolioData = portfolioDataRaw as PortfolioData;

  if (isMobile) {
    return <MobileTabsLayout {...portfolioData} />;
  }

  return <DesktopLayout {...portfolioData} />;
}
```

### 4. Base UI Installation

```bash
npm install -E @mui/base
```

### 5. Custom Hook for Media Queries

```typescript
// src/lib/hooks/useMediaQuery.ts

import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
```

---

## Styling & Animation Strategy

### CSS Variables for Transitions

```css
/* Add to globals.css in @layer utilities */

@layer utilities {
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.2s ease-in-out;
  }

  .tab-indicator {
    @apply transition-all duration-300 ease-in-out;
  }
}
```

### Tailwind Classes Pattern

```typescript
// Use cn() for dynamic class composition

import { cn } from "@/lib/utils";

const getTabClasses = (isActive: boolean) => cn(
  "px-4 py-2 rounded-md",
  "transition-all duration-200",
  "text-sm font-medium",
  isActive 
    ? "bg-primary text-primary-foreground shadow-md" 
    : "text-muted-foreground hover:bg-muted"
);
```

---

## URL Persistence & State Management

### Implementation Strategy

1. **Read from URL on Mount**: Check `?tab=` parameter on component mount
2. **Update URL on Tab Change**: Use Next.js router to update search params
3. **Local Storage (Optional)**: Store last active tab as fallback
4. **Browser History**: Each tab change creates a new history entry

### Code Example

```typescript
import { useRouter, useSearchParams } from "next/navigation";

const MobileTabsLayout = (props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('about');

  // Initialize from URL
  useEffect(() => {
    const tab = searchParams.get('tab') || 'about';
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    
    // Update URL without full page reload
    const params = new URLSearchParams(searchParams);
    params.set('tab', newTab);
    router.push(`?${params.toString()}`);
  };

  // ... rest of component
};
```

### Shareable URLs

```
User can share: https://example.com/?tab=projects
Users can bookmark: https://example.com/?tab=experience
Links work perfectly with browser back/forward buttons
```

---

## Accessibility Requirements

### ARIA & Semantic HTML

- [ ] Use `<nav>` for tab list container
- [ ] Use `role="tablist"` on tab list
- [ ] Use `role="tab"` on individual tabs
- [ ] Use `aria-selected="true|false"` on active/inactive tabs
- [ ] Use `aria-controls` linking tab to panel
- [ ] Tab panels use `role="tabpanel"`
- [ ] Keyboard support: Tab key, Arrow keys (Left/Right), Home/End

### Keyboard Navigation

```
Tab / Shift+Tab   → Focus next/previous tab
ArrowRight        → Activate next tab
ArrowLeft         → Activate previous tab
Home              → Activate first tab
End               → Activate last tab
Enter/Space       → Confirm tab activation
```

### Focus Management

- [ ] Tab list has focus indicator
- [ ] Active tab clearly distinguished
- [ ] Focus visible on keyboard navigation
- [ ] Focus moves to tab panel content after selection (optional)

### Screen Reader Support

```html
<div role="tablist" aria-label="Portfolio sections">
  <button
    role="tab"
    aria-selected="true"
    aria-controls="about-panel"
  >
    About
  </button>
</div>

<section id="about-panel" role="tabpanel" aria-labelledby="about-tab">
  {/* Content */}
</section>
```

Base UI handles most of this automatically, but verify on implementation.

---

## Testing Strategy

### Visual Testing

- [ ] Tab labels visible and readable on mobile
- [ ] Active tab indicator clearly highlighted
- [ ] Tab navigation doesn't overlap content
- [ ] Content transitions smoothly between tabs
- [ ] No layout shift when switching tabs
- [ ] ProfileCard visible above tabs
- [ ] Proper spacing on all mobile sizes (320px - 767px)

### Functional Testing

- [ ] Clicking tab switches content
- [ ] URL updates when tab changes
- [ ] Returning to URL with `?tab=X` opens correct tab
- [ ] Browser back/forward buttons work
- [ ] Tab switching doesn't cause scroll jump
- [ ] All content renders correctly in each tab
- [ ] Profile card remains in view

### Responsive Testing

- [ ] Works on iPhone SE (375px)
- [ ] Works on iPhone 12 (390px)
- [ ] Works on iPhone Max (430px)
- [ ] Works on Samsung Galaxy (360px - 480px)
- [ ] Desktop layout (768px+) unchanged
- [ ] Tablets (768px - 1024px) show scrolling layout

### Accessibility Testing

- [ ] Tab key navigation works
- [ ] Arrow keys navigate tabs
- [ ] Screen reader announces tabs correctly
- [ ] ARIA labels present
- [ ] Focus visible on all interactive elements
- [ ] Color contrast sufficient (WCAG AA)
- [ ] Works with keyboard only

### Performance Testing

- [ ] Tab switching is instant (< 100ms)
- [ ] No lag on animation transitions
- [ ] Bundle size increase < 50KB
- [ ] No memory leaks from event listeners
- [ ] Works on low-end mobile devices

### Dark Mode Testing

- [ ] Tab indicator visible in dark mode
- [ ] Active/inactive tabs distinguish clearly
- [ ] Text contrast sufficient in dark mode
- [ ] All colors follow design system variables

---

## Implementation Phases

### Phase 1: Component Structure & Base UI Integration (Week 1)

1. [ ] Install `@mui/base` package
2. [ ] Create `MobileTabsLayout.tsx` component shell
3. [ ] Integrate Base UI Tabs component
4. [ ] Add mobile breakpoint detection
5. [ ] Extract desktop layout to separate component
6. [ ] Update `src/app/page.tsx` to use new layout
7. [ ] Test basic tab switching on mobile

### Phase 2: Styling & Animations (Week 1-2)

1. [ ] Style tab list with Tailwind
2. [ ] Style individual tab buttons
3. [ ] Add active indicator styling
4. [ ] Implement tab content animations (fade-in)
5. [ ] Test on all mobile breakpoints
6. [ ] Dark mode compatibility check
7. [ ] Fine-tune transitions and spacing

### Phase 3: URL Persistence & State (Week 2)

1. [ ] Implement `useSearchParams()` integration
2. [ ] Add URL update on tab change
3. [ ] Add URL read on component mount
4. [ ] Test URL parameter persistence
5. [ ] Test browser history (back/forward)
6. [ ] Test URL sharing

### Phase 4: Accessibility & Polish (Week 2)

1. [ ] Verify Base UI ARIA implementation
2. [ ] Test keyboard navigation (Tab, Arrows)
3. [ ] Add accessibility labels if missing
4. [ ] Test with screen readers
5. [ ] Verify focus indicators
6. [ ] Test color contrast
7. [ ] Remove animation for `prefers-reduced-motion`

### Phase 5: Testing & Optimization (Week 3)

1. [ ] Visual regression testing
2. [ ] Functional testing across devices
3. [ ] Performance profiling
4. [ ] Bundle size analysis
5. [ ] Final bug fixes
6. [ ] Documentation update
7. [ ] Code review & merge

---

## Code Style & Standards (Per Project Rules)

### Component Export Pattern

```typescript
// ✅ CORRECT - Named export with const arrow function
export const MobileTabsLayout = (props: MobileTabsLayoutProps) => {
  // component code
};

// ❌ WRONG - Default export
export default function MobileTabsLayout() { ... }
```

### Props Interface

```typescript
// In src/lib/types.ts
export interface MobileTabsLayoutProps {
  profile: PortfolioData['profile'];
  about: PortfolioData['about'];
  experience: PortfolioData['experience'];
  technologies: PortfolioData['technologies'];
  projects: PortfolioData['projects'];
}
```

### Tailwind Class Composition

```typescript
// ✅ CORRECT - Use cn() for class merging
import { cn } from "@/lib/utils";

const tabClasses = cn(
  "px-4 py-2 rounded-md",
  isActive && "bg-primary",
  !isActive && "bg-muted"
);

// ❌ WRONG - Template literals
const tabClasses = `px-4 py-2 ${isActive ? "bg-primary" : "bg-muted"}`;
```

### Icon Usage

```typescript
// ✅ CORRECT - Use react-icons components
import { RiMenu2Line } from "react-icons/ri";

<RiMenu2Line size={24} />

// ❌ WRONG - CSS class-based icons
<i className="ri-menu-2-line" />
```

---

## Future Enhancements

### Phase 2+ Features

1. **Swipe Navigation**: Add touch swipe left/right to change tabs (React Swipeable)
2. **Tab Icons**: Add icons for each section (About, Briefcase, Code, Folder)
3. **Scroll Position Restoration**: Remember scroll position in each tab
4. **Smooth Scroll**: Use `scroll-behavior: smooth` in scrollable areas
5. **Bottom Sheet Alternative**: Modal/drawer for tab content (Material Design)
6. **Breadcrumb Navigation**: Show current location in portfolio
7. **Toast Notifications**: Brief feedback when tab changes
8. **Performance Optimization**: Lazy load tab content for large portfolios

### Long-term Improvements

- Mobile bottom sheet navigation pattern
- Gesture-based navigation
- Analytics tracking for tab usage
- Dynamic tab generation from data structure
- Tab content prefetching

---

## Dependencies & Installations

```bash
# Base UI for tab component
npm install -E @mui/base

# Already installed (for reference):
npm list react react-dom next
npm list tailwindcss
npm list react-icons
```

### Version Compatibility

- **Next.js**: 14.0+ (App Router required)
- **React**: 18.0+
- **Tailwind CSS**: 3.0+
- **@mui/base**: Latest (usually compatible with React 18+)

---

## Migration Checklist

Before deploying to production:

- [ ] Component structure complete
- [ ] Styling matches design system
- [ ] All tabs functional
- [ ] URL persistence working
- [ ] Keyboard navigation tested
- [ ] Mobile breakpoints verified
- [ ] Desktop layout untouched
- [ ] ARIA labels present
- [ ] Dark mode compatible
- [ ] Performance acceptable
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Code review approved
- [ ] Staging environment verified
- [ ] Ready for release after first deploy

---

## Questions & Support

### Open Questions

1. Should we add swipe gesture support immediately or defer to Phase 2?
2. Should tab icons be included, or text labels only?
3. Should we add a `prefers-reduced-motion` media query for animations?
4. Should we store last tab in localStorage, or only rely on URL?

### Resources

- **Base UI Documentation**: https://mui.com/base/
- **Next.js useSearchParams**: https://nextjs.org/docs/app/api-reference/functions/use-search-params
- **Tailwind Transitions**: https://tailwindcss.com/docs/transition-property
- **ARIA Tab Pattern**: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- **React Best Practices**: Your project's AGENTS.md

---

## Related Design System Elements

**Design Reference**: "The Monolith Gallery"
- Primary Color: `#000000` (The Monolith)
- Secondary Color: `#4B41E1` (Digital Indigo)
- Background: `#F9F9F9` (The Canvas)
- Typography: Geist (Editorial precision)

**Tab Styling Inspiration**:
- Use secondary color (`#4B41E1`) for active tab indicator
- Use muted colors for inactive tabs
- Maintain design system spacing and typography scales

---

## Implementation Notes

### Current Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Base UI default styling | Override with Tailwind `className` prop |
| URL sync with React state | Use `useSearchParams()` + `useEffect()` |
| Mobile detection SSR safe | Use client component with effect hook |
| Layout shift on tab change | Set fixed height for content area |
| Animation performance | Use CSS transforms, not height changes |

### Known Limitations

- Base UI Tabs may need custom styling (not out-of-box ready)
- Mobile breakpoint at 768px (iPad breakpoint)
- No swipe gestures in initial implementation
- Tab content not lazy-loaded (loads on component mount)

---

## Success Criteria

✅ **This feature is complete when:**

1. Mobile users can tab through portfolio sections without scrolling
2. URL reflects active tab and persists on refresh
3. Desktop/tablet layouts remain unchanged
4. All accessibility standards met (WCAG AA)
5. Mobile performance is smooth (< 100ms tab switch)
6. Code follows project standards (named exports, cn(), etc.)
7. Documentation complete and team ready for deployment

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-04-03 | v1.0 | Initial implementation plan created |
| TBD | v1.1 | Updates after initial development phase |

---

## Next Steps

1. **Review this spec** - Get feedback on approach and priorities
2. **Set up branch** - Create `feat/mobile-tabs-navigation` branch
3. **Install dependencies** - `npm install -E @mui/base`
4. **Start Phase 1** - Begin component structure
5. **Daily updates** - Add progress notes to spec
6. **Test early** - Deploy to staging for mobile testing
7. **Iterate based on feedback** - Refine UX based on testing

---

**Spec Created**: April 3, 2026  
**Expected Start**: After first portfolio deploy  
**Target Completion**: 2-3 weeks  
**Owner**: João Vitor
