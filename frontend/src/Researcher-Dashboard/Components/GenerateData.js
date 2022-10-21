import * as React from "react";
import "../Researcher.css";
import Title from "../../Components/Title";
import loading from "../../imports/loading.gif";
import axios from "axios";
import { VIEW_ANON_DATA_URL } from "../../api/constants";
import { useState, useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";

export default function GenerateData() {
  const token = sessionStorage.getItem("accessToken");
  const tokenString = " Token " + token;
  const key = sessionStorage.getItem("key");
  const value = sessionStorage.getItem("value");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [anonRecords, setAnonyRecords] = useState();

  useEffect(() => {
    axios
      .post(
        VIEW_ANON_DATA_URL,
        {
          key: key,
          value: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenString,
          },
        }
      )
      .then(function (response) {
        setAnonyRecords(response.data);
        console.log(response);
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

  if (success) {
    return (
      <React.Fragment>
        <Title>K-Anonymity Record</Title>
        <br></br>
        <b>Key Chosen: {key}</b>
        <b>Value: {value}</b>
        <CSVLink data={anonRecords} filename={"anon_records.csv"}>
          <font size="5" color="black">
            Click to Download CSV
          </font>{" "}
        </CSVLink>
        <br></br>
        <table>
          <tr>
            <th>Zipcode Range</th>
            <th>Age Range</th>
            <th>Height Range</th>
            <th>Weight Range</th>
            <th>Allergies</th>
            <th>Race</th>
            <th>Sex</th>
            <th>Diagnosis</th>
          </tr>
          {anonRecords.map((anonRecords) => (
            <tr>
              <td>{anonRecords.zipcode_range}</td>
              <td>{anonRecords.age_range}</td>
              <td>{anonRecords.height_range}</td>
              <td>{anonRecords.weight_range}</td>
              <td>{anonRecords.allergies}</td>
              <td>{anonRecords.race}</td>
              <td>{anonRecords.sex}</td>
              <td>{anonRecords.diagnosis}</td>
            </tr>
          ))}
        </table>
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
