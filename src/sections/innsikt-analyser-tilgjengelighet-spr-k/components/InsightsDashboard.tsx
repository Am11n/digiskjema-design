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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xl, 1.5rem)' }}>
      {/* Dashboard Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{
            fontSize: 'var(--fds-font-size-3xl, 1.875rem)',
            fontWeight: 'var(--fds-font-weight-bold, 700)',
            color: 'var(--fds-text-default, #1f2021)',
            fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
          }}>Innsikt</h1>
          <p style={{
            color: 'var(--fds-text-subtle, #717274)',
            fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
          }}>Analyseverktøy for bruksmønstre, tilgjengelighet og språkbruk</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--fds-spacing-xs, 0.5rem)' }}>
          <Button variant="outline" onClick={() => onExport?.('csv')}>
            <Download style={{ width: '1rem', height: '1rem', marginRight: 'var(--fds-spacing-xs, 0.5rem)' }} />
            Eksporter CSV
          </Button>
          <Button variant="outline" onClick={() => onExport?.('pdf')}>
            <Download style={{ width: '1rem', height: '1rem', marginRight: 'var(--fds-spacing-xs, 0.5rem)' }} />
            Eksporter PDF
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardContent style={{ paddingTop: 'var(--fds-spacing-xl, 1.5rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--fds-spacing-m, 0.75rem)' }}>
            <div>
              <label style={{
                fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                fontWeight: 'var(--fds-font-weight-medium, 500)',
                marginBottom: 'var(--fds-spacing-xxs, 0.25rem)',
                display: 'block',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>Periode</label>
              <select 
                style={{
                  width: '100%',
                  padding: 'var(--fds-spacing-xs, 0.5rem)',
                  border: '1px solid var(--fds-gray-200, #dbdbdc)',
                  borderRadius: 'var(--fds-border-radius-md, 0.375rem)',
                  fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
                  fontSize: 'var(--fds-font-size-sm, 0.875rem)'
                }}
                onChange={(e) => onFilterChange?.({ period: e.target.value })}
              >
                <option value="last7">Siste 7 dager</option>
                <option value="last30">Siste 30 dager</option>
                <option value="last90">Siste 90 dager</option>
                <option value="custom">Egendefinert</option>
              </select>
            </div>
            <div>
              <label style={{
                fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                fontWeight: 'var(--fds-font-weight-medium, 500)',
                marginBottom: 'var(--fds-spacing-xxs, 0.25rem)',
                display: 'block',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>Skjema</label>
              <select 
                style={{
                  width: '100%',
                  padding: 'var(--fds-spacing-xs, 0.5rem)',
                  border: '1px solid var(--fds-gray-200, #dbdbdc)',
                  borderRadius: 'var(--fds-border-radius-md, 0.375rem)',
                  fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
                  fontSize: 'var(--fds-font-size-sm, 0.875rem)'
                }}
                onChange={(e) => onFilterChange?.({ formId: e.target.value })}
              >
                <option value="">Alle skjema</option>
                {topForms.map(form => (
                  <option key={form.id} value={form.id}>{form.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{
                fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                fontWeight: 'var(--fds-font-weight-medium, 500)',
                marginBottom: 'var(--fds-spacing-xxs, 0.25rem)',
                display: 'block',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>Leietaker</label>
              <select 
                style={{
                  width: '100%',
                  padding: 'var(--fds-spacing-xs, 0.5rem)',
                  border: '1px solid var(--fds-gray-200, #dbdbdc)',
                  borderRadius: 'var(--fds-border-radius-md, 0.375rem)',
                  fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
                  fontSize: 'var(--fds-font-size-sm, 0.875rem)'
                }}
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
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--fds-gray-200, #dbdbdc)' }}>
                    <th style={{
                      textAlign: 'left',
                      padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                      fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                      fontWeight: 'var(--fds-font-weight-bold, 700)',
                      fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                    }}>Skjema</th>
                    <th style={{
                      textAlign: 'right',
                      padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                      fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                      fontWeight: 'var(--fds-font-weight-bold, 700)',
                      fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                    }}>Visninger</th>
                    <th style={{
                      textAlign: 'right',
                      padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                      fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                      fontWeight: 'var(--fds-font-weight-bold, 700)',
                      fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                    }}>Startet</th>
                    <th style={{
                      textAlign: 'right',
                      padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                      fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                      fontWeight: 'var(--fds-font-weight-bold, 700)',
                      fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                    }}>Fullført</th>
                    <th style={{
                      textAlign: 'right',
                      padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                      fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                      fontWeight: 'var(--fds-font-weight-bold, 700)',
                      fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                    }}>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topForms.map((form) => (
                    <tr 
                      key={form.id} 
                      style={{
                        borderBottom: '1px solid var(--fds-gray-200, #dbdbdc)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--fds-blue-50, #e7f3fa)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{
                        padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                        fontWeight: 'var(--fds-font-weight-medium, 500)',
                        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                      }}>{form.name}</td>
                      <td style={{
                        padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                        textAlign: 'right',
                        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                      }}>{form.views.toLocaleString()}</td>
                      <td style={{
                        padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                        textAlign: 'right',
                        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                      }}>{form.starts.toLocaleString()}</td>
                      <td style={{
                        padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                        textAlign: 'right',
                        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                      }}>{form.submissions.toLocaleString()}</td>
                      <td style={{
                        padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                        textAlign: 'right',
                        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                      }}>{form.completionRate}%</td>
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