"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera, X } from "lucide-react";

interface ProfilePictureUploadProps {
  currentImage?: string;
  onImageChange: (image: File | null) => void;
}

export function ProfilePictureUpload({
  currentImage,
  onImageChange,
}: ProfilePictureUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage || null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null);
  };

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={previewUrl || undefined} />
        <AvatarFallback>
          {previewUrl ? null : (
            <Camera className="w-8 h-8 text-muted-foreground" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="profile-picture-upload"
        />
        <Label
          htmlFor="profile-picture-upload"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
        >
          Upload new picture
        </Label>
        {previewUrl && (
          <Button variant="outline" size="sm" onClick={handleRemoveImage}>
            <X className="w-4 h-4 mr-2" />
            Remove picture
          </Button>
        )}
      </div>
    </div>
  );
}
