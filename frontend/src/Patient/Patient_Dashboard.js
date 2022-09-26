import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from "./Patient_Dashboard.module.css";

const Patient_Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [errMsg, setErrMsg] = useState("");

  const Signout = async () => {
    const { logout } = useAuth();
    const response = await logout();
    if (response == false) navigate("/login");
    setErrMsg("Cannot Logout. Please try again later ");
  };

  const GenerateSession = async () => {
    navigate("/generatesession");
  };

  const ViewHealthRecords = async () => {
    navigate("/viewrecords");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Welcome {name}!</h2>
      <div class={styles.buttons_container}>
        <p className={styles.errMsg} aria-live="assertive">
          {errMsg}
        </p>
        <div class={styles.circle}>50%</div>
        <p>Wait Time: 30 Minutes</p>
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
