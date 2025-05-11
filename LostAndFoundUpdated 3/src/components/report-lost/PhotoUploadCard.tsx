import React, { useState, useCallback } from "react";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { X } from "lucide-react";
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

// Utility function to crop the image
const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<CroppedImageResult> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    
    image.onload = () => {
      const canvas = document.createElement('canvas');
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

// Separate component for image cropping to isolate the logic
interface ImageCropperProps {
  imageSource: string;
  onCancel: () => void;
  onCropComplete: (result: CroppedImageResult) => void;
}

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

interface PhotoUploadCardProps {
  previewUrl: string | null;
  onFileCropped: (file: File, url: string) => void;
}

const PhotoUploadCard: React.FC<PhotoUploadCardProps> = ({
  previewUrl,
  onFileCropped,
}) => {
  const [showCropper, setShowCropper] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(previewUrl);

  // Handle file input change
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

  // Cancel cropping
  const handleCancelCrop = useCallback(() => {
    setShowCropper(false);
    setRawImage(null);
  }, []);

  // On crop complete, update preview and notify parent
  const handleCropComplete = useCallback((result: CroppedImageResult) => {
    setLocalPreviewUrl(result.url);
    setShowCropper(false);
    setRawImage(null);
    onFileCropped(result.file, result.url);
  }, [onFileCropped]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo Upload</CardTitle>
        <CardDescription>Upload a clear photo of the lost person</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="file">Select Photo</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          {(localPreviewUrl || previewUrl) && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-md overflow-hidden w-48 h-48">
                <img
                  src={localPreviewUrl || previewUrl || ''}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
        {showCropper && rawImage && (
          <ImageCropper
            imageSource={rawImage}
            onCancel={handleCancelCrop}
            onCropComplete={handleCropComplete}
          />
        )}
      </CardContent>
    </Card>
  );
}; 


export default PhotoUploadCard