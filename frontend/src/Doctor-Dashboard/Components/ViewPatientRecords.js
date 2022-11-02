import * as React from "react";
import "../Doctors.css";
import Title from "../../Components/Title";
import loading from "../../imports/loading.gif";
import axios from "axios";
import { DOCTOR_VIEW_HEALTH_RECORDS_URL } from "../../api/constants";
import { useState, useEffect } from "react";

export default function ViewPatientRecords() {
  const token = sessionStorage.getItem("accessToken");
  const patientName = sessionStorage.getItem("patientName");
  const tokenString = " Token " + token;
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [healthRecords, setHealthRecords] = useState();
  const [examRecords, setExamRecords] = useState();

  useEffect(() => {
    axios
      .get(DOCTOR_VIEW_HEALTH_RECORDS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      })
      .then(function (response) {
        setHealthRecords(response.data.healthRecords);
        setExamRecords(response.data.examRecords);
        setSuccess(true);
        setBuffer(false);
      })
      .catch(function (err) {
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
        <Title>Viewing {patientName} Records</Title>

        <Title>General Records</Title>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{healthRecords.name}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{healthRecords.dateofbirth}</td>
            </tr>
            <tr>
              <th>Race</th>
              <td>{healthRecords.race}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{healthRecords.address}</td>
            </tr>
            <tr>
              <th>Zipcode</th>
              <td>{healthRecords.zipcode}</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <Title>Health Records</Title>
        <table>
          <tbody>
            <tr>
              <th>Height</th>
              <td>{healthRecords.height}cm</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{healthRecords.weight}kg</td>
            </tr>
            <tr>
              <th>Blood Type</th>
              <td>{healthRecords.bloodtype}</td>
            </tr>
            <tr>
              <th>Allergies</th>
              <td>{healthRecords.allergies}</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <Title>Past Sessions</Title>
        <table>
          <tr>
            <th>Date Time</th>
            <th>Doctor Name</th>
            <th>Prescription</th>
            <th>Diagnosis</th>
          </tr>
          {examRecords.map((examRecords) => (
            <tr>
              <td>{examRecords.examtime}</td>
              <td>{examRecords.doctor}</td>
              <td>{examRecords.diagnosis}</td>
              <td>{examRecords.prescription}</td>
            </tr>
          ))}
        </table>
        <br></br>
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
