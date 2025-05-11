import React, { useState, useEffect, useCallback } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { reportFoundPerson } from "../../services/api";
import { useUser } from "@clerk/clerk-react";
import Cropper from 'react-easy-crop';

// Define types for image cropping
interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CroppedImageResult {
  file: File;
  url: string;
}

interface ImageCropperProps {
  imageSource: string;
  onCancel: () => void;
  onCropComplete: (result: CroppedImageResult) => void;
}

// Separate component for image cropping to isolate the logic
const ImageCropper: React.FC<ImageCropperProps> = ({ 
  imageSource,
  onCancel,
  onCropComplete: onCropDone
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  // Handler for crop change
  const handleCropChange = useCallback((newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  }, []);

  // Handler for zoom change
  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  // Handler for crop complete
  const handleCropComplete = useCallback((croppedArea: Area, croppedAreaPixelsParam: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsParam);
  }, []);
  // Crop and save the image  
  const handleCropSave = useCallback(async () => {
    if (!croppedAreaPixels) return;
    
    try {
      // Get cropped image
      const croppedImage = await getCroppedImg(imageSource, croppedAreaPixels);
      onCropDone(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  }, [imageSource, croppedAreaPixels, onCropDone]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Crop Image</h3>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCancel}
          >
            <X size={18} />
          </Button>
        </div>
        
        <div className="relative w-full h-72 bg-gray-900 mb-4">
          <Cropper
            image={imageSource}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={handleCropChange}
            onZoomChange={handleZoomChange}
            onCropComplete={handleCropComplete}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleCropSave}>Crop & Save</Button>
        </div>
      </div>
    </div>
  );
};

// Utility function to crop the image
const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<CroppedImageResult> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    
    image.onload = () => {      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Set canvas dimensions to match the cropped area
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      
      // Draw the cropped image onto the canvas
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      
      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          
          // Create a new file from the blob
          const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
          const url = URL.createObjectURL(blob);
          
          resolve({ file, url });
        },
        'image/jpeg',
        0.95
      );
    };
    
    image.onerror = (error) => {
      reject(error);
    };
  });
};

interface FoundPersonFormProps {
  userId: string;
  onSubmitSuccess: (data: any) => void;
}

const FoundPersonForm: React.FC<FoundPersonFormProps> = ({ userId, onSubmitSuccess }) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    where_found: "",
    your_name: "",
    organization: "",
    designation: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setRawImage(ev.target?.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const handleCancelCrop = useCallback(() => {
    setShowCropper(false);
    setRawImage(null);
  }, []);
  const handleCropComplete = useCallback((result: CroppedImageResult) => {
    setFile(result.file);
    setPreviewUrl(result.url);
    setShowCropper(false);
    setRawImage(null);
  }, []);

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
      
      console.log("Starting found person report submission");
      // Use the API service function instead of direct fetch
      const data = await reportFoundPerson({
        name: formData.name,
        gender: formData.gender,
        age: parseInt(formData.age || "0"),
        where_found: formData.where_found,
        your_name: formData.your_name,
        organization: formData.organization,
        designation: formData.designation,
        user_id: userId,
        mobile_no: formData.mobile_no,
        email_id: formData.email_id,
        file: file
      });
      
      console.log("Found person report submitted successfully:", data);
      // Call the success handler with the response data
      onSubmitSuccess(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit found person report",
        variant: "destructive",
      });
      console.error("Error submitting found person report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Person Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name of found person (if known)"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Age (Approx)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Approximate age"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
                min="1"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Where Found</label>
              <input
                type="text"
                name="where_found"
                value={formData.where_found}
                onChange={handleInputChange}
                placeholder="Location where person was found"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
          </div>
        </Card>
        
        {/* Reporter Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Reporter Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                name="your_name"
                value={formData.your_name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Your organization"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Your designation"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <input
                type="text"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleInputChange}
                placeholder="Your contact number"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email_id"
                value={formData.email_id}
                onChange={handleInputChange}
                placeholder="Your email address"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Photo Upload */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Upload Photo</h3>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
            {previewUrl ? (
              <div className="relative mb-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-64 rounded-md" 
                />
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setPreviewUrl(null);
                    setFile(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="text-center mb-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">Drag and drop an image or click to upload</p>
              </div>
            )}
            <input
              id="file-upload"
              name="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            <label htmlFor="file-upload">
              <Button 
                type="button" 
                variant="outline" 
                className="mt-2"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {previewUrl ? 'Change Photo' : 'Select Photo'}
              </Button>
            </label>
          </div>
        </div>
      </Card>

      {showCropper && rawImage && (
        <ImageCropper
          imageSource={rawImage}
          onCancel={handleCancelCrop}
          onCropComplete={handleCropComplete}
        />
      )}

      <Button type="submit" className="w-full" disabled={loading || !file}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" /> Submit Found Person Report
          </>
        )}
      </Button>
    </form>
  );
};

export default FoundPersonForm;
