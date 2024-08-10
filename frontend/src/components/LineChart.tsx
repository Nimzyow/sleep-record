import React from "react";
import { Line } from "react-chartjs-2";
import { User } from "../generatedTypes";

const LineChart = ({
  sleeps,
  username,
}: {
  sleeps: User["sleeps"];
  username: string;
}) => {
  return (
    <div className="chart-container">
      <Line
        data={{
          labels: sleeps.map((sleep) =>
            new Date(Number(sleep.sleptAt)).toDateString()
          ),
          datasets: [
            {
              label: "Sleep record",
              data: sleeps.map((sleep) => sleep.sleepDuration),
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: `${username}'s Sleep record`,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};
export default LineChart;
