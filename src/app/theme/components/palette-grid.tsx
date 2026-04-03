"use client";

import { ColorSwatch } from "./color-swatch";

interface PaletteColor {
  hex: string;
  name: string;
  category: "Background" | "Primary" | "Accent" | "Support";
}

interface PaletteGridProps {
  colors: PaletteColor[];
}

export const PaletteGrid = ({ colors }: PaletteGridProps) => {
  return (
    <div className="palette-grid">
      {colors.map((color) => (
        <ColorSwatch
          key={color.hex}
          color={color.hex}
          name={color.name}
          category={color.category}
        />
      ))}
    </div>
  );
};
