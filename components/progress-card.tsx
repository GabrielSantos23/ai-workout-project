import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  subtitle: string;
  progress: number;
  variant: "primary" | "secondary";
}

export function ProgressCard({
  title,
  subtitle,
  progress,
  variant = "primary",
}: ProgressCardProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              className="stroke-muted stroke-2"
              cx="50"
              cy="50"
              r="40"
              fill="none"
            />
            <circle
              className={`stroke-2 ${
                variant === "primary" ? "stroke-primary" : "stroke-purple-500"
              }`}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeDasharray={`${progress * 2.51} 251`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold">{progress}%</span>
          </div>
        </div>
        <button className="ml-auto text-sm text-primary hover:underline">
          Continue the exercise
        </button>
      </div>
    </Card>
  );
}
