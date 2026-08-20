/**
 * Generate a natural language summary of top languages
 * Pure utility function - no side effects, no API calls
 */
export function generateLanguageSummary(topLanguages: string[]): string {
  const [first, second, third] = topLanguages;

  return `Primarily ${first} and ${second} with some ${third}`;
}

export const LanguageSummary = ({
  topLanguages,
}: {
  topLanguages: string[];
}) => {
  return (
    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
      {generateLanguageSummary(topLanguages)}
    </p>
  );
};
