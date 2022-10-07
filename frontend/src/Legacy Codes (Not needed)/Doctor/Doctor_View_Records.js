import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DoctorApi } from "./DoctorAPI";
import styles from "./Doctor_Dashboard.module.css";
import loading from "../imports/loading.gif";

const Doctor_View_Records = () => {
  const navigate = useNavigate();

  const patientName = localStorage.getItem("patientName");
  const token = localStorage.getItem("accessToken");
  const tokenString = " Token " + token;

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);

  const [healthRecords, setHealthRecords] = useState();
  const [examRecords, setExamRecords] = useState();

  const { get_records } = DoctorApi();

  useEffect(() => {
    async function getData() {
      const data = {
        tokenString: tokenString,
      };

      const response = await get_records(data);

      if (response.status === 200) {
        setHealthRecords(response?.data?.healthRecords);
        setExamRecords(response?.data?.examRecords);
        setSuccess(true);
        setBuffer(false);
      } else {
        setFailure(true);
        setBuffer(false);
        setErrMsg(response.message);
      }
    }

    getData();
  }, [tokenString]);

  const Back = async () => {
    navigate("/submitexamination");
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
                  <th>{examRecords.examtime}</th>
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
