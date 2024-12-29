import { Card, CardContent } from "@/components/ui/card";
import { Clock, Dumbbell, Flame, Activity } from "lucide-react";

interface WorkoutDetailsPreviewProps {
  bodyPart: string;
  duration: string;
  exercises: string;
  calories: string;
  intensity: string;
}

export function WorkoutDetailsPreview({
  bodyPart,
  duration,
  exercises,
  calories,
  intensity,
}: WorkoutDetailsPreviewProps) {
  return (
    <Card className="bg-muted">
      <CardContent className="p-4 flex flex-wrap gap-4">
        <div className="flex items-center">
          <Dumbbell className="w-4 h-4 mr-2" />
          <span>{bodyPart}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          <span>{exercises} exercises</span>
        </div>
        <div className="flex items-center">
          <Flame className="w-4 h-4 mr-2" />
          <span>{calories} calories</span>
        </div>
        <div className="flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          <span>{intensity} intensity</span>
        </div>
      </CardContent>
    </Card>
  );
}
