import * as React from "react";
import { useState } from "react";
import Title from "./Title";
import { CHANGE_OTP_URL } from "../api/constants";
import axios from "axios";
import PopUp from "./PopUp";

export default function ChangeAuth() {
  const token = sessionStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const [popMsg, setPopMsg] = useState("");
  const [otp, setOTP] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        CHANGE_OTP_URL,
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
        setPopMsg(
          "Device Successfully Removed. Relogin to set a new Authenticator"
        );
        setIsPopUp(true);
      })
      .catch((err) => {
        setPopMsg(err.message);
        setIsPopUp(true);
      });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    axios
      .get(CHANGE_OTP_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      })
      .then((response) => {
        setPopMsg(response.data.message);
        setIsPopUp(true);
      })
      .catch((err) => {
        setPopMsg(err.message);
        setIsPopUp(true);
      });
  };

  const togglePopUp = () => {
    setIsPopUp(!isPopUp);
  };

  return (
    <React.Fragment>
      <Title>Change Authenticator</Title>
      {isPopUp ? <PopUp toggle={togglePopUp} msg={popMsg} /> : null}

      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          id="otp"
          autoComplete="off"
          onChange={(e) => setOTP(e.target.value)}
          value={otp}
          required
        />
        <button>Enter</button>
      </form>
      <button onClick={handleSend}> Send OTP</button>
    </React.Fragment>
  );
}
