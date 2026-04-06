"use client";

export const TypographyPreview = () => {
  return (
    <div className="typography-preview">
      <div className="typography-section">
        <h3 className="section-subtitle">Headings</h3>
        <div className="typography-item">
          <h1>Heading 1 (H1)</h1>
          <span className="typography-label">
            font-size: 2.5rem, font-weight: 700
          </span>
        </div>
        <div className="typography-item">
          <h2>Heading 2 (H2)</h2>
          <span className="typography-label">
            font-size: 2rem, font-weight: 700
          </span>
        </div>
        <div className="typography-item">
          <h3>Heading 3 (H3)</h3>
          <span className="typography-label">
            font-size: 1.5rem, font-weight: 600
          </span>
        </div>
        <div className="typography-item">
          <h4>Heading 4 (H4)</h4>
          <span className="typography-label">
            font-size: 1.25rem, font-weight: 600
          </span>
        </div>
      </div>

      <div className="typography-section">
        <h3 className="section-subtitle">Body Text</h3>
        <div className="typography-item">
          <p className="body-lg">
            Large body text: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <span className="typography-label">
            font-size: 1.125rem, font-weight: 400
          </span>
        </div>
        <div className="typography-item">
          <p className="body-md">
            Medium body text (default): Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <span className="typography-label">
            font-size: 1rem, font-weight: 400
          </span>
        </div>
        <div className="typography-item">
          <p className="body-sm">
            Small body text: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
          <span className="typography-label">
            font-size: 0.875rem, font-weight: 400
          </span>
        </div>
      </div>

      <div className="typography-section">
        <h3 className="section-subtitle">Special Text Styles</h3>
        <div className="typography-item">
          <p className="text-muted">
            Muted text: Less prominent text for secondary information or
            descriptions.
          </p>
          <span className="typography-label">Reduced opacity, muted color</span>
        </div>
        <div className="typography-item">
          <p>
            <strong>Bold text:</strong> For emphasis in body content.
          </p>
          <span className="typography-label">font-weight: 700</span>
        </div>
        <div className="typography-item">
          <p>
            <em>Italic text:</em> For secondary emphasis or citations.
          </p>
          <span className="typography-label">font-style: italic</span>
        </div>
        <div className="typography-item">
          <p>
            <code>Code text:</code> For inline code snippets or technical terms.
          </p>
          <span className="typography-label">
            Monospace font, background highlight
          </span>
        </div>
      </div>
    </div>
  );
};
