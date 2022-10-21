import * as React from "react";
import { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { LOGIN_OTP_URL } from "../../api/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Login.module.css";
import PopUp from "../../Components/PopUp";

export default function OTP() {
  const token = sessionStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const [errMsg, setErrMsg] = useState("");
  const [otp, setOTP] = useState("");
  const [isErrPopUp, setIsErrPopUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otp);
    axios
      .post(
        LOGIN_OTP_URL,
        {
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenString,
          },
        }
      )
      .then((response) => {
        const role = sessionStorage.getItem("userRole");
        sessionStorage.setItem("isVerified", true);
        if (role === "Patient") {
          navigate("/patient");
        } else if (role === "Doctor") {
          navigate("/doctor");
        } else if (role === "Researcher") {
          navigate("/researcher");
        } else if (role === "Staff") {
          navigate("/staff");
        } else {
          navigate("");
        }
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
      <div className={styles.container}>
        {isErrPopUp ? <PopUp toggle={togglePopUp} msg={errMsg} /> : null}
        <section>
          <Title>Enter verification code from Google Authenticator</Title>
          <form onSubmit={handleSubmit}>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              autoComplete="off"
              onChange={(e) => setOTP(e.target.value)}
              value={otp}
              required
            />
            <button>Submit</button>
          </form>
        </section>
      </div>
    </React.Fragment>
  );
}
