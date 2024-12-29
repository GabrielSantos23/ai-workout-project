import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ActivityCard } from "@/components/activity-card";
import { WeeklyChart } from "@/components/weekly-chart";
import { FoodChart } from "@/components/food-chart";
import { ScheduledItem } from "@/components/scheduled-item";
import { WebinarCard } from "@/components/webinar-card";
import { PremiumCard } from "@/components/premium-card";

export default function ProgressTracker() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome Johnson 👋</h1>
            <p className="text-muted-foreground">
              Here is your fitness summary
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ActivityCard
            type="weight"
            title="Weight Training"
            subtitle="5 Sets 10 Reps"
          />
          <ActivityCard
            type="dumbbell"
            title="Dumbble Workout"
            subtitle="6 Sets 10 Reps"
          />
          <ActivityCard
            type="cardio"
            title="Heavy Bag Hit"
            subtitle="30 Minute"
          />
          <ActivityCard
            type="nutrition"
            title="1780 Kcal"
            subtitle="6 Meals a Day"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <WeeklyChart />
          <FoodChart />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Scheduled</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <ScheduledItem
              type="WORKOUT"
              title="Body Workout"
              subtitle="7 Apr"
            />
            <ScheduledItem
              type="CARDIO"
              title="Running Challenge"
              subtitle="100 Days"
            />
            <ScheduledItem
              type="FOOD"
              title="High Protein Diet"
              subtitle="130 Cal"
            />
          </div>
        </div>
      </div>

      <div className="hidden w-80 space-y-4 lg:block">
        <WebinarCard
          trainer={{
            name: "Jonathan Jones",
            role: "Fitness Model",
            image: "/placeholder.svg",
          }}
          title="Stay Healthy and Fit, Gain More Confidence"
          participants={[
            { name: "User 1", image: "/placeholder.svg" },
            { name: "User 2", image: "/placeholder.svg" },
            { name: "User 3", image: "/placeholder.svg" },
          ]}
          duration="2 Hours"
          date="17 April 2022"
          time="2:00 - 3:00 PM"
        />
        <PremiumCard />
      </div>
    </div>
  );
}
