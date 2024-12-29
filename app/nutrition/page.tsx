"use client";

import { useState, useEffect } from "react";
import { MealLogger } from "@/components/meal-logger";
import { NutritionSummary } from "@/components/nutrition-summary";
import { NutritionCalendar } from "@/components/nutrition-calendar";
import { DailyMeals } from "@/components/daily-meals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUserGoal } from "@/contexts/UserGoalContext";

interface Meal {
  id: string;
  date: Date;
  type: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface AIInsights {
  analysis: string;
  recommendations: string[];
  suggestedMeal: string;
}

export default function NutritionPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mealSuggestion, setMealSuggestion] = useState<string | null>(null);
  const { userGoal } = useUserGoal();

  const handleAddMeal = (meal: Omit<Meal, "id" | "date">) => {
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString(),
      date: selectedDate,
    };
    setMeals([...meals, newMeal]);
  };

  const handleUpdateMeal = (updatedMeal: Meal) => {
    setMeals(
      meals.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))
    );
  };

  const selectedDateMeals = meals.filter(
    (meal) => meal.date.toDateString() === selectedDate.toDateString()
  );

  const totalNutrition = selectedDateMeals.reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  // These goals should ideally come from user settings
  const nutritionGoals = {
    calorieGoal: 2000,
    proteinGoal: 150,
    carbsGoal: 250,
    fatGoal: 65,
  };

  const fetchAIInsights = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/nutrition-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meals: selectedDateMeals,
          nutritionGoals,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setAiInsights(data);
    } catch (error) {
      console.error("Error fetching AI insights:", error);
      setAiInsights(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMealSuggestion = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/meal-suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nutritionGoals, userGoal }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMealSuggestion(data.suggestedMeal);
    } catch (error) {
      console.error("Error fetching meal suggestion:", error);
      setMealSuggestion(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDateMeals.length > 0) {
      fetchAIInsights();
    } else {
      setAiInsights(null);
    }
  }, [selectedDate, meals]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const mealsForSelectedDate = meals.filter(
      (meal) => meal.date.toDateString() === date.toDateString()
    );
    if (mealsForSelectedDate.length > 0) {
      fetchAIInsights();
    } else {
      setAiInsights(null);
      setMealSuggestion(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nutrition Tracking</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Add Meal</CardTitle>
            </CardHeader>
            <CardContent>
              <MealLogger onAddMeal={handleAddMeal} />
            </CardContent>
          </Card>
          <DailyMeals
            date={selectedDate}
            meals={selectedDateMeals}
            onEditMeal={handleUpdateMeal}
          />
          <Card>
            <CardHeader>
              <CardTitle>AI Nutrition Insights</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Analyzing your nutrition...</span>
                </div>
              ) : aiInsights ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Analysis:</h3>
                    <p>{aiInsights.analysis}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Recommendations:</h3>
                    <ul className="list-disc pl-5">
                      {aiInsights.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Suggested Meal:</h3>
                    <p>{aiInsights.suggestedMeal}</p>
                  </div>
                </div>
              ) : mealSuggestion ? (
                <div>
                  <h3 className="font-semibold mb-2">Meal Suggestion:</h3>
                  <p>{mealSuggestion}</p>
                </div>
              ) : (
                <p>
                  {selectedDateMeals.length > 0
                    ? 'Click "Refresh Insights" to get AI analysis.'
                    : 'No meals logged for this day. Click "Get Meal Suggestion" for a recommendation.'}
                </p>
              )}
              <Button
                onClick={
                  selectedDateMeals.length > 0
                    ? fetchAIInsights
                    : fetchMealSuggestion
                }
                disabled={isLoading}
                className="mt-4"
              >
                {selectedDateMeals.length > 0
                  ? "Refresh Insights"
                  : "Get Meal Suggestion"}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <NutritionCalendar meals={meals} onSelectDate={handleDateSelect} />
          <Card className="w-64">
            <CardHeader>
              <CardTitle>Daily Nutrition Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <NutritionSummary
                meals={selectedDateMeals}
                calories={totalNutrition.calories}
                protein={totalNutrition.protein}
                carbs={totalNutrition.carbs}
                fat={totalNutrition.fat}
                {...nutritionGoals}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
