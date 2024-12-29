"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { WorkoutScheduleForm } from "@/components/workout-schedule-form";
import { ScheduledWorkoutList } from "@/components/scheduled-workout-list";

export default function WorkoutSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);

  const handleAddWorkout = () => {
    setIsAddingWorkout(true);
  };

  const handleCloseForm = () => {
    setIsAddingWorkout(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Workout Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Scheduled Workouts
                <Button onClick={handleAddWorkout} size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Workout
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScheduledWorkoutList date={selectedDate} />
            </CardContent>
          </Card>
          {isAddingWorkout && (
            <WorkoutScheduleForm
              onClose={handleCloseForm}
              date={selectedDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
