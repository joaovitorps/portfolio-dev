"use client";

interface ColorSwatchProps {
  color: string;
  name: string;
  category: string;
}

const HEX_TO_RGB_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgb(hex: string): string {
  const result = HEX_TO_RGB_REGEX.exec(hex);
  if (!result) return "N/A";
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `${r}, ${g}, ${b}`;
}

export const ColorSwatch = ({ color, name, category }: ColorSwatchProps) => {
  const rgb = hexToRgb(color);

  return (
    <div className="color-swatch">
      <div
        className="color-swatch-box"
        style={{ backgroundColor: color }}
        title={`${name} (${category})`}
      />
      <div className="color-swatch-info">
        <h4 className="color-swatch-name">{name}</h4>
        <p className="color-swatch-category">{category}</p>
        <div className="color-swatch-codes">
          <div className="color-swatch-code">
            <span className="color-swatch-label">Hex:</span>
            <span className="color-swatch-value">{color}</span>
          </div>
          <div className="color-swatch-code">
            <span className="color-swatch-label">RGB:</span>
            <span className="color-swatch-value">{rgb}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
