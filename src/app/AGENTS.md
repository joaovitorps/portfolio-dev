# App-Level Code Conventions

## React Components: Named Exports + Const Functions ONLY

All React components in `/src/app` and `/src/components` **must** follow these rules:

### 1. **No Default Exports**
```typescript
// ❌ WRONG - Don't use default export
export default function MyComponent() { ... }

// ✅ CORRECT - Use named export
export const MyComponent = () => { ... }
```

### 2. **Use Const Arrow Functions, Not Function Declarations**
```typescript
// ❌ WRONG - Function declarations
export function MyComponent() { ... }

// ✅ CORRECT - Const arrow functions
export const MyComponent = () => { ... }
```

### 3. **Complete Example**
```typescript
"use client";

import { useState } from "react";
import type { MyComponentProps } from "@/lib/types";

export const MyComponent = ({ title, children }: MyComponentProps) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      {children}
    </div>
  );
};
```

### 4. **Exception: Page & Layout Files (Next.js)**
Files in `/src/app` directory (page.tsx, layout.tsx, error.tsx, etc.) **must** use default exports (this is a Next.js requirement):
```typescript
// ✅ CORRECT for Next.js App Router files
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html>{children}</html>;
}
```

## Import Organization

Imports are automatically organized by Biome (`organizeImports: "on"`) in this order:
1. Node.js built-in modules
2. External packages
3. Internal imports (with `@/` prefix)
4. Type imports (sorted last)

Biome will handle this automatically on save.

## File Naming

- **Components**: PascalCase (e.g., `ProfileCard.tsx`, `ThemeToggle.tsx`)
- **Utilities**: camelCase (e.g., `github-utils.ts`, `github-mock.ts`)
- **Types**: camelCase (e.g., `types.ts`)

## Tailwind CSS Styling Pattern

### Class Merging with tailwind-merge

**Never use template literals with classes**, always use `cn()` utility with `tailwind-merge` for proper class merging and array-based composition:

```typescript
import { cn } from "@/lib/utils";

// ❌ WRONG - Template literal with classes
const buttonClass = `w-10 h-10 rounded-md ${isActive ? "bg-primary" : "bg-muted"}`;

// ✅ CORRECT - Use cn() with array classes
const buttonClasses = cn(
  "w-10 h-10 rounded-md",
  "transition-colors duration-200",
  isActive && "bg-primary",
  !isActive && "bg-muted"
);

export const Button = ({ isActive, className }: ButtonProps) => (
  <button className={cn(buttonClasses, className)} />
);
```

### Key Benefits
- Tailwind classes properly merge (no conflicting specificity)
- Conditional classes work cleanly
- Custom `className` prop never conflicts with defaults
- Readable and maintainable

## Icon Pattern: Use react-icons

Always use React component icons from `react-icons`, **never** use CSS classes like `<i className="ri-*-line" />` or inline `<i>` tags.

### Installation
```bash
npm install -E react-icons
```

### Usage

react-icons provides icons from multiple popular icon libraries under different prefixes. Each library has its own 2-letter prefix:

```typescript
// Remix Icon (ri) - recommended for this project
import { RiMoonLine, RiSunLine, RiGithubLine } from "react-icons/ri";

// Material Design (md)
import { MdAccessibility, MdOutlineHome } from "react-icons/md";

// Font Awesome (fa6)
import { FaHome, FaGithub } from "react-icons/fa6";

// Feather Icons (fi)
import { FiHome, FiSettings } from "react-icons/fi";

// Other libraries available
import { HiHome } from "react-icons/hi";           // Heroicons
import { AiFillHome } from "react-icons/ai";       // Ant Design
import { TbHome } from "react-icons/tb";           // Tabler Icons
import { LuHome } from "react-icons/lu";           // Lucide
import { IoHome } from "react-icons/io5";          // Ionicons
```

### Complete Example

```typescript
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      className={cn(
        "inline-flex items-center justify-center",
        "w-10 h-10 rounded-md",
        "bg-muted hover:bg-muted/80",
        "transition-colors duration-200",
        className
      )}
    >
      {isDark ? (
        <RiMoonLine size={20} />
      ) : (
        <RiSunLine size={20} />
      )}
    </button>
  );
};
```

### Icon Props
- `size`: Number (width and height in pixels, default 24)
- `color`: String (hex, rgb, or CSS color name, defaults to currentColor)
- `className`: String (for additional Tailwind classes)
- `style`: Object (inline CSS styles)
- `title`: String (accessibility tooltip)
- `role`: String (ARIA role for accessibility)

### Finding Icons

Visit https://react-icons.github.io/react-icons/ to search for icons:
- Browse by library (filter by "ri" for Remix Icon)
- Copy the import statement directly
- Mix and match icons from any available library

### Common Social/UI Icons (Remix Icon)
- `RiMoonLine`, `RiMoonFill` - Moon/Night
- `RiSunLine`, `RiSunFill` - Sun/Day
- `RiGithubLine`, `RiGithubFill` - GitHub
- `RiLinkedinBoxLine` - LinkedIn
- `RiMailLine` - Email
- `RiDownloadLine` - Download
- `RiFolderLine` - Folder
- `RiExternalLinkLine` - External link

## Component Composition Pattern

### Always Use Created Components Instead of HTML Elements

**Priority: Always use custom components over native HTML elements** when a suitable component exists in `/src/components/ui/`.

### Why
- Ensures consistent styling and behavior across the app
- Maintains design system compliance
- Easier to update styles globally (change once in component, applies everywhere)
- Better type safety and prop validation
- Reduces code duplication

### Rule

```typescript
// ❌ WRONG - Using native HTML
export const Profile = () => {
  return (
    <>
      <button onClick={() => navigate('/about')}>
        View Profile
      </button>
      <a href="https://github.com" target="_blank">
        GitHub
      </a>
    </>
  );
};

// ✅ CORRECT - Using custom components
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export const Profile = () => {
  return (
    <>
      <Button onClick={() => navigate('/about')}>
        View Profile
      </Button>
      <ButtonLink href="https://github.com" target="_blank">
        GitHub
      </ButtonLink>
    </>
  );
};
```

### Available Components

Current UI components in `/src/components/ui/`:
- **Button** - Native button element with variants (default, secondary, outline, ghost, destructive, link) and sizes (sm, md, lg, icon, icon-sm, icon-lg)
- **ButtonLink** - Anchor tag styled like Button, supports same variants and sizes, accepts `href`, `target`, `rel` props
- **Badge** - Small status/label component with variants (default, secondary, muted, destructive)
- **Card** - Container component with CardHeader and CardContent

### Creating New Components

If a UI element doesn't exist yet:

1. **Discuss first** - Ask if we should create a new component
2. **Decide together** - Confirm the component purpose, variants, and props
3. **Create in `/src/components/ui/`** - Follow the existing component patterns
4. **Document variants and sizes** - Add to components showcase page
5. **Update this guide** - Add to the "Available Components" list

### Example: Component Anatomy

```typescript
import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    const baseStyles = ["inline-flex", "items-center", "gap-2"];
    
    const variantStyles = {
      default: ["bg-primary", "text-primary-foreground"],
      secondary: ["bg-secondary", "text-secondary-foreground"],
    };

    const sizeStyles = {
      sm: ["h-8 px-3"],
      md: ["h-10 px-4"],
      lg: ["h-12 px-6"],
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MyComponent.displayName = "MyComponent";
```

## Theme System

### Light and Dark Mode with CSS Variables

The application supports light and dark modes using CSS variables defined in `/src/app/globals.css`:

```css
:root {
  /* Light mode (default) */
  --primary: #0D5C47;
  --background: #f8fffe;
  --foreground: #000;
  --muted: #e0e0e0;
}

.dark {
  /* Dark mode */
  --primary: #408A71;
  --background: #000;
  --foreground: #fff;
  --muted: #333;
}
```

### Why This Approach

- **Consistent**: All components use the same variables
- **Maintainable**: Change theme colors in one place, applies everywhere
- **No runtime overhead**: Pure CSS, no JavaScript computation needed
- **Accessible**: Respects user's OS preference initially via `next-themes`

### Using Theme Variables in Components

Always reference CSS variables instead of hardcoding colors:

```typescript
// ✅ CORRECT - Theme-aware
className="bg-[var(--background)] text-[var(--foreground)]"

// ❌ WRONG - Hardcoded colors
className="bg-white text-black"
```

### Theme Switching

Theme switching is managed by `next-themes` library:
- Reads user preference from localStorage
- Applies class to `<html>` element (`.dark` for dark mode)
- CSS automatically applies corresponding variables

Components don't need to handle theme logic — just use the CSS variables.

### Extending the Theme

To add new colors:

1. Define variables in `/src/app/globals.css` for both `:root` and `.dark`
2. Use `var(--your-color-name)` in components via Tailwind
3. All components automatically inherit the new colors

**Why**: Centralized theme management ensures consistency and makes global style changes trivial.

## Creating New Components

When you need a new UI component, follow this pattern:

### 1. Decide: Reusable or Feature-Specific?

- **Reusable UI components** (`/src/components/ui/`) - Button, Card, Badge, Modal, etc.
  - Used across multiple pages or in different contexts
  - Generic variants (sizes, colors, states)
  - No business logic, pure UI

- **Feature components** (`/src/components/`) - ProfileCard, ExperienceCard, etc.
  - Specific to a feature or page
  - May contain business logic or data fetching
  - Composed from UI components

### 2. Component Anatomy

```typescript
import type React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  (
    {
      variant = "default",
      size = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = ["inline-flex", "items-center", "gap-2"];

    const variantStyles = {
      default: ["bg-[var(--primary)]", "text-[var(--background)]"],
      secondary: ["bg-[var(--muted)]", "text-[var(--foreground)]"],
    };

    const sizeStyles = {
      sm: ["h-8", "px-3"],
      md: ["h-10", "px-4"],
      lg: ["h-12", "px-6"],
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MyComponent.displayName = "MyComponent";
```

### 3. Key Patterns

- **Use `forwardRef`** - Allows parent components to access underlying DOM element
- **Extend `React.HTMLAttributes`** - Supports standard HTML props (className, onClick, etc.)
- **Use `cn()` for styling** - Combines base styles with conditional variants + custom classes
- **Always set `displayName`** - Helps with debugging in React DevTools
- **Use CSS variables** - Theme-aware colors, never hardcode

### 4. Why These Patterns Matter

| Pattern | Why |
|---------|-----|
| `forwardRef` | Allows components to be wrapped/controlled by parents |
| `extend React.HTMLAttributes` | Ensures components work like native elements |
| `cn()` with arrays | Prevents Tailwind conflicts, clean conditional logic |
| `displayName` | Makes debugging easier in dev tools |
| CSS variables | Components automatically adapt to theme changes |

### 5. File Placement

```
/src/components/
  /ui/                          # Reusable UI components
    button.tsx                  # Generic button component
    card.tsx                    # Generic card container
    badge.tsx                   # Generic badge component
  profile-card.tsx              # Feature: Profile showcase
  experience-card.tsx           # Feature: Single experience item
  theme-toggle.tsx              # Feature: Theme switcher
```

**Why**: Clear separation makes it easy to find components and understand their scope

### 6. When to Create vs. Compose

```typescript
// ❌ DON'T - Create new component for minor variation
export const RedButton = () => <Button className="bg-red-500" />;

// ✅ DO - Use variant system
export const MyComponent = () => <Button variant="destructive" />;

// ✅ DO - Compose existing components
export const ProfileHeader = () => (
  <Card>
    <CardHeader>
      <h1>Profile</h1>
    </CardHeader>
  </Card>
);
```

**Why**: Reusing variants and composing components keeps the codebase maintainable
