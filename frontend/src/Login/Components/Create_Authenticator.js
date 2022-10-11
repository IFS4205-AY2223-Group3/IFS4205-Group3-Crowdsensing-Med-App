import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import styles from "../Login.module.css";
import loading from "../../imports/loading.gif";
import ReactDOM from "react-dom";
import { QRCodeCanvas } from "qrcode.react";
import Title from "../../Components/Title";
import { LOGIN_AUTH_URL } from "../../api/constants";
import axios from "axios";

export default function Create_Authenticator() {
  const token = sessionStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [qrString, setQrString] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(LOGIN_AUTH_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      })
      .then(function (response) {
        setQrString(response.data.message);
        setSuccess(true);
        setBuffer(false);
      })
      .catch(function (err) {
        setFailure(true);
        setBuffer(false);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg(err.response.data.message);
        } else if (err.response?.status === 401) {
          setErrMsg(err.response.data.message);
        } else if (err.response?.status === 403) {
          setErrMsg(err.response.data.message);
        } else if (err.response?.status === 405) {
          setErrMsg(err.response.data.message);
        } else if (err.response?.status === 500) {
          setErrMsg(err.response.data.message);
        } else {
          setErrMsg("Server encountered an error, please try again.");
        }
      });
  }, [tokenString]);

  const handleVerify = async () => {
    navigate("/verifyotp");
  };

  if (success) {
    return (
      <React.Fragment>
        <div className={styles.container}>
          <section>
            <Title>Create 2FA Authenticator</Title>
            <QRCodeCanvas className={styles.qrCode} value={qrString} />
            <br></br>
            <p>
              You currently do not have a registered device. Scan the QR Code
              using Google Authenticator to register your device for 2FA.
            </p>
            <button onClick={handleVerify}>Verify OTP</button>
          </section>
        </div>
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
        <section>
          <Title>{errMsg}</Title>
        </section>
      </div>
    );
  }
}
