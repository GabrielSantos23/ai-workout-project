export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

export const foodDatabase: FoodItem[] = [
  {
    id: "1",
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    servingSize: "100g",
  },
  {
    id: "2",
    name: "Brown Rice",
    calories: 216,
    protein: 4.5,
    carbs: 45,
    fat: 1.6,
    servingSize: "1 cup cooked",
  },
  {
    id: "3",
    name: "Broccoli",
    calories: 55,
    protein: 3.7,
    carbs: 11.2,
    fat: 0.6,
    servingSize: "1 cup chopped",
  },
  {
    id: "4",
    name: "Salmon",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    servingSize: "100g",
  },
  {
    id: "5",
    name: "Sweet Potato",
    calories: 180,
    protein: 2,
    carbs: 41,
    fat: 0.1,
    servingSize: "1 medium",
  },
];
