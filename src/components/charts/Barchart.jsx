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
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export const Barchart = () => {
  const [chartData, setChartData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Oils",
        data: [420,505, 190, 150, 220, 500, 400, 655, 420, 740,523, 852],
        backgroundColor: "#D81D1D",
        borderColor: "#D81D1D",
        borderWidth: 1,
        borderRadius:40
      },
      {
        label: "Lotions",
        data: [240,550, 910, 510, 320, 200, 700, 155, 120, 470,352, 582],
        backgroundColor: "#1879E6",
        borderColor: "#1879E6",
        borderWidth: 1,
        borderRadius:40
      },
      {
        label: "Sprays",
        data: [120,205, 590, 650, 280, 700, 200, 155, 120, 370,253, 285],
        backgroundColor: "#FFAE4C",
        borderColor: "#FFAE4C",
        borderWidth: 1,
        borderRadius:40
      },
      {
        label: "Others",
        data: [230,520, 500, 560, 820, 200, 200, 455, 555, 170,325, 825],
        backgroundColor: "#76A13D",
        borderColor: "#76A13D",
        borderWidth: 1,
        borderRadius:40
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
        text: "Quarterly Revenue - 2025",
        font: {
          size: 18,
          family: "Arial",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${context.parsed.y}K`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Revenue ($K)",
        },
      },
      x: {
        title: {
          display: false,
          text: "Quarter",
        },
      },
    },
    aspectRatio: 3,
  };
  return <Bar data={chartData} options={options} />;
};
