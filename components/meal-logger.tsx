"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface MealLoggerProps {
  onAddMeal: (meal: {
    name: string;
    quantity?: number;
    type: string;
    [key: string]: any;
  }) => void;
}

export function MealLogger({ onAddMeal }: MealLoggerProps) {
  const [customFood, setCustomFood] = useState("");
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [mealType, setMealType] = useState<string>("breakfast");

  const handleAddCustomFood = async () => {
    setIsAddingCustom(true);
    try {
      const response = await fetch("/api/estimate-nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodName: customFood }),
      });
      const estimatedNutrition = await response.json();
      onAddMeal({
        ...estimatedNutrition,
        name: customFood,
        type: mealType,
        id: `custom-${Date.now()}`,
      });
      setCustomFood("");
      setMealType("breakfast");
    } catch (error) {
      console.error("Error estimating nutrition:", error);
    } finally {
      setIsAddingCustom(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="meal-type">Meal Type</Label>
        <Select value={mealType} onValueChange={setMealType}>
          <SelectTrigger id="meal-type">
            <SelectValue placeholder="Select meal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="snack">Snack</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="custom-food">Add Meal</Label>
        <div className="flex space-x-2">
          <Input
            id="custom-food"
            value={customFood}
            onChange={(e) => setCustomFood(e.target.value)}
            placeholder="E.g., Grilled chicken sandwich"
          />
          <Button
            onClick={handleAddCustomFood}
            disabled={!customFood || isAddingCustom}
          >
            {isAddingCustom ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
