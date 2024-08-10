import LineChart from "@/components/LineChart";
import { useGetAllUsersSleepRecordsQuery } from "../generatedTypes";
import styles from "../styles/SleepChart.module.css";
import { useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

export default function SleepChart() {
  const { data, loading, error } = useGetAllUsersSleepRecordsQuery();
  const [selectedData, setSelectedData] = useState([
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        <div>
          <LineChart chartData={selectedData} />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Number of sleep records</th>
              </tr>
            </thead>
            <tbody>
              {data?.users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user.sleeps.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
