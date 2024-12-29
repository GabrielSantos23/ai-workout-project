import { Card } from "@/components/ui/card";
import { Scale, Dumbbell, Bike, Utensils } from "lucide-react";

interface ActivityCardProps {
  type: "weight" | "dumbbell" | "cardio" | "nutrition";
  title: string;
  subtitle: string;
  className?: string;
}

export function ActivityCard({
  type,
  title,
  subtitle,
  className,
}: ActivityCardProps) {
  const icons = {
    weight: Scale,
    dumbbell: Dumbbell,
    cardio: Bike,
    nutrition: Utensils,
  };

  const colors = {
    weight: "bg-purple-500/10 text-purple-500",
    dumbbell: "bg-yellow-500/10 text-yellow-500",
    cardio: "bg-red-500/10 text-red-500",
    nutrition: "bg-green-500/10 text-green-500",
  };

  const Icon = icons[type];

  return (
    <Card className={`p-6 ${className}`}>
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${colors[type]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </Card>
  );
}
