"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface WorkoutGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkoutGenerationModal({
  isOpen,
  onClose,
}: WorkoutGenerationModalProps) {
  const [bodyPart, setBodyPart] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [injury, setInjury] = useState(false);

  const handleGenerateWorkout = async () => {
    // Implement workout generation logic here
    console.log("Generating workout:", {
      bodyPart,
      age,
      goal,
      availableTime,
      fitnessLevel,
      injury,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Workout</DialogTitle>
          <DialogDescription>
            Fill in the details below to generate a personalized workout plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bodyPart" className="text-right">
              Body Part
            </Label>
            <Select onValueChange={setBodyPart}>
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
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal
            </Label>
            <Select onValueChange={setGoal}>
              <SelectTrigger id="goal" className="col-span-3">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
                <SelectItem value="weightLoss">Weight Loss</SelectItem>
                <SelectItem value="muscleGain">Muscle Gain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="availableTime" className="text-right">
              Time (min)
            </Label>
            <Input
              id="availableTime"
              type="number"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fitnessLevel" className="text-right">
              Fitness Level
            </Label>
            <Select onValueChange={setFitnessLevel}>
              <SelectTrigger id="fitnessLevel" className="col-span-3">
                <SelectValue placeholder="Select fitness level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="injury" className="text-right">
              Injury
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="injury"
                checked={injury}
                onCheckedChange={setInjury}
              />
              <Label htmlFor="injury">I have an injury</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleGenerateWorkout}>
            Generate Workout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
