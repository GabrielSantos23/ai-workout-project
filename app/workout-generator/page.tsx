"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const bodyParts = [
  "Back",
  "Cardio",
  "Chest",
  "Lower Arms",
  "Lower Legs",
  "Neck",
  "Shoulders",
  "Upper Arms",
  "Upper Legs",
  "Waist",
];

const goals = ["Gain Weight", "Define", "Lose Weight"];
const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];

interface WorkoutPlan {
  warmup: string;
  exercises: {
    name: string;
    description: string;
    sets: number;
    reps: string; // Changed to string to handle ranges like "8-12"
    gifUrl: string;
  }[];
}

export default function WorkoutGenerator() {
  const [bodyPart, setBodyPart] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [injury, setInjury] = useState(false); // Changed to boolean for switch
  const [loading, setLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

  const handleGenerateWorkout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bodyPart,
          age: parseInt(age),
          goal,
          availableTime: parseInt(availableTime),
          fitnessLevel,
          injury: injury ? "yes" : "no",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate workout");
      }

      const data = await response.json();
      setWorkoutPlan(data);
    } catch (error) {
      console.error("Error generating workout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Workout Generator</h1>
      <p className="text-gray-600">
        Generate a personalized workout plan tailored to your fitness goals,
        time availability, and preferences. Select the options below to get
        started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bodyPart">Body Part</Label>
          <Select onValueChange={setBodyPart}>
            <SelectTrigger id="bodyPart">
              <SelectValue placeholder="Select a body part" />
            </SelectTrigger>
            <SelectContent>
              {bodyParts.map((part) => (
                <SelectItem key={part} value={part.toLowerCase()}>
                  {part}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />
        </div>
        <div>
          <Label htmlFor="goal">Goal</Label>
          <Select onValueChange={setGoal}>
            <SelectTrigger id="goal">
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              {goals.map((g) => (
                <SelectItem key={g} value={g.toLowerCase()}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="availableTime">Available Time (minutes)</Label>
          <Input
            id="availableTime"
            type="number"
            value={availableTime}
            onChange={(e) => setAvailableTime(e.target.value)}
            placeholder="E.g., 30"
          />
        </div>
        <div>
          <Label htmlFor="fitnessLevel">Fitness Level</Label>
          <Select onValueChange={setFitnessLevel}>
            <SelectTrigger id="fitnessLevel">
              <SelectValue placeholder="Select fitness level" />
            </SelectTrigger>
            <SelectContent>
              {fitnessLevels.map((level) => (
                <SelectItem key={level} value={level.toLowerCase()}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="injury" checked={injury} onCheckedChange={setInjury} />
          <Label htmlFor="injury">Do you have any injuries?</Label>
        </div>
      </div>

      <Button
        onClick={handleGenerateWorkout}
        disabled={
          loading ||
          !bodyPart ||
          !age ||
          !goal ||
          !availableTime ||
          !fitnessLevel
        }
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Workout...
          </>
        ) : (
          "Generate Workout"
        )}
      </Button>

      {workoutPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Workout Plan</CardTitle>
            <CardDescription>
              Based on your inputs and AI recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Warm-up</h3>
              <p>{workoutPlan.warmup}</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Exercises</h3>
              {workoutPlan.exercises.map((exercise, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{exercise.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <p>{exercise.description}</p>
                      <p className="mt-2">
                        <span className="font-semibold">Sets:</span>{" "}
                        {exercise.sets}
                        <span className="font-semibold ml-4">Reps:</span>{" "}
                        {exercise.reps}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Image
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
