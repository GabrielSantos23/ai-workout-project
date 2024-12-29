"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  totalCalories: number;
}

export interface NutritionCalendarProps {
  meals: Array<{ date: Date; calories: number }>;
  onSelectDate: (date: Date) => void;
}

export function NutritionCalendar({
  meals,
  onSelectDate,
}: NutritionCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Dia atual como valor inicial

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const calendarDays: CalendarDay[] = [];

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
        totalCalories: 0,
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const totalCalories = meals
        .filter((meal) => meal.date.toDateString() === date.toDateString())
        .reduce((sum, meal) => sum + meal.calories, 0);
      calendarDays.push({
        date,
        isCurrentMonth: true,
        totalCalories,
      });
    }

    // Next month's days
    const remainingDays = 35 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        totalCalories: 0,
      });
    }

    return calendarDays;
  };

  const calendarDays = getCalendarDays();

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getCalorieColor = (calories: number) => {
    if (calories === 0) return "bg-background";
    if (calories < 1000) return "bg-green-100 text-black";
    if (calories < 2000) return "bg-yellow-100 text-black";
    return "bg-red-100 text-black";
  };

  return (
    <Card className="p-2 w-64">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold">
          {currentDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </h2>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={prevMonth}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={nextMonth}
            disabled={
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1
              ) > new Date()
            }
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div
            key={`header-${day}-${index}`}
            className="text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <Button
            key={`day-${day.date.toISOString()}-${index}`}
            variant="ghost"
            className={cn(
              "h-6 w-6 p-0 text-xs font-normal",
              !day.isCurrentMonth && "text-muted-foreground opacity-50",
              day.isCurrentMonth && getCalorieColor(day.totalCalories),
              selectedDate?.toDateString() === day.date.toDateString() &&
                "bg-accent text-accent-foreground"
            )}
            onClick={() => {
              setSelectedDate(day.date); // Atualiza o estado do dia selecionado
              onSelectDate(day.date);
            }}
          >
            {day.date.getDate()}
          </Button>
        ))}
      </div>
    </Card>
  );
}
