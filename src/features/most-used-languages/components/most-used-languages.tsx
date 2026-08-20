import type { AggregatedLanguages } from "@/types/github";
import { getLanguagesInfo } from "../queries";
import { LanguageChart } from "./language-chart";
import { LanguageSummary } from "./language-summary";
import { MostUsedLanguagesList } from "./most-used-languages-list";

export const MostUsedLanguages = async () => {
  const aggregatedLanguages: AggregatedLanguages | null =
    await getLanguagesInfo();

  if (
    !aggregatedLanguages ||
    !aggregatedLanguages.languages ||
    aggregatedLanguages.languages.length === 0
  ) {
    return <div>No programming languages data available.</div>;
  }

  const { languages, topLanguages } = aggregatedLanguages;

  return (
    <div className="border-t border-border pt-6">
      <h2 className="portfolio-card-subtitle uppercase tracking-wider mb-4">
        {"My Github\'s most used programming languages"}
      </h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-1">
        <LanguageChart languages={languages} />
        <MostUsedLanguagesList languages={languages} />
      </div>
      <LanguageSummary topLanguages={topLanguages} />
    </div>
  );
};
