import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from "./Patient_Dashboard.module.css";

const Patient_Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const Signout = async () => {
    const { logout } = useAuth();
    logout();
    navigate("/login");
  };

  const GenerateSession = async () => {};

  const ViewHealthRecords = async () => {};

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Welcome {name}!</h2>
      <div class={styles.buttons_container}>
        <div class="generate">
          <button class={styles.button} onClick={GenerateSession}>
            Generate Session
          </button>
        </div>
        <div class="view">
          <button class={styles.button} onClick={ViewHealthRecords}>
            View Health Records
          </button>
        </div>
        <div class="signout">
          <button class={styles.button} onClick={Signout}>
            Sign out
          </button>
        </div>{" "}
      </div>
    </div>
  );
};
export default Patient_Dashboard;
