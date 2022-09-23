import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Patient_Dashboard.module.css";
import { ALLOWS_SESSION_URL } from "../api/constants";
import axios from "axios";

const Generate_Session = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");
  const [examId, setExamId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    post();
  });

  const post = async () => {
    axios
      .post(ALLOWS_SESSION_URL, {
        token: token,
        userId: userId,
      })
      .then(function (response) {
        setExamId(response?.data?.examId);
        setSuccess(true);
      })
      .catch(function (err) {
        setSuccess(true); //comment out
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("There was an error, please try again.");
        } else if (err.response?.status === 403) {
          setErrMsg("Action Forbidden");
        } else {
          setErrMsg("Server encountered an error, please try again.");
        }
      });
  };

  const Home = async () => {
    navigate("/patient");
  };

  return (
    <>
      {!success ? (
        <div className={styles.buttons_container}>
          <h2 className={styles.header}>{errMsg}</h2>
          <button className={styles.button} onClick={Home}>
            {" "}
            Back{" "}
          </button>
        </div>
      ) : (
        <div className={styles.container}>
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
      )}
    </>
  );
};
export default Generate_Session;
