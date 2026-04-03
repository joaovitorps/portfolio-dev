"use client";

const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

interface ContrastPair {
  bgHex: string;
  textHex: string;
  bgLabel: string;
  textLabel: string;
}

function hexToLuminance(hex: string): number {
  const result = HEX_REGEX.exec(hex);
  if (!result) return 0;

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const adjustR = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
  const adjustG = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
  const adjustB = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

  return 0.2126 * adjustR + 0.7152 * adjustG + 0.0722 * adjustB;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = hexToLuminance(hex1);
  const l2 = hexToLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

function getWCAGLevel(ratio: number): "AAA" | "AA" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
}

interface ContrastGridProps {
  pairs: ContrastPair[];
}

export const ContrastGrid = ({ pairs }: ContrastGridProps) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="contrast-grid">
        <thead>
          <tr>
            <th>Background</th>
            <th>Text Color</th>
            <th>Preview</th>
            <th>Ratio</th>
            <th>WCAG Level</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair) => {
            const ratio = getContrastRatio(pair.bgHex, pair.textHex);
            const level = getWCAGLevel(ratio);
            const pairKey = `${pair.bgHex}-${pair.textHex}`;

            return (
              <tr key={pairKey}>
                <td>{pair.bgLabel}</td>
                <td>{pair.textLabel}</td>
                <td>
                  <div
                    className="contrast-cell"
                    style={{
                      backgroundColor: pair.bgHex,
                      color: pair.textHex,
                    }}
                  >
                    Sample Text
                  </div>
                </td>
                <td>
                  <div className="contrast-ratio">{ratio}:1</div>
                </td>
                <td>
                  <span
                    className={`contrast-badge contrast-badge-${level.toLowerCase()}`}
                  >
                    {level === "AAA" && "✅"}
                    {level === "AA" && "⚠️"}
                    {level === "Fail" && "❌"}
                    {` WCAG ${level}`}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
