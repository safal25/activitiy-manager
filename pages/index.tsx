import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  subject: string;
}

const Home: NextPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [learningTasks, setLearningTasks] = useState<Task[]>([]);
  const [workTasks, setWorkTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/tasks");
        setLearningTasks(response.data.learningTasks);
        setWorkTasks(response.data.workTasks);
        setError(null);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.darkContainer : ""}`}
    >
      <Head>
        <title>Activity Manager</title>
        <meta
          name="description"
          content="Activity Manager for tracking learning and work tasks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.themeToggle}>
        <button onClick={toggleDarkMode} className={styles.themeButton}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <main className={`${styles.main} ${darkMode ? styles.darkMain : ""}`}>
        <h1 className={styles.title}>Activity Manager</h1>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {loading ? (
          <div className={styles.loading}>Loading tasks...</div>
        ) : (
          <>
            <div
              className={`${styles.taskSection} ${darkMode ? styles.darkTaskSection : ""}`}
            >
              <h2>Today&apos;s Learning Tasks</h2>
              <table
                className={`${styles.taskTable} ${darkMode ? styles.darkTaskTable : ""}`}
              >
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Task Description</th>
                    <th>Task Status</th>
                    <th>Subject Name</th>
                  </tr>
                </thead>
                <tbody>
                  {learningTasks.length > 0 ? (
                    learningTasks.map((task) => (
                      <tr key={task.id}>
                        <td>
                          {task.subject === "System Design" ? (
                            <a
                              href={`https://github.com/karanpratapsingh/system-design?tab=readme-ov-file#${task.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {task.name}
                            </a>
                          ) : (
                            task.name
                          )}
                        </td>
                        <td>{task.description}</td>
                        <td>{task.status}</td>
                        <td>{task.subject}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className={styles.emptyTable}>
                        No learning tasks found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div
              className={`${styles.taskSection} ${darkMode ? styles.darkTaskSection : ""}`}
            >
              <h2>Today&apos;s Work Tasks</h2>
              <table
                className={`${styles.taskTable} ${darkMode ? styles.darkTaskTable : ""}`}
              >
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Task Description</th>
                    <th>Task Status</th>
                    <th>Subject Name</th>
                  </tr>
                </thead>
                <tbody>
                  {workTasks.length > 0 ? (
                    workTasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.status}</td>
                        <td>{task.subject}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className={styles.emptyTable}>
                        No work tasks found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
