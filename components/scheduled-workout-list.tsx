"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ScheduledWorkout {
  id: string;
  title: string;
  type: string;
  date: Date;
  time: string;
  duration: number;
  recurring: boolean;
  frequency?: string;
}

interface ScheduledWorkoutListProps {
  date?: Date;
}

export function ScheduledWorkoutList({ date }: ScheduledWorkoutListProps) {
  const [workouts, setWorkouts] = useState<ScheduledWorkout[]>([]);

  useEffect(() => {
    // In a real application, you would fetch the workouts from your API here
    // For now, we'll use some dummy data
    const dummyWorkouts: ScheduledWorkout[] = [
      {
        id: "1",
        title: "Morning Run",
        type: "cardio",
        date: new Date(),
        time: "07:00",
        duration: 30,
        recurring: true,
        frequency: "daily",
      },
      {
        id: "2",
        title: "Weight Training",
        type: "strength",
        date: new Date(),
        time: "18:00",
        duration: 60,
        recurring: true,
        frequency: "weekly",
      },
    ];
    setWorkouts(dummyWorkouts);
  }, [date]);

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log("Edit workout", id);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log("Delete workout", id);
  };

  return (
    <div className="space-y-4">
      {workouts.length === 0 ? (
        <p>No workouts scheduled for this day.</p>
      ) : (
        workouts.map((workout) => (
          <Card key={workout.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{workout.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {workout.time} - {workout.duration} minutes
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {workout.type}{" "}
                    {workout.recurring && `(${workout.frequency})`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(workout.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(workout.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
