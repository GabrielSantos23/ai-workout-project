import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionSummaryProps {
  meals: Array<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export function NutritionSummary({
  meals,
  calories,
  protein,
  carbs,
  fat,
  calorieGoal,
  proteinGoal,
  carbsGoal,
  fatGoal,
}: NutritionSummaryProps) {
  return (
    <div className="space-y-4 ">
      <div>
        <div className="flex justify-between mb-1">
          <span>Calories</span>
          <span>
            {calories} / {calorieGoal}
          </span>
        </div>
        <Progress value={(calories / calorieGoal) * 100} />
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span>Protein</span>
          <span>
            {protein}g / {proteinGoal}g
          </span>
        </div>
        <Progress
          value={(protein / proteinGoal) * 100}
          className="bg-blue-200"
        />
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span>Carbs</span>
          <span>
            {carbs}g / {carbsGoal}g
          </span>
        </div>
        <Progress value={(carbs / carbsGoal) * 100} className="bg-green-200" />
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span>Fat</span>
          <span>
            {fat}g / {fatGoal}g
          </span>
        </div>
        <Progress value={(fat / fatGoal) * 100} className="bg-yellow-200" />
      </div>
    </div>
  );
}
