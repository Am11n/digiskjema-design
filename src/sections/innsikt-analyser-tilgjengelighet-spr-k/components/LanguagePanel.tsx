import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ILanguageUsage } from '../../../../product/sections/innsikt-analyser-tilgjengelighet-spr-k/types';

interface LanguagePanelProps {
  languages: ILanguageUsage;
}

const LanguagePanel: React.FC<LanguagePanelProps> = ({ languages }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Språkbruk</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md text-center">
              <div className="text-2xl font-bold text-blue-600">{languages.nb.percentage}%</div>
              <div className="text-sm">Norsk Bokmål (nb)</div>
              <div className="text-xs text-muted-foreground mt-1">{languages.nb.count.toLocaleString()} brukere</div>
            </div>
            <div className="p-4 border rounded-md text-center">
              <div className="text-2xl font-bold text-green-600">{languages.nn.percentage}%</div>
              <div className="text-sm">Norsk Nynorsk (nn)</div>
              <div className="text-xs text-muted-foreground mt-1">{languages.nn.count.toLocaleString()} brukere</div>
            </div>
            <div className="p-4 border rounded-md text-center">
              <div className="text-2xl font-bold text-purple-600">{languages.en.percentage}%</div>
              <div className="text-sm">Engelsk (en)</div>
              <div className="text-xs text-muted-foreground mt-1">{languages.en.count.toLocaleString()} brukere</div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Språkfordeling</h4>
            <div className="w-full bg-muted rounded-full h-4 relative">
              <div 
                className="bg-blue-600 h-4 rounded-full absolute top-0 left-0" 
                style={{ width: `${languages.nb.percentage}%` }}
              ></div>
              <div 
                className="bg-green-600 h-4 rounded-full absolute top-0" 
                style={{ 
                  width: `${languages.nn.percentage}%`,
                  left: `${languages.nb.percentage}%`
                }}
              ></div>
              <div 
                className="bg-purple-600 h-4 rounded-full absolute top-0 right-0" 
                style={{ 
                  width: `${languages.en.percentage}%`,
                  left: `${languages.nb.percentage + languages.nn.percentage}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>nb: {languages.nb.percentage}%</span>
              <span>nn: {languages.nn.percentage}%</span>
              <span>en: {languages.en.percentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguagePanel;