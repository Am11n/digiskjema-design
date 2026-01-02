import { FormFill as FormFillComponent } from './components/FormFill';

// Sample data directly in the component
const sampleData = {
  form: {
    id: "skjema-001",
    title: "Søknad om barnehageplass",
    description: "Søk om plass i barnehage for barn mellom 1-6 år"
  },
  submission: {
    id: "inn-001",
    progress: 65,
    formData: {
      fullName: "Kari Nordmann",
      email: "kari.nordmann@example.com",
      phone: "+47 12345678",
      description: "Søker om barnehageplass for mitt barn",
      additionalInfo: "Barn har allergi på nøtter"
    },
    attachments: ["vedlegg1.pdf", "vedlegg2.pdf"]
  },
  user: {
    id: "user-001",
    name: "Kari Nordmann"
  }
};

export function FormFill() {
  const { form, submission, user } = sampleData;

  const handleSaveDraft = (formData: Record<string, unknown>) => {
    console.log('Saving draft:', formData);
  };

  const handleSubmit = (formData: Record<string, unknown>, attachments?: any[]) => {
    console.log('Submitting form:', formData, 'with attachments:', attachments);
  };

  const handleValidate = (formData: Record<string, unknown>) => {
    console.log('Validating form:', formData);
    // Simple validation example
    const errors: Record<string, string> = {};
    if (!formData.fullName || String(formData.fullName).trim() === '') {
      errors.fullName = 'Fullt navn er påkrevd';
    }
    if (!formData.email || String(formData.email).trim() === '') {
      errors.email = 'E-postadresse er påkrevd';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <FormFillComponent
        form={form}
        submission={submission}
        onSaveDraft={handleSaveDraft}
        onSubmit={handleSubmit}
        onValidate={handleValidate}
        currentUser={user}
      />
    </div>
  );
}

export default FormFill;