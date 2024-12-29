"use client";

import { Separator } from "@/components/ui/separator";
import { AccountForm } from "@/components/account-form";
import { Button } from "@/components/ui/button";
import { useUserGoal } from "@/contexts/UserGoalContext";

export default function SettingsAccountPage() {
  const { userGoal, setUserGoal } = useUserGoal();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your email and name.
        </p>
      </div>
      <Separator />
      <AccountForm />
      <Separator />
      <div>
        <h3 className="text-lg font-medium mb-4">Fitness Goal</h3>
        <div className="flex space-x-4">
          <Button
            variant={userGoal === "gain_muscle" ? "default" : "outline"}
            onClick={() => setUserGoal("gain_muscle")}
          >
            Gain Muscle
          </Button>
          <Button
            variant={userGoal === "lose_weight" ? "default" : "outline"}
            onClick={() => setUserGoal("lose_weight")}
          >
            Lose Weight
          </Button>
          <Button
            variant={userGoal === "maintain" ? "default" : "outline"}
            onClick={() => setUserGoal("maintain")}
          >
            Maintain
          </Button>
        </div>
      </div>
    </div>
  );
}
