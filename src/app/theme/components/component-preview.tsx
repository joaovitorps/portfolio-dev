"use client";

import { ThemeBadge } from "./badge";
import { ThemeButton } from "./button";
import { ThemeCard } from "./card";

export const ComponentPreview = () => {
  return (
    <div className="component-preview">
      {/* BUTTONS */}
      <div className="component-group">
        <h3 className="component-group-title">Buttons</h3>

        <div className="component-states">
          <span className="component-state-label">Default Variant:</span>
          <ThemeButton>Default</ThemeButton>
          <ThemeButton disabled>Disabled</ThemeButton>
        </div>

        <div className="component-states">
          <span className="component-state-label">Secondary Variant:</span>
          <ThemeButton variant="secondary">Secondary</ThemeButton>
          <ThemeButton variant="secondary" disabled>
            Disabled
          </ThemeButton>
        </div>

        <div className="component-states">
          <span className="component-state-label">Outline Variant:</span>
          <ThemeButton variant="outline">Outline</ThemeButton>
          <ThemeButton variant="outline" disabled>
            Disabled
          </ThemeButton>
        </div>

        <div className="component-states">
          <span className="component-state-label">Ghost Variant:</span>
          <ThemeButton variant="ghost">Ghost</ThemeButton>
          <ThemeButton variant="ghost" disabled>
            Disabled
          </ThemeButton>
        </div>

        <div className="component-states">
          <span className="component-state-label">Destructive Variant:</span>
          <ThemeButton variant="destructive">Destructive</ThemeButton>
          <ThemeButton variant="destructive" disabled>
            Disabled
          </ThemeButton>
        </div>

        <div className="component-states">
          <span className="component-state-label">Button Sizes:</span>
          <ThemeButton size="sm">Small</ThemeButton>
          <ThemeButton size="md">Medium</ThemeButton>
          <ThemeButton size="lg">Large</ThemeButton>
        </div>
      </div>

      {/* BADGES */}
      <div className="component-group">
        <h3 className="component-group-title">Badges</h3>

        <div className="component-states">
          <span className="component-state-label">Default Variant:</span>
          <ThemeBadge>Default</ThemeBadge>
          <ThemeBadge variant="secondary">Secondary</ThemeBadge>
          <ThemeBadge variant="destructive">Destructive</ThemeBadge>
          <ThemeBadge variant="outline">Outline</ThemeBadge>
        </div>

        <div className="component-states">
          <span className="component-state-label">Badge Sizes:</span>
          <ThemeBadge size="sm">Small</ThemeBadge>
          <ThemeBadge size="md">Medium</ThemeBadge>
          <ThemeBadge size="lg">Large</ThemeBadge>
        </div>
      </div>

      {/* CARDS */}
      <div className="component-group">
        <h3 className="component-group-title">Cards</h3>

        <div className="component-states">
          <span className="component-state-label">Basic Card:</span>
        </div>
        <ThemeCard>
          <p>
            This is a basic card with content. Cards are containers for related
            content and actions.
          </p>
        </ThemeCard>

        <div className="component-states">
          <span className="component-state-label">Card with Title:</span>
        </div>
        <ThemeCard title="Card Header">
          <p>
            This card has a header section. The header is useful for titles and
            top-level information.
          </p>
        </ThemeCard>

        <div className="component-states">
          <span className="component-state-label">
            Card with Title & Subtitle:
          </span>
        </div>
        <ThemeCard title="Card Title" subtitle="Card subtitle or description">
          <p>
            Content area of the card. This can contain any HTML or React
            components.
          </p>
        </ThemeCard>
      </div>

      {/* INTERACTIVE DEMO */}
      <div className="component-group">
        <h3 className="component-group-title">Interactive Form Elements</h3>

        <div className="interactive-demo">
          <label
            htmlFor="demo-input"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            Example Input Field:
          </label>
          <input
            id="demo-input"
            type="text"
            placeholder="Type something here..."
            className="theme-input"
          />

          <label
            htmlFor="demo-select"
            style={{ fontSize: "0.875rem", fontWeight: 500, marginTop: "1rem" }}
          >
            Example Select:
          </label>
          <select id="demo-select" className="theme-input">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>

          <label
            htmlFor="demo-textarea"
            style={{ fontSize: "0.875rem", fontWeight: 500, marginTop: "1rem" }}
          >
            Example Textarea:
          </label>
          <textarea
            id="demo-textarea"
            placeholder="Type a longer message..."
            className="theme-input"
            rows={4}
          />

          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <ThemeButton>Submit</ThemeButton>
            <ThemeButton variant="outline">Cancel</ThemeButton>
          </div>
        </div>
      </div>
    </div>
  );
};
