import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Eye, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3
} from 'lucide-react';
import type { IKpi } from '../../../../product/sections/innsikt-analyser-tilgjengelighet-spr-k/types';

interface KpiCardsProps {
  kpis: IKpi[];
}

const KpiCards: React.FC<KpiCardsProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi) => (
        <Card key={kpi.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            {kpi.id === 'totalViews' && <Eye className="h-4 w-4 text-muted-foreground" />}
            {kpi.id === 'formsStarted' && <FileText className="h-4 w-4 text-muted-foreground" />}
            {kpi.id === 'formsSubmitted' && <CheckCircle className="h-4 w-4 text-muted-foreground" />}
            {kpi.id === 'formsFailed' && <AlertTriangle className="h-4 w-4 text-muted-foreground" />}
            {kpi.id === 'avgCompletion' && <TrendingUp className="h-4 w-4 text-muted-foreground" />}
            {kpi.id === 'activeUsers' && <BarChart3 className="h-4 w-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{kpi.description}</p>
            <div className={`text-sm ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {kpi.changeType === 'positive' ? '+' : ''}{kpi.change}% 
              {kpi.changeType === 'positive' ? ' ↑' : ' ↓'}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KpiCards;