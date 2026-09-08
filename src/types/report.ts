export interface Report {
  id: string;
  title: string;
  date: string;
  postsAnalyzed: number;
  status: 'complete' | 'generating' | 'failed';
  type: string;
  sections: string[];
}

export interface ReportConfig {
  sections: string[];
  dateRange: string;
  platforms: string[];
  format: 'pdf' | 'csv' | 'json';
}
