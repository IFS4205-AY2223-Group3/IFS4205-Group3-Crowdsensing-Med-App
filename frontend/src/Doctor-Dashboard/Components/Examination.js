import * as React from "react";
import Title from "../../Components/Title";
import styles from "../Doctors.css";
import axios from "axios";
import { DOCTOR_SUBMIT_URL } from "../../api/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../Components/PopUp";

export default function Examination() {
  const token = sessionStorage.getItem("accessToken");
  const patientName = sessionStorage.getItem("patientName");
  const tokenString = " Token " + token;
  const [errMsg, setErrMsg] = useState("");
  const [prescription, setPrescription] = useState("");
  const [code, setCode] = useState("");
  const [isErrPopUp, setIsErrPopUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        DOCTOR_SUBMIT_URL,
        {
          prescription: prescription,
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenString,
          },
        }
      )
      .then((response) => {
        sessionStorage.removeItem("examId");
        sessionStorage.removeItem("patientName");
        navigate("/doctor");
      })
      .catch((err) => {
        setErrMsg(err.message);
        setIsErrPopUp(true);
      });
  };

  const togglePopUp = () => {
    setIsErrPopUp(!isErrPopUp);
  };
  const handleViewRecords = async () => {
    navigate("/doctorviewrecords");
  };

  return (
    <React.Fragment>
      <Title>Examination Mode</Title>
      <b>You are examining {patientName}</b>
      {isErrPopUp ? <PopUp toggle={togglePopUp} msg={errMsg} /> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="prescription">Prescription:</label>
        <textarea
          type="text"
          rows="3"
          id="prescription"
          autoComplete="off"
          onChange={(e) => setPrescription(e.target.value)}
          value={prescription}
          required
        />
        <label htmlFor="code">Code:</label>
        <textarea
          type="text"
          id="code"
          autoComplete="off"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          required
        />
        <label htmlFor="notes">Notes:</label>
        <textarea
          type="text"
          rows="5"
          cols="80"
          id="notes"
          autoComplete="off"
        />
        <button class={styles.back_button} onClick={handleViewRecords}>
          View {patientName} Records
        </button>

        <button>Submit</button>
      </form>
    </React.Fragment>
  );
}
