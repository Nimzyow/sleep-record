// pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SUBMIT_FORM } from "../graphql/mutations";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    sleepDuration: "",
    sleptAt: "",
    gender: "",
  });
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM);

  const router = useRouter();

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
      await submitForm({
        variables: {
          ...formData,
          sleepDuration: parseInt(formData.sleepDuration),
        },
      });
      router.push("/sleep-chart");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Enter Your Details</h1>
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
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="sleptAt">Slept At:</label>
          <input
            type="datetime-local"
            id="sleptAt"
            name="sleptAt"
            value={formData.sleptAt}
            onChange={handleChange}
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
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && (
          <p style={{ color: "red" }}>Submission error! {error.message}</p>
        )}
      </form>
    </div>
  );
}
