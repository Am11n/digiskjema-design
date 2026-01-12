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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xl, 1.5rem)' }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-m, 0.75rem)' }}>
        <div style={{
          margin: '0 auto',
          width: '4rem',
          height: '4rem',
          backgroundColor: 'var(--fds-green-60, #068400)',
          borderRadius: 'var(--fds-border-radius-full, 9999px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.1
        }}>
          <CheckCircle style={{ width: '2rem', height: '2rem', color: 'var(--fds-green-60, #068400)', position: 'absolute' }} />
        </div>
        
        <div>
          <h1 style={{
            fontSize: 'var(--fds-font-size-2xl, 1.5rem)',
            fontWeight: 'var(--fds-font-weight-bold, 700)',
            color: 'var(--fds-text-default, #1f2021)',
            fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
          }}>
            Skjema sendt inn
          </h1>
          <p style={{
            color: 'var(--fds-text-subtle, #717274)',
            marginTop: 'var(--fds-spacing-xs, 0.5rem)',
            fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
          }}>
            Takk for din innsending. Vi har mottatt skjemaet ditt.
          </p>
        </div>
      </div>

      <Card style={{ borderColor: 'var(--fds-gray-200, #dbdbdc)', maxWidth: '42rem', margin: '0 auto' }}>
        <CardHeader>
          <CardTitle style={{
            fontSize: 'var(--fds-font-size-lg, 1.125rem)',
            color: 'var(--fds-text-default, #1f2021)'
          }}>
            Innsendingsdetaljer
          </CardTitle>
        </CardHeader>
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xl, 1.5rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--fds-spacing-xl, 1.5rem)' }}>
            <div>
              <h3 style={{
                fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                fontWeight: 'var(--fds-font-weight-medium, 500)',
                color: 'var(--fds-text-subtle, #717274)',
                marginBottom: 'var(--fds-spacing-xs, 0.5rem)',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>Referansenummer</h3>
              <p style={{
                fontFamily: 'monospace',
                color: 'var(--fds-text-default, #1f2021)',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>
                {submission.referenceNumber}
              </p>
            </div>
            
            <div>
              <h3 style={{
                fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                fontWeight: 'var(--fds-font-weight-medium, 500)',
                color: 'var(--fds-text-subtle, #717274)',
                marginBottom: 'var(--fds-spacing-xs, 0.5rem)',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>Innsendt</h3>
              <p style={{
                color: 'var(--fds-text-default, #1f2021)',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>
                {new Date(submission.submittedAt).toLocaleString('nb-NO')}
              </p>
            </div>
            
            <div>
              <h3 style={{
                fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                fontWeight: 'var(--fds-font-weight-medium, 500)',
                color: 'var(--fds-text-subtle, #717274)',
                marginBottom: 'var(--fds-spacing-xs, 0.5rem)',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>Status</h3>
              <Badge 
                variant={submission.status === 'submitted' ? 'default' : 'secondary'}
                style={{ textTransform: 'capitalize' }}
              >
                {submission.status}
              </Badge>
            </div>
          </div>

          <Separator />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-m, 0.75rem)' }}>
            <h3 style={{
              fontSize: 'var(--fds-font-size-sm, 0.875rem)',
              fontWeight: 'var(--fds-font-weight-medium, 500)',
              color: 'var(--fds-text-subtle, #717274)',
              fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
            }}>Oppsummering</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-s, 0.5rem)' }}>
              {Object.entries(submission.formData).map(([key, value]) => (
                <div key={key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 'var(--fds-spacing-xs, 0.5rem) 0',
                  borderBottom: '1px solid var(--fds-gray-200, #dbdbdc)'
                }}>
                  <span style={{
                    color: 'var(--fds-text-subtle, #717274)',
                    textTransform: 'capitalize',
                    fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                  }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span style={{
                    color: 'var(--fds-text-default, #1f2021)',
                    fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
                  }}>
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-s, 0.5rem)', paddingTop: 'var(--fds-spacing-m, 0.75rem)' }} className="sm:flex-row">
            <Button 
              onClick={() => onDownloadPdf(submission.id)}
              variant="outline"
              style={{ flex: 1 }}
            >
              <Download style={{ width: '1rem', height: '1rem', marginRight: 'var(--fds-spacing-xs, 0.5rem)' }} />
              Last ned kvittering
            </Button>
            
            <Button 
              onClick={onBackToList}
              style={{ flex: 1 }}
            >
              <ArrowLeft style={{ width: '1rem', height: '1rem', marginRight: 'var(--fds-spacing-xs, 0.5rem)' }} />
              Tilbake til oversikt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}