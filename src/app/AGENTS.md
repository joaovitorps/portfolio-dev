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
