"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateGroupWorkoutModal } from "@/components/create-group-workout-modal";

interface GroupWorkout {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  maxParticipants: number;
}

const sampleGroupWorkouts: GroupWorkout[] = [
  {
    id: "1",
    title: "High-Intensity Interval Training",
    instructor: "John Doe",
    date: "2023-06-15",
    time: "18:00",
    duration: "45 minutes",
    participants: 8,
    maxParticipants: 12,
  },
  {
    id: "2",
    title: "Yoga for Beginners",
    instructor: "Jane Smith",
    date: "2023-06-16",
    time: "10:00",
    duration: "60 minutes",
    participants: 5,
    maxParticipants: 15,
  },
  {
    id: "3",
    title: "Strength Training Basics",
    instructor: "Mike Johnson",
    date: "2023-06-17",
    time: "19:30",
    duration: "50 minutes",
    participants: 10,
    maxParticipants: 10,
  },
];

export default function GroupWorkoutsPage() {
  const [groupWorkouts, setGroupWorkouts] = useState(sampleGroupWorkouts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredWorkouts = groupWorkouts.filter(
    (workout) =>
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const joinWorkout = (id: string) => {
    setGroupWorkouts(
      groupWorkouts.map((workout) =>
        workout.id === id && workout.participants < workout.maxParticipants
          ? { ...workout, participants: workout.participants + 1 }
          : workout
      )
    );
  };

  const addGroupWorkout = (newWorkout: GroupWorkout) => {
    setGroupWorkouts([
      ...groupWorkouts,
      { ...newWorkout, id: Date.now().toString() },
    ]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Group Workouts</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Group Workout
        </Button>
      </div>
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="my-workouts">My Workouts</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Group Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by title or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                {filteredWorkouts.map((workout) => (
                  <Card key={workout.id}>
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <h3 className="font-semibold">{workout.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Instructor: {workout.instructor}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {workout.date} at {workout.time} ({workout.duration})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Participants: {workout.participants}/
                          {workout.maxParticipants}
                        </p>
                      </div>
                      <Button
                        onClick={() => joinWorkout(workout.id)}
                        disabled={
                          workout.participants >= workout.maxParticipants
                        }
                      >
                        {workout.participants >= workout.maxParticipants
                          ? "Full"
                          : "Join"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-workouts">
          <Card>
            <CardHeader>
              <CardTitle>My Group Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You haven't joined any group workouts yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <CreateGroupWorkoutModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={addGroupWorkout}
      />
    </div>
  );
}
