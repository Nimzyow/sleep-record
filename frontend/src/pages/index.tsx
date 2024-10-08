// pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import {
  GetAllUsersSleepRecordsDocument,
  useRecordSleepMutation,
} from "../generatedTypes";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    sleepDuration: "",
    sleptAt: "",
    gender: "",
  });
  const [submitForm, { data, loading, error }] = useRecordSleepMutation({
    refetchQueries: [{ query: GetAllUsersSleepRecordsDocument }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const date = new Date(formData.sleptAt);
      await submitForm({
        variables: {
          ...formData,
          sleepDuration: parseInt(formData.sleepDuration),
          sleptAt: date.toISOString(),
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className={styles.container}
      style={{
        marginTop: 25,
      }}
    >
      <h1>Enter your sleep record</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="sleepDuration">Sleep Duration (hours):</label>
          <input
            type="number"
            id="sleepDuration"
            name="sleepDuration"
            value={formData.sleepDuration}
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="sleptAt">Slept At:</label>
          <input
            type="date"
            id="sleptAt"
            name="sleptAt"
            value={formData.sleptAt}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {data?.recordSleep.__typename == "User" && (
          <div>
            <p>Successfully added sleep record for {data.recordSleep.name}</p>
          </div>
        )}
        {data?.recordSleep.__typename == "UserInputError" && (
          <div>
            <p style={{ color: "red" }}>{data.recordSleep.message}</p>
          </div>
        )}
        {error && (
          <p style={{ color: "red" }}>Submission error! {error.message}</p>
        )}
      </form>
    </div>
  );
}
