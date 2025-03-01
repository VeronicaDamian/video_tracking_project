import React from "react";
import { Chart } from "react-chartjs-2";

function PerformanceChart() {
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Seconds Edited",
        data: [120, 200, 150, 180, 220, 300, 250],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Seconds Edited",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
    },
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Editing Performance</h2>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}

export default PerformanceChart;
