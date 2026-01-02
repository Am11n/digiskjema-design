// KPI types
export interface IKpi {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative';
  description: string;
}

// Time series types
export interface ITimeSeriesPoint {
  date: string;
  views: number;
  starts: number;
  submissions: number;
  failures: number;
}

// Top forms types
export interface ITopFormRow {
  id: string;
  name: string;
  views: number;
  starts: number;
  submissions: number;
  completionRate: number;
  lastUpdated: string;
}

// Accessibility findings types
export interface IA11yFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  area: string;
  recommendation: string;
  formsAffected: string[];
  status: 'open' | 'resolved';
}

// Language usage types
export interface ILanguageUsage {
  nb: {
    percentage: number;
    count: number;
  };
  nn: {
    percentage: number;
    count: number;
  };
  en: {
    percentage: number;
    count: number;
  };
  total: number;
}

// Dashboard props
export interface IInsightsDashboardProps {
  kpis: IKpi[];
  series: ITimeSeriesPoint[];
  topForms: ITopFormRow[];
  a11y: IA11yFinding[];
  languages: ILanguageUsage;
  onFilterChange?: (filters: { 
    period?: string; 
    formId?: string; 
    tenant?: string 
  }) => void;
  onExport?: (format: 'csv' | 'pdf') => void;
}