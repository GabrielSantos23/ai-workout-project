"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Calendar, Clock, Flame } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Workout {
  id: string;
  date: string;
  type: string;
  duration: string;
  calories: number;
  exercises: string[];
}

const sampleWorkouts: Workout[] = [
  {
    id: "1",
    date: "2023-05-15",
    type: "Upper Body",
    duration: "45 min",
    calories: 300,
    exercises: ["Bench Press", "Pull-ups", "Shoulder Press"],
  },
  {
    id: "2",
    date: "2023-05-13",
    type: "Lower Body",
    duration: "60 min",
    calories: 400,
    exercises: ["Squats", "Deadlifts", "Lunges"],
  },
  {
    id: "3",
    date: "2023-05-10",
    type: "Cardio",
    duration: "30 min",
    calories: 250,
    exercises: ["Running", "Jump Rope"],
  },
];

export function WorkoutHistoryList() {
  const [filter, setFilter] = useState("all");

  const filteredWorkouts = sampleWorkouts.filter(
    (workout) => filter === "all" || workout.type.toLowerCase().includes(filter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Workout History</h2>
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter workouts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Workouts</SelectItem>
            <SelectItem value="upper">Upper Body</SelectItem>
            <SelectItem value="lower">Lower Body</SelectItem>
            <SelectItem value="cardio">Cardio</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{workout.type}</span>
                <Badge>{workout.date}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{workout.duration}</span>
                </div>
                <div className="flex items-center">
                  <Flame className="mr-2 h-4 w-4" />
                  <span>{workout.calories} calories</span>
                </div>
                <div className="flex items-center">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  <span>{workout.exercises.join(", ")}</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
