import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface DailyGoalProps {
  current: number;
  target: number;
  progress: number;
}

export function DailyGoal({ current, target, progress }: DailyGoalProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Set your Fitness Goals for the quality of your health
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              className="stroke-muted stroke-2"
              cx="50"
              cy="50"
              r="40"
              fill="none"
            />
            <circle
              className="stroke-primary stroke-2"
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeDasharray={`${progress * 2.51} 251`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-bold">Daily Goal</div>
            <div className="text-lg">
              {current}/{target}KCal
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          You have reached {progress}% of your goal this month
        </p>
        <Button variant="link" className="gap-2">
          Set Fitness Goals
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
