
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Activity Manager</title>
        <meta name="description" content="Activity Manager for tracking learning and work tasks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Activity Manager</h1>
        
        <div className={styles.taskSection}>
          <h2>Today's Learning Tasks</h2>
          <table className={styles.taskTable}>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Task Status</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {/* Learning task data will go here */}
              <tr>
                <td>Read Chapter 3</td>
                <td>Complete reading of chapter 3 in textbook</td>
                <td>Pending</td>
                <td>Mathematics</td>
              </tr>
              <tr>
                <td>Complete Assignment</td>
                <td>Finish the assignment for next class</td>
                <td>In Progress</td>
                <td>Physics</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.taskSection}>
          <h2>Today's Work Tasks</h2>
          <table className={styles.taskTable}>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Task Status</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {/* Work task data will go here */}
              <tr>
                <td>Project Meeting</td>
                <td>Team sync for new project</td>
                <td>Completed</td>
                <td>Development</td>
              </tr>
              <tr>
                <td>Email Responses</td>
                <td>Respond to pending client emails</td>
                <td>Pending</td>
                <td>Communication</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Home;
