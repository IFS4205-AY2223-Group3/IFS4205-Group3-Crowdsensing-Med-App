import * as React from "react";
import "../Patient.css";
import Title from "../../Components/Title";
import loading from "../../imports/loading.gif";
import axios from "axios";
import { GENERATE_SESSION_URL, ALLOWS_SESSION_URL } from "../../api/constants";
import { useState, useEffect } from "react";
import PopUp from "../../Components/PopUp";
import { useNavigate } from "react-router-dom";

export default function GenerateSession() {
  const token = sessionStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [examId, setExamId] = useState("");
  const [allowErrMsg, setAllowErrMsg] = useState("");
  const [isErrPopUp, setIsErrPopUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(GENERATE_SESSION_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      })
      .then(function(response) {
        setExamId(response.data.examId);
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

  const HandleAllow = async () => {
    console.log("here");
    axios
      .post(
        ALLOWS_SESSION_URL,
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
      .then(function(response) {
        navigate("/patient");
      })
      .catch(function(allowErr) {
        setAllowErrMsg("Server encountered an error, please try again.");
        setIsErrPopUp(true);
      });
  };

  const togglePopUp = () => {
    setIsErrPopUp(!isErrPopUp);
  };

  if (success) {
    return (
      <React.Fragment>
        {isErrPopUp ? <PopUp toggle={togglePopUp} msg={allowErrMsg} /> : null}
        <Title>
          <big>Generating an Examination ID</big>
        </Title>
        <br></br>
        <h2>
          <u>Instructions</u>
        </h2>
        <p>
          <small>1. Please ensure you are physically with a Doctor.</small>
        </p>
        <p>
          <small>2. Pass your Doctor your unique Examination ID.</small>
        </p>
        <p>
          <small>
            3. Click Allow to give the Doctor full consent to examine you.
          </small>
        </p>
        <p>
          <small>
            Your Examination ID only changes after Doctor has examined you.
          </small>
        </p>
        <br></br>

        <p>
          <center>
            <strong>Examination ID:</strong> {examId}
          </center>
        </p>
        <br></br>
        <button onClick={HandleAllow}>Allow</button>
      </React.Fragment>
    );
  } else if (buffer) {
    return (
      <div>
        <Title>Generating...</Title>
        <img src={loading} alt="loading..." />
      </div>
    );
  } else if (failure) {
    return (
      <div>
        <Title>{errMsg}</Title>
      </div>
    );
  }
}
