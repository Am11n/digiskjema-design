import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import type { IA11yFinding } from '../../../../product/sections/innsikt-analyser-tilgjengelighet-spr-k/types';

interface A11yPanelProps {
  findings: IA11yFinding[];
}

const A11yPanel: React.FC<A11yPanelProps> = ({ findings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tilgjengelighet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="text-2xl font-bold text-red-600">
              {findings.filter(f => f.severity === 'critical').length}
            </div>
            <div className="text-sm text-red-600">Kritisk</div>
          </div>
          <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-md">
            <div className="text-2xl font-bold text-orange-600">
              {findings.filter(f => f.severity === 'high').length}
            </div>
            <div className="text-sm text-orange-600">Høy</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="text-2xl font-bold text-yellow-600">
              {findings.filter(f => f.severity === 'medium').length}
            </div>
            <div className="text-sm text-yellow-600">Medium</div>
          </div>
          <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="text-2xl font-bold text-blue-600">
              {findings.filter(f => f.severity === 'low').length}
            </div>
            <div className="text-sm text-blue-600">Lav</div>
          </div>
        </div>
        
        <div className="space-y-3">
          {findings.map((finding) => (
            <div key={finding.id} className="flex items-start p-3 border rounded-md bg-muted/30">
              <div className="mr-3">
                {finding.severity === 'critical' && (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
                {finding.severity === 'high' && (
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                )}
                {finding.severity === 'medium' && (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                )}
                {finding.severity === 'low' && (
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{finding.area}</h4>
                  <Badge 
                    variant={finding.severity === 'critical' ? 'destructive' : 
                            finding.severity === 'high' ? 'default' : 
                            finding.severity === 'medium' ? 'secondary' : 'outline'}
                  >
                    {finding.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{finding.recommendation}</p>
                <div className="mt-2 text-xs">
                  <span className="font-medium">Påvirkede skjema:</span> {finding.formsAffected.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default A11yPanel;