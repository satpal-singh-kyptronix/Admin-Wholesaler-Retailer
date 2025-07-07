import React, { useState } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
  RadialLinearScale,
} from "chart.js/auto";
import { Radar } from "react-chartjs-2";

ChartJs.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const Radarchart = () => {
  const [chartData, setChartData] = useState({
    labels: [
      "Mon",
      "Tues",
      "Wed",
      "Thus",
      "Fri",
      "Sat",
      "Sun",
    ],
    datasets: [
      {
        label: "Returning User",
        data: [80, 90, 70, 85, 75,89,25,33],
        backgroundColor: "rgba(244, 139, 32, 0.50)",
        borderColor: "rgba(244, 139, 32, 1)",
        pointBackgroundColor: "rgba(244, 139, 32, 1)",
        pointBorderColor: "rgba(244, 139, 32, 0.50)",
        pointHoverBackgroundColor: "rgba(244, 139, 32, 0.50)",
        pointHoverBorderColor: "rgba(244, 139, 32, 1)",
        borderWidth: 1,
      },
      {
        label: "New User",
        data: [65, 75, 85, 70, 90,59,67,85],
        backgroundColor: "rgba(118, 161, 61, 1)",
        borderColor: "rgba(118, 161, 61,1)",
        pointBackgroundColor: "rgba(118, 161, 61, 1)",
        pointBorderColor: "rgba(118, 161, 61, 1)",
        pointHoverBackgroundColor: "rgba(118, 161, 61, 1)",
        pointHoverBorderColor: "rgba(118, 161, 61, 1)",
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 9,
            family: "Arial",
          },
        },
      },
      title: {
        display: false,
        text: "Team Performance Metrics - 2025",
        font: {
          size: 18,
          family: "Arial",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.r}`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
        },
        pointLabels: {
          font: {
            size: 10,
            family: "Arial",
          },
        },
      },
    },
    aspectRatio: 1,
  };
  return (
    <>
      <Radar data={chartData} options={options} />
    </>
  );
};
