import { Receipt as ReceiptComponent } from './components/Receipt';

// Sample data directly in the component
const sampleData = {
  submission: {
    id: "inn-001",
    referenceNumber: "SKJ-2025-001234",
    submittedAt: "2025-12-10T14:30:00.000Z",
    status: "submitted" as const,
    formData: {
      fullName: "Kari Nordmann",
      email: "kari.nordmann@example.com",
      description: "Søker om barnehageplass for mitt barn",
      additionalInfo: "Barn har allergi på nøtter"
    }
  }
};

export function Receipt() {
  const { submission } = sampleData;

  const handleDownloadPdf = (submissionId: string) => {
    console.log('Downloading PDF for submission:', submissionId);
  };

  const handleBackToList = () => {
    console.log('Navigating back to form list');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <ReceiptComponent
        submission={submission}
        onDownloadPdf={handleDownloadPdf}
        onBackToList={handleBackToList}
      />
    </div>
  );
}

export default Receipt;