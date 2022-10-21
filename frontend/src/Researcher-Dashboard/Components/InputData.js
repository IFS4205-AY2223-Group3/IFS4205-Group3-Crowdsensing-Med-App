import * as React from "react";
import Title from "../../Components/Title";
import styles from "../Researcher.css";
import axios from "axios";
import { DOCTOR_SUBMIT_URL } from "../../api/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../Components/PopUp";
import Dropdown from "react-dropdown";

export default function InputData() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("key", key);
    sessionStorage.setItem("value", value);
    navigate("/generatedata");
  };

  const options = ["one", "two", "three"];

  return (
    <React.Fragment>
      <Title>View Anonymised Health Records</Title>
      <b>
        Pick one key from the possible values: ["zipcode" | "age" | "height" |
        "weight" | "diagnosis_code" ]
      </b>
      <form onSubmit={handleSubmit}>
        <label htmlFor="key">Key:</label>
        <textarea
          type="text"
          rows="1"
          id="key"
          autoComplete="off"
          onChange={(e) => setKey(e.target.value)}
          value={key}
          required
        />
        <label htmlFor="value">Value:</label>
        <textarea
          type="text"
          id="value"
          rows="1"
          autoComplete="off"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          required
        />
        <button>Submit</button>
      </form>
    </React.Fragment>
  );
}
