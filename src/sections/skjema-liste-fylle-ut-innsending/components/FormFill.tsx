import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, Upload, Save, Send } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface FormFillProps {
  form: {
    id: string;
    title: string;
    description: string;
  };
  submission?: {
    id: string;
    progress: number;
    formData: Record<string, unknown>;
    attachments: string[];
  };
  onSaveDraft: (formData: Record<string, unknown>) => void;
  onSubmit: (formData: Record<string, unknown>, attachments?: any[]) => void;
  onValidate: (formData: Record<string, unknown>) => { isValid: boolean; errors?: Record<string, string> };
  currentUser: {
    id: string | null;
    name: string | null;
  };
}

export function FormFill({ form, submission, onSaveDraft, onSubmit, onValidate, currentUser }: FormFillProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>(submission?.formData || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Simulated form structure
  const formSteps = [
    {
      id: 'step1',
      title: 'Personopplysninger',
      fields: [
        { id: 'fullName', type: 'text', label: 'Fullt navn', required: true },
        { id: 'email', type: 'text', label: 'E-postadresse', required: true },
        { id: 'phone', type: 'text', label: 'Telefonnummer', required: false },
      ] as FormField[]
    },
    {
      id: 'step2',
      title: 'Skjemainnhold',
      fields: [
        { id: 'description', type: 'textarea', label: 'Beskrivelse', required: true },
        { id: 'additionalInfo', type: 'textarea', label: 'Tilleggsinformasjon', required: false },
      ] as FormField[]
    },
    {
      id: 'step3',
      title: 'Oppsummering',
      fields: [] as FormField[]
    }
  ];

  const currentStepData = formSteps[currentStep];

  useEffect(() => {
    if (saveStatus === 'saving') {
      const timer = setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const handleFieldChange = (fieldId: string, value: any) => {
    const newFormData = { ...formData, [fieldId]: value };
    setFormData(newFormData);

    // Simulate autosave
    if (saveStatus === 'idle') {
      setSaveStatus('saving');
      onSaveDraft(newFormData);
    }
  };

  const validateCurrentStep = () => {
    const stepFields = currentStepData.fields;
    const newErrors: Record<string, string> = {};

    stepFields.forEach(field => {
      if (field.required && (!formData[field.id] || String(formData[field.id]).trim() === '')) {
        newErrors[field.id] = `${field.label} er påkrevd`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const validation = onValidate(formData);
    if (validation.isValid) {
      onSubmit(formData, submission?.attachments);
    } else {
      setErrors(validation.errors || {});
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span style={{ color: 'var(--fds-red-60, #d8000c)' }}>*</span>}
            </Label>
            <Input
              id={field.id}
              value={String(value)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              style={errors[field.id] ? { borderColor: 'var(--fds-red-60, #d8000c)' } : {}}
            />
            {errors[field.id] && (
              <p style={{ color: 'var(--fds-red-60, #d8000c)', fontSize: 'var(--fds-font-size-sm, 0.875rem)' }}>{errors[field.id]}</p>
            )}
          </div>
        );
      case 'textarea':
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <textarea
              id={field.id}
              value={String(value)}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              style={{
                width: '100%',
                borderRadius: 'var(--fds-border-radius-md, 0.375rem)',
                border: `1px solid ${errors[field.id] ? 'var(--fds-red-60, #d8000c)' : 'var(--fds-gray-200, #dbdbdc)'}`,
                padding: 'var(--fds-spacing-xs, 0.5rem) var(--fds-spacing-s, 0.5rem)',
                fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
                backgroundColor: 'white',
                color: 'var(--fds-text-default, #1f2021)'
              }}
            />
            {errors[field.id] && (
              <p style={{ color: 'var(--fds-red-60, #d8000c)', fontSize: 'var(--fds-font-size-sm, 0.875rem)' }}>{errors[field.id]}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xl, 1.5rem)' }}>
      {/* Progress indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-m, 0.75rem)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{
            fontSize: 'var(--fds-font-size-xl, 1.25rem)',
            fontWeight: 'var(--fds-font-weight-bold, 700)',
            color: 'var(--fds-text-default, #1f2021)',
            fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
          }}>
            {form.title}
          </h2>
          <Badge variant="outline">
            {currentStep + 1} av {formSteps.length}
          </Badge>
        </div>
        
        {/* Simple progress bar */}
        <div style={{
          width: '100%',
          backgroundColor: 'var(--fds-gray-200, #dbdbdc)',
          borderRadius: 'var(--fds-border-radius-full, 9999px)',
          height: '0.5rem'
        }}>
          <div 
            style={{
              backgroundColor: 'var(--fds-blue-60, #0066cc)',
              height: '0.5rem',
              borderRadius: 'var(--fds-border-radius-full, 9999px)',
              transition: 'width 300ms ease',
              width: `${((currentStep + 1) / formSteps.length) * 100}%`
            }}
          ></div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--fds-spacing-xs, 0.5rem)' }}>
          {formSteps.map((step, index) => (
            <div 
              key={step.id} 
              style={{
                flex: 1,
                height: '0.25rem',
                borderRadius: 'var(--fds-border-radius-full, 9999px)',
                backgroundColor: index <= currentStep 
                  ? 'var(--fds-blue-60, #0066cc)' 
                  : 'var(--fds-gray-200, #dbdbdc)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Validation errors */}
      {Object.keys(errors).length > 0 && (
        <div style={{
          borderRadius: 'var(--fds-border-radius-lg, 0.5rem)',
          border: '1px solid var(--fds-red-100, #fbd3d3)',
          backgroundColor: 'var(--fds-red-100, #fbd3d3)',
          padding: 'var(--fds-spacing-m, 0.75rem)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--fds-spacing-s, 0.5rem)' }}>
            <AlertCircle style={{ width: '1rem', height: '1rem', color: 'var(--fds-red-60, #d8000c)', flexShrink: 0, marginTop: '0.125rem' }} />
            <div>
              <h3 style={{
                fontWeight: 'var(--fds-font-weight-medium, 500)',
                color: 'var(--fds-red-70, #a20009)',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>Vennligst rett følgende feil:</h3>
              <ul style={{ listStyle: 'disc', listStylePosition: 'inside', marginTop: 'var(--fds-spacing-xs, 0.5rem)', display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xxs, 0.25rem)' }}>
                {Object.values(errors).map((error, index) => (
                  <li key={index} style={{ color: 'var(--fds-red-70, #a20009)', fontSize: 'var(--fds-font-size-sm, 0.875rem)' }}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <Card style={{ borderColor: 'var(--fds-gray-200, #dbdbdc)' }}>
        <CardHeader>
          <CardTitle style={{
            fontSize: 'var(--fds-font-size-lg, 1.125rem)',
            color: 'var(--fds-text-default, #1f2021)'
          }}>
            {currentStepData.title}
          </CardTitle>
        </CardHeader>
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xl, 1.5rem)' }}>
          {currentStepData.fields.map(field => (
            <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xs, 0.5rem)' }}>
              {renderField(field)}
            </div>
          ))}

          {/* Attachments section */}
          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-m, 0.75rem)' }}>
              <h3 style={{
                fontWeight: 'var(--fds-font-weight-medium, 500)',
                color: 'var(--fds-text-default, #1f2021)',
                fontFamily: 'var(--fds-font-family, system-ui, sans-serif)'
              }}>Vedlegg</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xs, 0.5rem)' }}>
                {submission?.attachments && submission.attachments.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fds-spacing-xs, 0.5rem)' }}>
                    {submission.attachments.map((attachment, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--fds-spacing-s, 0.5rem)',
                        backgroundColor: 'var(--fds-gray-100, #f7f7f7)',
                        borderRadius: 'var(--fds-border-radius-lg, 0.5rem)'
                      }}>
                        <span style={{
                          fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                          color: 'var(--fds-text-default, #1f2021)'
                        }}>{attachment}</span>
                        <Button variant="ghost" size="sm" style={{ color: 'var(--fds-red-60, #d8000c)' }}>
                          Fjern
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{
                    fontSize: 'var(--fds-font-size-sm, 0.875rem)',
                    color: 'var(--fds-text-subtle, #717274)'
                  }}>Ingen vedlegg lastet opp</p>
                )}
                
                <Button variant="outline" style={{ width: '100%' }}>
                  <Upload style={{ width: '1rem', height: '1rem', marginRight: 'var(--fds-spacing-xs, 0.5rem)' }} />
                  Legg til vedlegg
                </Button>
              </div>
            </div>
          )}

          {/* Autosave indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--fds-spacing-xs, 0.5rem)',
            fontSize: 'var(--fds-font-size-sm, 0.875rem)',
            color: 'var(--fds-text-subtle, #717274)'
          }}>
            {saveStatus === 'saving' && (
              <>
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundColor: 'var(--fds-blue-60, #0066cc)',
                  borderRadius: 'var(--fds-border-radius-full, 9999px)',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}></div>
                Lagrer utkast...
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <CheckCircle style={{ width: '1rem', height: '1rem', color: 'var(--fds-green-60, #068400)' }} />
                Utkast lagret
              </>
            )}
            {saveStatus === 'idle' && 'Utkast lagres automatisk'}
          </div>

          {/* Navigation buttons */}
          <Separator style={{ margin: 'var(--fds-spacing-m, 0.75rem) 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Forrige
            </Button>
            
            <div style={{ display: 'flex', gap: 'var(--fds-spacing-xs, 0.5rem)' }}>
              <Button 
                variant="secondary"
                onClick={() => onSaveDraft(formData)}
              >
                <Save style={{ width: '1rem', height: '1rem', marginRight: 'var(--fds-spacing-xs, 0.5rem)' }} />
                Lagre utkast
              </Button>
              
              <Button 
                onClick={handleNext}
              >
                {currentStep === formSteps.length - 1 ? (
                  <>
                    <Send style={{ width: '1rem', height: '1rem', marginRight: 'var(--fds-spacing-xs, 0.5rem)' }} />
                    Send inn
                  </>
                ) : 'Neste'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}