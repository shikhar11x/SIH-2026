export interface DemographicOverview {
  totalUsers: number;
  avgAge: number;
  topCountry: string;
  topLanguage: string;
}

export interface AgeGroup {
  range: string;
  percentage: number;
  count: number;
}

export interface GeoDistribution {
  country: string;
  percentage: number;
  count: number;
  code: string;
}

export interface LanguageDistribution {
  language: string;
  percentage: number;
  count: number;
}

export interface InterestCategory {
  category: string;
  percentage: number;
  count: number;
}
