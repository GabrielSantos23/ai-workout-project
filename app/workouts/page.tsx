"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { WorkoutHistoryList } from "@/components/workout-history-list";
import { WorkoutGenerationModal } from "@/components/workout-generation-modal";

export default function WorkoutsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Workouts</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Generate Workout
        </Button>
      </div>
      <WorkoutHistoryList />
      <WorkoutGenerationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
