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
  const [selectedRow, setSelectedRow] = useState<number>(-1);

  const handleClick = (
    sleeps: User["sleeps"],
    username: string,
    selectedRow: number
  ) => {
    setUsername(username);
    setSelectedData(sleeps);
    setSelectedRow(selectedRow);
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
              {data?.users &&
                data?.users.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => handleClick(user.sleeps, user.name, index)}
                      style={{
                        backgroundColor: selectedRow == index ? "blue" : "",
                        color: selectedRow == index ? "white" : "black",
                        cursor: "pointer",
                      }}
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
