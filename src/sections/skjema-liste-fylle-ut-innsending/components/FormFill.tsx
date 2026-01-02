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
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              value={String(value)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={errors[field.id] ? 'border-red-500' : ''}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
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
              className={`w-full rounded-md border px-3 py-2 text-sm ${
                errors[field.id] 
                  ? 'border-red-500' 
                  : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800'
              }`}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            {form.title}
          </h2>
          <Badge variant="outline">
            {currentStep + 1} av {formSteps.length}
          </Badge>
        </div>
        
        {/* Simple progress bar */}
        <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
          <div 
            className="bg-stone-900 dark:bg-stone-100 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex gap-2">
          {formSteps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex-1 h-1 rounded-full ${
                index <= currentStep 
                  ? 'bg-stone-900 dark:bg-stone-100' 
                  : 'bg-stone-200 dark:bg-stone-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Validation errors */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-200">Vennligst rett følgende feil:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {Object.values(errors).map((error, index) => (
                  <li key={index} className="text-red-700 dark:text-red-300 text-sm">{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <Card className="border-stone-200 dark:border-stone-700">
        <CardHeader>
          <CardTitle className="text-lg text-stone-900 dark:text-stone-100">
            {currentStepData.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStepData.fields.map(field => (
            <div key={field.id}>
              {renderField(field)}
            </div>
          ))}

          {/* Attachments section */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium text-stone-900 dark:text-stone-100">Vedlegg</h3>
              <div className="space-y-2">
                {submission?.attachments && submission.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {submission.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800 rounded-lg">
                        <span className="text-sm text-stone-700 dark:text-stone-300">{attachment}</span>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          Fjern
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-stone-500 dark:text-stone-400">Ingen vedlegg lastet opp</p>
                )}
                
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Legg til vedlegg
                </Button>
              </div>
            </div>
          )}

          {/* Autosave indicator */}
          <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
            {saveStatus === 'saving' && (
              <>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Lagrer utkast...
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                Utkast lagret
              </>
            )}
            {saveStatus === 'idle' && 'Utkast lagres automatisk'}
          </div>

          {/* Navigation buttons */}
          <Separator className="my-4" />
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Forrige
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="secondary"
                onClick={() => onSaveDraft(formData)}
              >
                <Save className="w-4 h-4 mr-2" />
                Lagre utkast
              </Button>
              
              <Button 
                onClick={handleNext}
              >
                {currentStep === formSteps.length - 1 ? (
                  <>
                    <Send className="w-4 h-4 mr-2" />
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