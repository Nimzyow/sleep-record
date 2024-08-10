import React from "react";
import { Line } from "react-chartjs-2";

type ChartData = {
  id: number;
  year: number;
  userGain: number;
  userLost: number;
};
const LineChart = ({ chartData }: { chartData: ChartData[] }) => {
  function getLast7Days() {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - i);
      dates.push(pastDate.toISOString().split("T")[0]);
    }

    return dates;
  }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={{
          labels: getLast7Days(),
          datasets: [
            {
              label: "Users Gained ",
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
              text: "Users Gained between 2016-2020",
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
