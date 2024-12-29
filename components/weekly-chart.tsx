"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#FFFFFF", // Cor da legenda em branco
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Remover as linhas verticais
      },
      ticks: {
        color: "#FFFFFF", // Cor das labels do eixo X
      },
    },
    y: {
      grid: {
        display: true, // Mostrar as linhas de grade no eixo Y
        color: "rgba(255, 255, 255, 0.2)", // Linhas horizontais com 50% de opacidade (brancas)
        lineWidth: 2, // Espessura das linhas
      },
      ticks: {
        display: false, // Remover os rótulos verticais do eixo Y
      },
    },
  },
};

const data = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Current Week",
      data: [65, 75, 60, 80, 90, 70, 60],
      backgroundColor: "rgb(124, 58, 237)",
      borderRadius: 4,
      borderColor: "#FFFFFF",
      hoverBackgroundColor: "rgb(124, 58, 237)",
      hoverBorderColor: "#FFFFFF",
    },
    {
      label: "Previous Week",
      data: [70, 60, 70, 65, 75, 65, 50],
      backgroundColor: "rgb(239, 68, 68)",
      borderRadius: 4,
      borderColor: "#FFFFFF",
      hoverBackgroundColor: "rgb(239, 68, 68)",
      hoverBorderColor: "#FFFFFF",
    },
  ],
};

export function WeeklyChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Weekly Summary</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Bar options={options} data={data} />
      </CardContent>
    </Card>
  );
}
