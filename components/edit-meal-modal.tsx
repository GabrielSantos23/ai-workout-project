import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: {
    id: string;
    name: string;
    type: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null;
  onUpdateMeal: (id: string, updatedMeal: any) => void;
}

export function EditMealModal({
  isOpen,
  onClose,
  meal,
  onUpdateMeal,
}: EditMealModalProps) {
  const [editedMeal, setEditedMeal] = useState(meal);

  useEffect(() => {
    setEditedMeal(meal);
  }, [meal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedMeal((prev) =>
      prev ? { ...prev, [name]: name === "name" ? value : Number(value) } : null
    );
  };

  const handleTypeChange = (value: string) => {
    setEditedMeal((prev) => (prev ? { ...prev, type: value } : null));
  };

  const handleSubmit = () => {
    if (editedMeal) {
      onUpdateMeal(editedMeal.id, editedMeal);
      onClose();
    }
  };

  if (!editedMeal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Meal</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={editedMeal.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select onValueChange={handleTypeChange} value={editedMeal.type}>
              <SelectTrigger className="col-span-3">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="calories" className="text-right">
              Calories
            </Label>
            <Input
              id="calories"
              name="calories"
              type="number"
              value={editedMeal.calories}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="protein" className="text-right">
              Protein (g)
            </Label>
            <Input
              id="protein"
              name="protein"
              type="number"
              value={editedMeal.protein}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="carbs" className="text-right">
              Carbs (g)
            </Label>
            <Input
              id="carbs"
              name="carbs"
              type="number"
              value={editedMeal.carbs}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fat" className="text-right">
              Fat (g)
            </Label>
            <Input
              id="fat"
              name="fat"
              type="number"
              value={editedMeal.fat}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>Update Meal</Button>
      </DialogContent>
    </Dialog>
  );
}
