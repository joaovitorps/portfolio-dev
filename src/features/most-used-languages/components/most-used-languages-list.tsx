import { MAX_PROGRAMMING_LANGUAGES } from "@/lib/utils";
import { LanguageData } from "@/types";

export const MostUsedLanguagesList = ({
  languages,
}: {
  languages: LanguageData[];
}) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 text-xs md:col-span-2">
      {languages.slice(0, MAX_PROGRAMMING_LANGUAGES).map((lang) => (
        <div key={lang.name} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ backgroundColor: lang.color }}
          />
          <span className="text-foreground truncate">{lang.name}</span>
          <span className="text-muted-foreground ml-auto">
            {lang.percentage.toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );
};
