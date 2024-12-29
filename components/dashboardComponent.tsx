"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  totalCalories: number;
}

export function DashboardComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Dia atual como valor inicial

  const meals = [
    { date: new Date(), calories: 500 },
    { date: new Date(), calories: 1200 },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      calories: 800,
    },
  ];

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
    const nextMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    if (nextMonthDate > new Date()) {
      return;
    }
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
    if (calories === 0) return "bg-transparent";
    if (calories < 1000) return "bg-green-500";
    if (calories < 2000) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center justify-center px-4">
      <Card className="p-4 text-white w-full max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-white border"
              onClick={prevMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-white border"
              onClick={nextMonth}
              disabled={
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                ) > new Date()
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs sm:text-sm md:text-base">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div
              key={`header-${day}-${index}`}
              className="text-sm font-medium text-gray-400"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => (
            <div
              key={`day-${day.date.toISOString()}-${index}`}
              className={cn(
                "relative border rounded-lg p-2 text-left hover:cursor-pointer",
                !day.isCurrentMonth && "text-gray-500 opacity-50",
                selectedDate?.toDateString() === day.date.toDateString() &&
                  "bg-white text-black border-black",
                "h-10 sm:h-16 md:h-20 lg:h-32 w-10 sm:w-16 md:w-20 lg:w-32 " // Responsividade ajustada
              )}
              onClick={() => {
                setSelectedDate(day.date); // Atualiza o estado do dia selecionado
              }}
            >
              <span className="absolute top-1 left-1 text-xs sm:text-sm font-bold">
                {day.date.getDate()}
              </span>
              <span
                className={cn(
                  "absolute bottom-2 left-2 md:h-3 md:w-3 w-2 h-2 rounded-full",
                  getCalorieColor(day.totalCalories)
                )}
              ></span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
