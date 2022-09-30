import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Doctor_Dashboard.module.css";
import { VIEW_COUNT_URL } from "../api/constants";
import axios from "axios";

const Doctor_Dashboard = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [errMsg, setErrMsg] = useState("");
  const [count, setCrowdCounter] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);

  useEffect(() => {
    axios
      .get(VIEW_COUNT_URL)
      .then(function (response) {
        setCrowdCounter(response.data.count);
        setSuccess(true);
        setBuffer(false);
      })
      .catch(function (err) {
        setFailure(true);
        setBuffer(false);
      });
  });

  const handleSignOut = async () => {
    const response = await logout();

    if (response.status === 200) {
      navigate("/login");
    } else {
      setErrMsg("Cannot Logout. Please try again later ");
    }
  };

  const Examine = async () => {
    navigate("/assigndoctor");
  };

  if (success) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <p className={styles.errMsg} aria-live="assertive">
            {errMsg}
          </p>
          <div class={styles.circle}>{count.count}%</div>
          <p>Last Updated: {count.time_recorded} </p>
          <div class="examine">
            <button className={styles.button} onClick={Examine}>
              Examine
            </button>
          </div>
          <div class="signout">
            <button className={styles.button} onClick={handleSignOut}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  } else if (buffer) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <p className={styles.errMsg} aria-live="assertive">
            {errMsg}
          </p>
          <div class={styles.circle}></div>
          <p>Generating...</p>
          <div class="examine">
            <button className={styles.button} onClick={Examine}>
              Examine
            </button>
          </div>
          <div class="signout">
            <button className={styles.button} onClick={handleSignOut}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  } else if (failure) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Welcome {name}!</h2>
        <div class={styles.buttons_container}>
          <p className={styles.errMsg} aria-live="assertive">
            {errMsg}
          </p>
          <div class={styles.circle}>Error</div>
          <p>There is an error</p>
          <div class="examine">
            <button className={styles.button} onClick={Examine}>
              Examine
            </button>
          </div>
          <div class="signout">
            <button className={styles.button} onClick={handleSignOut}>
              Sign out
            </button>
          </div>{" "}
        </div>
      </div>
    );
  }
};
export default Doctor_Dashboard;
