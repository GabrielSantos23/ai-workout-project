import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionCardProps {
  icon: React.ReactNode;
  title: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  color: string;
}

export function NutritionCard({
  icon,
  title,
  current,
  target,
  unit,
  progress,
  color,
}: NutritionCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{current}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{target}</p>
          <p className="text-xs text-muted-foreground">{unit}</p>
        </div>
      </div>
      <Progress value={progress} className={`h-2 ${color}`} />
    </Card>
  );
}
