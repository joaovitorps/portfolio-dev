export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  fork: boolean;
  archived: boolean;
  private: boolean;
}

export interface RepoLanguages {
  [language: string]: number; // language name -> bytes
}

export interface LanguageData {
  language: string;
  bytes: number;
  percentage: number;
  color: string;
}

export interface AggregatedLanguages {
  languages: LanguageData[];
  totalBytes: number;
  topLanguages: string[]; // Top 3 language names
}
