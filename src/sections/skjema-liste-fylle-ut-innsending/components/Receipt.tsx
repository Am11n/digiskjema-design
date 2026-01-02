import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';

interface ReceiptProps {
  submission: {
    id: string;
    referenceNumber: string;
    submittedAt: string;
    status: 'draft' | 'submitted' | 'failed';
    formData: Record<string, unknown>;
  };
  onDownloadPdf: (submissionId: string) => void;
  onBackToList: () => void;
}

export function Receipt({ submission, onDownloadPdf, onBackToList }: ReceiptProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            Skjema sendt inn
          </h1>
          <p className="text-stone-600 dark:text-stone-400 mt-2">
            Takk for din innsending. Vi har mottatt skjemaet ditt.
          </p>
        </div>
      </div>

      <Card className="border-stone-200 dark:border-stone-700 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
            Innsendingsdetaljer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-2">Referansenummer</h3>
              <p className="font-mono text-stone-900 dark:text-stone-100">
                {submission.referenceNumber}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-2">Innsendt</h3>
              <p className="text-stone-900 dark:text-stone-100">
                {new Date(submission.submittedAt).toLocaleString('nb-NO')}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-2">Status</h3>
              <Badge 
                variant={submission.status === 'submitted' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {submission.status}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400">Oppsummering</h3>
            <div className="space-y-3">
              {Object.entries(submission.formData).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-stone-100 dark:border-stone-800">
                  <span className="text-stone-600 dark:text-stone-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-stone-900 dark:text-stone-100">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={() => onDownloadPdf(submission.id)}
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Last ned kvittering
            </Button>
            
            <Button 
              onClick={onBackToList}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbake til oversikt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}