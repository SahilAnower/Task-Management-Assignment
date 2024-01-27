import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@mui/material/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ tasksCount }) {
  const data = {
    labels: [
      "Completed Tasks Today",
      "Pending Tasks Today",
      "Completed Tasks All Time",
      "Pending Tasks All Time",
    ],
    datasets: [
      {
        label: "# of Tasks",
        data: [
          tasksCount.completedTasksToday,
          tasksCount.pendingTasksToday,
          tasksCount.completedTasksAllTime,
          tasksCount.pendingTasksAllTime,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.5,
  };
  return (
    <Card
      sx={{
        padding: 2,
      }}
    >
      <Pie data={data} options={options} />
    </Card>
  );
}

export default PieChart;
