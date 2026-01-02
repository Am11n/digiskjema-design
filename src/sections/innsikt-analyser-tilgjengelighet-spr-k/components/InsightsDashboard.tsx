import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download
} from 'lucide-react';
import type { IInsightsDashboardProps } from '../../../../product/sections/innsikt-analyser-tilgjengelighet-spr-k/types';
import KpiCards from './KpiCards';
import A11yPanel from './A11yPanel';
import LanguagePanel from './LanguagePanel';

interface InsightsDashboardProps extends IInsightsDashboardProps {}

const InsightsDashboard: React.FC<InsightsDashboardProps> = ({
  kpis,
  series,
  topForms,
  a11y,
  languages,
  onFilterChange,
  onExport
}) => {
  // Simple visualization for time series data using divs to create a "sparkline-ish" effect
  const renderTimeSeriesChart = () => {
    // Find min and max values for scaling
    const allValues = series.flatMap(d => [d.views, d.starts, d.submissions, d.failures]);
    const maxVal = Math.max(...allValues);
    const minVal = Math.min(...allValues);
    const range = maxVal - minVal || 1; // Avoid division by zero
    
    return (
      <div className="h-40 flex items-end space-x-1">
        {series.map((dataPoint, index) => {
          // Calculate relative heights for each metric
          const viewsHeight = 35 + ((dataPoint.views - minVal) / range) * 60; // Base height + scaled value
          const startsHeight = 30 + ((dataPoint.starts - minVal) / range) * 60;
          const submissionsHeight = 25 + ((dataPoint.submissions - minVal) / range) * 60;
          const failuresHeight = 10 + ((dataPoint.failures - minVal) / range) * 40;
          
          return (
            <div key={index} className="flex flex-col items-center space-y-1 flex-1 min-w-0">
              <div 
                className="w-full bg-blue-200 rounded-t hover:opacity-75 transition-opacity"
                style={{ height: `${viewsHeight}px` }}
                title={`Visninger: ${dataPoint.views}`}
              ></div>
              <div 
                className="w-full bg-green-200 rounded-t hover:opacity-75 transition-opacity"
                style={{ height: `${startsHeight}px` }}
                title={`Startet: ${dataPoint.starts}`}
              ></div>
              <div 
                className="w-full bg-purple-200 rounded-t hover:opacity-75 transition-opacity"
                style={{ height: `${submissionsHeight}px` }}
                title={`Sendt inn: ${dataPoint.submissions}`}
              ></div>
              <div 
                className="w-full bg-red-200 rounded-t hover:opacity-75 transition-opacity"
                style={{ height: `${failuresHeight}px` }}
                title={`Feil: ${dataPoint.failures}`}
              ></div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Innsikt</h1>
          <p className="text-muted-foreground">Analyseverktøy for bruksmønstre, tilgjengelighet og språkbruk</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onExport?.('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Eksporter CSV
          </Button>
          <Button variant="outline" onClick={() => onExport?.('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Eksporter PDF
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Periode</label>
              <select 
                className="w-full p-2 border rounded-md"
                onChange={(e) => onFilterChange?.({ period: e.target.value })}
              >
                <option value="last7">Siste 7 dager</option>
                <option value="last30">Siste 30 dager</option>
                <option value="last90">Siste 90 dager</option>
                <option value="custom">Egendefinert</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Skjema</label>
              <select 
                className="w-full p-2 border rounded-md"
                onChange={(e) => onFilterChange?.({ formId: e.target.value })}
              >
                <option value="">Alle skjema</option>
                {topForms.map(form => (
                  <option key={form.id} value={form.id}>{form.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Leietaker</label>
              <select 
                className="w-full p-2 border rounded-md"
                onChange={(e) => onFilterChange?.({ tenant: e.target.value })}
              >
                <option value="">Alle leietakere</option>
                <option value="tenant1">Hovedorganisasjon</option>
                <option value="tenant2">Avdeling A</option>
                <option value="tenant3">Avdeling B</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <KpiCards kpis={kpis} />

      {/* Charts and Top Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Bruksoversikt over tid</CardTitle>
          </CardHeader>
          <CardContent>
            {renderTimeSeriesChart()}
          </CardContent>
        </Card>

        {/* Top Forms Table */}
        <Card>
          <CardHeader>
            <CardTitle>Toppskjema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Skjema</th>
                    <th className="text-right py-2">Visninger</th>
                    <th className="text-right py-2">Startet</th>
                    <th className="text-right py-2">Fullført</th>
                    <th className="text-right py-2">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topForms.map((form) => (
                    <tr key={form.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 font-medium">{form.name}</td>
                      <td className="py-2 text-right">{form.views.toLocaleString()}</td>
                      <td className="py-2 text-right">{form.starts.toLocaleString()}</td>
                      <td className="py-2 text-right">{form.submissions.toLocaleString()}</td>
                      <td className="py-2 text-right">{form.completionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessibility Panel */}
      <A11yPanel findings={a11y} />

      {/* Language Panel */}
      <LanguagePanel languages={languages} />
    </div>
  );
};

export default InsightsDashboard;