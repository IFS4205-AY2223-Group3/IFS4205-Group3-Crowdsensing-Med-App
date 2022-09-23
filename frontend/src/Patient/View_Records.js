import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from "./Patient_Dashboard.module.css";
import axios from "axios";
import { VIEW_RECORDS_URL } from "../api/constants";

const View_Records = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");

  axios
    .post(
      VIEW_RECORDS_URL,
      {
        token: accessToken,
        userId: userId,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  const Back = async () => {
    navigate("/patient");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Viewing Records for {name}!</h2>
      <div class={styles.buttons_container}>
        <button class={styles.button} onClick={Back}>
          Back
        </button>
      </div>
    </div>
  );
};
export default View_Records;
