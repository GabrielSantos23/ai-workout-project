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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityChartProps {
  data: {
    labels: string[];
    calories: number[];
    exercise: number[];
  };
}

export function ActivityChart({ data }: ActivityChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Calories",
        data: data.calories,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
      },
      {
        label: "Exercise",
        data: data.exercise,
        borderColor: "rgb(248, 113, 113)",
        backgroundColor: "rgba(248, 113, 113, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line options={options} data={chartData} />
    </div>
  );
}
