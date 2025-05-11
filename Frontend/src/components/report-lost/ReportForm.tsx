import React, { useState, useEffect } from "react";
import { Loader2, Upload } from "lucide-react";
import PersonInformationCard from "./PersonInformationCard";
import ContactInformationCard from "./ContactInformationCard";
import PhotoUploadCard from "./PhotoUploadCard";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useUser } from "@clerk/clerk-react";

interface ReportFormProps {
  userId: string;
  onSubmitSuccess: (data: any) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ userId, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    where_lost: "",
    your_name: "",
    relation_with_lost: "",
    mobile_no: "",
    email_id: "",
  });

  // Prefill user details from Clerk
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        your_name: user.fullName || user.username || prevData.your_name,
        email_id: user.primaryEmailAddress?.emailAddress || prevData.email_id,
        mobile_no: user.primaryPhoneNumber?.phoneNumber || prevData.mobile_no
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/upload_lost`, {
        method: "POST",
        body: createFormData(),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lost person report");
      }

      const data = await response.json();
      onSubmitSuccess(data);
      
      toast({
        title: "Success",
        description: data.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit lost person report",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createFormData = () => {
    const formDataToSend = new FormData();
    Object.entries({
      ...formData,
      age: parseInt(formData.age),
      user_id: userId,
    }).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString());
    });

    if (file) {
      formDataToSend.append("file", file);
    }
    
    return formDataToSend;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonInformationCard 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
      
      <ContactInformationCard 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
        <PhotoUploadCard 
        previewUrl={previewUrl} 
        onFileCropped={(file, url) => {
          setFile(file);
          setPreviewUrl(url);
        }}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" /> Report Lost Person
          </>
        )}
      </Button>
    </form>
  );
};

export default ReportForm;
