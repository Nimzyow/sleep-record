import LineChart from "@/components/LineChart";
import { useGetAllUsersSleepRecordsQuery, User } from "../generatedTypes";
import styles from "../styles/SleepChart.module.css";
import { useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

export default function SleepChart() {
  const { data, loading, error } = useGetAllUsersSleepRecordsQuery();
  const [selectedData, setSelectedData] = useState<User["sleeps"]>([]);
  const [username, setUsername] = useState<string>("");

  const handleClick = (sleeps: User["sleeps"], username: string) => {
    setUsername(username);
    setSelectedData(sleeps);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        <div>
          {selectedData.length == 0 ? (
            <></>
          ) : (
            <LineChart sleeps={selectedData} username={username} />
          )}
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
                  <tr
                    key={index}
                    onClick={() => handleClick(user.sleeps, user.name)}
                  >
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user._count.sleeps}</td>
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
