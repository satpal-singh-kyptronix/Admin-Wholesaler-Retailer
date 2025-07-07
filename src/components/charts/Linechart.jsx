import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export const Linechart = ({aspectRatio}) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
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
        label: "Total Revenue",
        data: [65, 59, 80, 81, 56, 55, 85, 70, 88, 95, 75, 95],
        fill: true, // Enable fill for the area under the line
        backgroundColor: "rgba(244, 139, 32, .4)", // Fill color
        borderColor: "#F48B20", // Line color
        tension: 0.4, // Smooth line
      },
    ],
  };
  
  // Chart options with drawTime
  const options = {
    responsive: true,
    plugins: {
      filler: {
        drawTime: "beforeDatasetDraw", // Options: 'beforeDraw', 'beforeDatasetsDraw', 'beforeDatasetDraw'
        propagate: false,
      },
      title: {
        display: false,
        text: "Line Chart with drawTime",
      },
    },
    aspectRatio: aspectRatio,
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};
