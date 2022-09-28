import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Doctor_Dashboard.module.css";
import axios from "axios";
import { DOCTOR_VIEW_HEALTH_RECORDS_URL } from "../api/constants";
import loading from "../imports/loading.gif";

const Doctor_View_Records = () => {
  const navigate = useNavigate();
  const patientName = localStorage.getItem("patientName");
  const patientId = localStorage.getItem("patientId");
  const token = localStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [healthRecords, setHealthRecords] = useState();
  const [examRecords, setExamRecords] = useState();

  axios
    .get(
      DOCTOR_VIEW_HEALTH_RECORDS_URL,
      {
        userId: patientId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      }
    )
    .then(function (response) {
      setHealthRecords(response.healthRecords);
      setExamRecords(response.examRecords);
      setSuccess(true);
      setBuffer(false);
    })
    .catch(function (err) {
      const response = {
        healthRecords: {
          name: "Karl",
          dateofbirth: "1999-01-08",
          height: 155,
          weight: 53,
          bloodtype: "B+",
          allergies: "None",
        },
        examRecords: [
          {
            session_id: "123",
            doctor: "Dr Jim",
            diagnosis: "High Fever",
            prescription: "150mg panadol",
            sessiontime: "2022-09-22T16:56:36.636524+08:00",
          },
          {
            session_id: "321",
            doctor: "Dr Jim",
            diagnosis: "Stomachache",
            prescription: "150mg paracetamol",
            sessiontime: "2022-09-22T16:57:08.848481+08:00",
          },
        ],
      };
      setHealthRecords(response.healthRecords);
      setExamRecords(response.examRecords);
      setSuccess(true); //comment out
      setBuffer(false); //comment out

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

  const Back = async () => {
    navigate("/doctor");
  };

  if (success) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Health Records for {patientName}</h2>
        <br></br>
        <table>
          <tr>
            <th>Name</th>
            <th>{healthRecords.name}</th>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <th>{healthRecords.dateofbirth}</th>
          </tr>
          <tr>
            <th>Height</th>
            <th>{healthRecords.height}cm</th>
          </tr>
          <tr>
            <th>Weight</th>
            <th>{healthRecords.weight}.kg</th>
          </tr>
          <tr>
            <th>Blood Type</th>
            <th>{healthRecords.bloodtype}</th>
          </tr>
          <tr>
            <th>Allergies</th>
            <th>{healthRecords.allergies}</th>
          </tr>
        </table>
        <br></br>
        <h2 className={styles.header}>Session Records for {patientName}</h2>
        <div>
          {examRecords.map((examRecords) => {
            return (
              <table>
                <br></br>
                <tr>
                  <th>Session Time</th>
                  <th>{examRecords.sessiontime}</th>
                </tr>
                <tr>
                  <th>Doctor</th>
                  <th>{examRecords.doctor}</th>
                </tr>
                <tr>
                  <th>Diagnosis</th>
                  <th>{examRecords.diagnosis}</th>
                </tr>
                <tr>
                  <th>Prescription</th>
                  <th>{examRecords.prescription}</th>
                </tr>
              </table>
            );
          })}
        </div>
        <button class={styles.button} onClick={Back}>
          Back
        </button>
      </div>
    );
  } else if (buffer) {
    return (
      <div className={styles.buttons_container}>
        <img className={styles.loading} src={loading} alt="loading..." />
        <h2 className={styles.header}>Generating...</h2>
      </div>
    );
  } else if (failure) {
    return (
      <div className={styles.buttons_container}>
        <h2 className={styles.header}>{errMsg}</h2>
        <button className={styles.button} onClick={Back}>
          {" "}
          Back{" "}
        </button>
      </div>
    );
  }
};
export default Doctor_View_Records;
