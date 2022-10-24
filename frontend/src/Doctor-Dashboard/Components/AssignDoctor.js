import * as React from "react";
import Title from "../../Components/Title";
import axios from "axios";
import { EXAMINE_URL } from "../../api/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../Components/PopUp";

export default function AssignDoctor() {
  const token = sessionStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const [errMsg, setErrMsg] = useState("");
  const [examId, setExamId] = useState("");
  const [isErrPopUp, setIsErrPopUp] = useState(false);
  const navigate = useNavigate();

  const setData = ({ examId, patientName }) => {
    sessionStorage.setItem("examId", examId);
    sessionStorage.setItem("patientName", patientName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        EXAMINE_URL,
        {
          examId: examId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenString,
          },
        }
      )
      .then((response) => {
        const patientName = response.data.patientName;
        const examDetails = {
          examId: examId,
          patientName: patientName,
        };
        setData(examDetails);
        navigate("/submitexamination");
      })
      .catch((err) => {
        setErrMsg(err.message);
        setIsErrPopUp(true);
      });
  };

  const togglePopUp = () => {
    setIsErrPopUp(!isErrPopUp);
  };

  return (
    <React.Fragment>
      <Title>Examine a Patient</Title>
      {isErrPopUp ? <PopUp toggle={togglePopUp} msg={errMsg} /> : null}

      <form onSubmit={handleSubmit}>
        <label htmlFor="examId">Session ID:</label>
        <input
          type="text"
          id="examId"
          autoComplete="off"
          onChange={(e) => setExamId(e.target.value)}
          value={examId}
          required
        />
        <button>Enter</button>
      </form>
    </React.Fragment>
  );
}
