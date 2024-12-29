"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
        color: "#FFFFFF", // Cor das labels no eixo X (branco)
      },
    },
    y: {
      grid: {
        display: true, // Mostrar as linhas horizontais
        color: "rgba(255, 255, 255, 0.5)", // Linhas horizontais com 50% de opacidade (brancas)
        lineWidth: 1, // Espessura das linhas horizontais
      },
      ticks: {
        color: "#FFFFFF", // Cor das labels no eixo Y (branco)
      },
    },
  },
};

const data = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      data: [2100, 2300, 2200, 2400, 2300, 2100, 2200],
      borderColor: "rgb(99, 102, 241)",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

export function FoodChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Food</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <Line options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
