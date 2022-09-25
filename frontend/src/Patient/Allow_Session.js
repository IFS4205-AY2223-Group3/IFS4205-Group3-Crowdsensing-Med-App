import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Patient_Dashboard.module.css";
import { ALLOWS_SESSION_URL } from "../api/constants";
import axios from "axios";
import loading from "../imports/loading.gif";

const Allow_Session = () => {
  const navigate = useNavigate();
  const examId = localStorage.getItem("examId");
  const token = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);

  useEffect(() => {
    post();
  });

  const post = async () => {
    axios
      .post(ALLOWS_SESSION_URL, {
        token: token,
        examId: examId,
      })
      .then(function (response) {
        setSuccess(true);
        setBuffer(false);
        localStorage.removeItem("examId");
      })
      .catch(function (err) {
        // setSuccess(true); //comment out
        // setBuffer(false); //comment out
        // localStorage.removeItem("examId"); //comment out

        setFailure(true);
        setBuffer(false);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("There was an error, please try again.");
        } else if (err.response?.status === 403) {
          setErrMsg("Action Forbidden");
        } else if (err.response?.status === 500) {
          setErrMsg("Server encountered an error, please try again.");
        } else {
          setErrMsg("Server encountered an error, please try again.");
        }
      });
  };

  const Home = async () => {
    navigate("/patient");
  };

  if (success) {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Generating a Session for {name}</h1>

        <div className={styles.buttons_container}>
          <h2 className={styles.header}>
            You have given consent for the examination. Thank you.{" "}
          </h2>
          <button className={styles.button} onClick={Home}>
            {" "}
            Home{" "}
          </button>
        </div>
      </div>
    );
  } else if (buffer) {
    return (
      <div className={styles.buttons_container}>
        <img className={styles.loading} src={loading} alt="loading..." />
        <h2 className={styles.header}>Loading...</h2>
      </div>
    );
  } else if (failure) {
    return (
      <div className={styles.buttons_container}>
        <h2 className={styles.header}>{errMsg}</h2>
        <button className={styles.button} onClick={Home}>
          {" "}
          Home{" "}
        </button>
      </div>
    );
  }
};
export default Allow_Session;
