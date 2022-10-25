import * as React from "react";
import styles from "../Patient.css";
import Title from "../../Components/Title";
import loading from "../../imports/loading.gif";
import axios from "axios";
import { VIEW_RECORDS_URL } from "../../api/constants";
import { useState, useEffect } from "react";

export default function PastSessions() {
  const token = sessionStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [examRecords, setExamRecords] = useState();

  useEffect(() => {
    axios
      .get(VIEW_RECORDS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      })
      .then(function(response) {
        setExamRecords(response.data.examRecords);
        setSuccess(true);
        setBuffer(false);
      })
      .catch(function(err) {
        setFailure(true);
        setBuffer(false);
        if (!err.response) {
          setErrMsg("No Server Response");
        } else if (err.response.status === 400) {
          setErrMsg(err.response.data.message);
        } else if (err.response.status === 401) {
          setErrMsg(err.response.data.message);
        } else if (err.response.status === 403) {
          setErrMsg(err.response.data.message);
        } else if (err.response.status === 405) {
          setErrMsg(err.response.data.message);
        } else if (err.response.status === 500) {
          setErrMsg(err.response.data.message);
        } else {
          setErrMsg("Server encountered an error, please try again.");
        }
      });
  }, [tokenString]);

  if (success) {
    return (
      <React.Fragment>
        <Title>Past Sessions</Title>
        <table>
          <thead>
            <tr>
              <th>Date Time</th>
              <th>Doctor Name</th>
              <th>Prescription</th>
              <th>Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {examRecords.map((examRecord, id) => (
              <tr key={id}>
                <td>{examRecord.examtime}</td>
                <td>{examRecord.doctor}</td>
                <td>{examRecord.diagnosis}</td>
                <td>{examRecord.prescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  } else if (buffer) {
    return (
      <div className={styles.buttons_container}>
        <Title>Generating...</Title>
        <img className={styles.loading} src={loading} alt="loading..." />
      </div>
    );
  } else if (failure) {
    return (
      <div className={styles.buttons_container}>
        <Title>{errMsg}</Title>
      </div>
    );
  }
}
