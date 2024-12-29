"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkoutDetailsPreviewProps {
  bodyPart: string;
  duration: string;
  exercises: string;
  calories: string;
  intensity: string;
}

interface WorkoutDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: WorkoutDetailsPreviewProps) => void;
}

export function WorkoutDetailsModal({
  isOpen,
  onClose,
  onSubmit,
}: WorkoutDetailsModalProps) {
  const [workoutDetails, setWorkoutDetails] = useState({
    bodyPart: "",
    duration: "",
    exercises: "",
    calories: "",
    intensity: "",
  });

  const handleChange = (field: string, value: string) => {
    setWorkoutDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(workoutDetails);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Workout Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bodyPart" className="text-right">
              Body Part
            </Label>
            <Select onValueChange={(value) => handleChange("bodyPart", value)}>
              <SelectTrigger id="bodyPart" className="col-span-3">
                <SelectValue placeholder="Select body part" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chest">Chest</SelectItem>
                <SelectItem value="back">Back</SelectItem>
                <SelectItem value="legs">Legs</SelectItem>
                <SelectItem value="shoulders">Shoulders</SelectItem>
                <SelectItem value="arms">Arms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              placeholder="e.g., 1h 30m"
              className="col-span-3"
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="exercises" className="text-right">
              Exercises
            </Label>
            <Input
              id="exercises"
              type="number"
              placeholder="Number of exercises"
              className="col-span-3"
              onChange={(e) => handleChange("exercises", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="calories" className="text-right">
              Calories
            </Label>
            <Input
              id="calories"
              type="number"
              placeholder="Calories burned"
              className="col-span-3"
              onChange={(e) => handleChange("calories", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="intensity" className="text-right">
              Intensity
            </Label>
            <Select onValueChange={(value) => handleChange("intensity", value)}>
              <SelectTrigger id="intensity" className="col-span-3">
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Workout Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
