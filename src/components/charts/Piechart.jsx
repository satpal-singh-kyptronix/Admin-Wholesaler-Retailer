import React, { useState } from "react";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

export const Piechart = () => {
  const [chartData, setChartData] = useState({
    // labels: ["Marketing", "Development", "Operations", "Research"],
    datasets: [
      {
        label: "Budget Allocation 2025",
        data: [300, 500, 200, 150],
        backgroundColor: [
          "#76A13D",
          "#529AED",
          "#F48B20",
          "#E25656",
        ],
        borderColor: [
          "#76A13D",
          "#529AED",
          "#F48B20",
          "#E25656",
        ],
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
            size: 14,
            family: "Arial",
          },
        },
      },
      title: {
        display: false,
        text: "Budget Allocation - 2025",
        font: {
          size: 18,
          family: "Arial",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (acc, val) => acc + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value}K (${percentage}%)`;
          },
        },
      },
      aspectRatio: 5,
    },
  };
  return (
    <>
      <Pie data={chartData} options={options} />
    </>
  );
};
