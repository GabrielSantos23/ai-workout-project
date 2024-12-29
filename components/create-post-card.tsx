"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Image, BarChart2, Smile, MapPin, X } from "lucide-react";
import { WorkoutDetailsModal } from "@/components/workout-details-modal";
import {
  WorkoutDetailsPreview,
  WorkoutDetailsPreviewProps,
} from "@/components/workout-details-preview";

export function CreatePostCard() {
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutDetails, setWorkoutDetails] =
    useState<WorkoutDetailsPreviewProps | null>(null);

  const handlePost = () => {
    console.log("Posting:", { content: postContent, images, workoutDetails });
    setPostContent("");
    setImages([]);
    setWorkoutDetails(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 4 - images.length);
      const imageUrls = newImages.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...imageUrls].slice(0, 4));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="pt-6">
        <div className="flex space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="What's happening in your fitness journey?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded image ${index + 1}`}
                      className="rounded-md object-cover w-full h-32"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {workoutDetails && <WorkoutDetailsPreview {...workoutDetails} />}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <Image
                    className={`${
                      images.length >= 4 ? "opacity-50" : ""
                    } h-5 w-5`}
                  />
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={images.length >= 4}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(true)}
                >
                  <BarChart2 className={` h-5 w-5`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MapPin className="h-5 w-5" />
                </Button>
              </div>
              <Button
                onClick={handlePost}
                disabled={!postContent.trim() && images.length === 0}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <WorkoutDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(details) => {
          setWorkoutDetails(details);
          setIsModalOpen(false);
        }}
      />
    </Card>
  );
}
