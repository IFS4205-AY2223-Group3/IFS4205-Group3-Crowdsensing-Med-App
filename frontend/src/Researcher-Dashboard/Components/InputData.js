import * as React from "react";
import Title from "../../Components/Title";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputData() {
  const [age, setAge] = useState("*");
  const [height, setHeight] = useState("*");
  const [weight, setWeight] = useState("*");
  const [allergies, setAllergies] = useState("*");
  const [race, setRace] = useState("*");
  const [sex, setSex] = useState("*");
  const [zipcode, setZipcode] = useState("*");
  const [diagnosis, setDiagnosis] = useState("*");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("age", age);
    sessionStorage.setItem("height", height);
    sessionStorage.setItem("weight", weight);
    sessionStorage.setItem("allergies", allergies);
    sessionStorage.setItem("race", race);
    sessionStorage.setItem("sex", sex);
    sessionStorage.setItem("diagnosis", diagnosis);
    sessionStorage.setItem("zipcode", zipcode);
    navigate("/generatedata");
  };

  return (
    <React.Fragment>
      <Title>View Anonymised Health Records</Title>
      <b>Specify key filters</b>
      <b>Leave input as * for no filter.</b>
      <form onSubmit={handleSubmit}>
        <label htmlFor="zipcode">Zipcode (100000-900000):</label>
        <input
          type="text"
          id="zipcode"
          autoComplete="off"
          onChange={(e) => setZipcode(e.target.value)}
          value={zipcode}
          required
        />
        <label htmlFor="age">Age (6-100):</label>
        <input
          type="text"
          id="age"
          autoComplete="off"
          onChange={(e) => setAge(e.target.value)}
          value={age}
          required
        />

        <label htmlFor="height">Height (130-209):</label>
        <input
          type="text"
          id="height"
          autoComplete="off"
          onChange={(e) => setHeight(e.target.value)}
          value={height}
          required
        />

        <label htmlFor="weight">Weight (40-119):</label>
        <input
          type="text"
          id="weight"
          autoComplete="off"
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          required
        />

        <label htmlFor="diagnosis">Diagnosis (Refer to ICD10 Codes):</label>
        <input
          type="text"
          id="diagnosis"
          autoComplete="off"
          onChange={(e) => setDiagnosis(e.target.value)}
          value={diagnosis}
          required
        />

        <label htmlFor="genderDropdown">Sex:</label>
        <select
          id="genderDropdown"
          onChange={(e) => setSex(e.target.value)}
          required
        >
          <option value="*">*</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <label htmlFor="allergiesDropdown">Allergies:</label>
        <select
          id="allergiesDropdown"
          onChange={(e) => setAllergies(e.target.value)}
          required
        >
          <option value="*">*</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>

        <label htmlFor="raceDropdown">Race:</label>
        <select
          id="raceDropdown"
          onChange={(e) => setRace(e.target.value)}
          required
        >
          <option value="*">*</option>
          <option value="Chinese">Chinese</option>
          <option value="Malay">Malay</option>
          <option value="Indian">Indian</option>
          <option value="Others">Others</option>
        </select>

        <button>Submit</button>
      </form>
    </React.Fragment>
  );
}
