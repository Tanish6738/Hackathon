
import React, { useState } from "react";
import FoundPersonForm from "./FoundPersonForm";
import FoundPersonResultDisplay from "./FoundPersonResultDisplay";
import { useToast } from "../ui/use-toast";
import { Card } from "../ui/card";

interface UploadFoundPersonProps {
  userId: string;
}

const UploadFoundPerson: React.FC<UploadFoundPersonProps> = ({ userId }) => {
  const { toast } = useToast();
  const [response, setResponse] = useState<any>(null);

  const resetForm = () => {
    setResponse(null);
  };

  const handleSubmitSuccess = (data: any) => {
    console.log("Submission successful:", data);
    setResponse(data);
    
    toast({
      title: "Success",
      description: data.message || "Found person report submitted successfully",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Upload Found Person Report</h2>
      {response ? (
        <FoundPersonResultDisplay response={response} onReportAnother={resetForm} />
      ) : (
        <FoundPersonForm userId={userId} onSubmitSuccess={handleSubmitSuccess} />
      )}
    </Card>
  );
};

export default UploadFoundPerson;
