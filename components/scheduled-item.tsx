import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ScheduledItemProps {
  type: "WORKOUT" | "CARDIO" | "FOOD";
  title: string;
  subtitle: string;
}

export function ScheduledItem({ type, title, subtitle }: ScheduledItemProps) {
  const colors = {
    WORKOUT: "bg-primary/10 text-primary hover:bg-primary/20",
    CARDIO: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    FOOD: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  };

  return (
    <Card className="flex items-center justify-between p-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={colors[type]}>
            {type}
          </Badge>
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </Card>
  );
}
