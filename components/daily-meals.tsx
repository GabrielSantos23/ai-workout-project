import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditMealModal } from "@/components/edit-meal-modal";

interface Meal {
  id: string;
  type: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DailyMealsProps {
  date: Date;
  meals: Meal[];
  onEditMeal: (meal: Meal) => void;
}

export function DailyMeals({ date, meals, onEditMeal }: DailyMealsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  const handleEditClick = (meal: Meal) => {
    setEditingMeal(meal);
    setIsEditModalOpen(true);
  };

  const handleUpdateMeal = (id: string, updatedMeal: Meal) => {
    onEditMeal(updatedMeal);
    setIsEditModalOpen(false);
    setEditingMeal(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meals for {date.toLocaleDateString()}</CardTitle>
      </CardHeader>
      <CardContent>
        {meals.length === 0 ? (
          <p>No meals logged for this day.</p>
        ) : (
          <ul className="space-y-4">
            {meals.map((meal) => (
              <li key={meal.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{meal.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {meal.calories} cal | P: {meal.protein}g | C: {meal.carbs}g
                    | F: {meal.fat}g
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(meal)}
                >
                  Edit
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <EditMealModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        meal={editingMeal}
        onUpdateMeal={handleUpdateMeal}
      />
    </Card>
  );
}
