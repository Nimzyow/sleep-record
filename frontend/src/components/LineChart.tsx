import React from "react";
import { Line } from "react-chartjs-2";
import { User } from "../generatedTypes";

const LineChart = ({ sleeps }: { sleeps: User["sleeps"] }) => {
  console.log(sleeps);
  function getLast7Days() {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - i);
      dates.push(pastDate.toISOString().split("T")[0]);
    }

    return dates.reverse();
  }

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
              data: [1, 2, 3, 4, 5, 6, 7],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "User Sleep record",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
export default LineChart;
