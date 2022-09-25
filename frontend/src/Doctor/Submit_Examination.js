import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Examine.module.css";

const Submit_Examination = () => {
  const navigate = useNavigate();

  const [prescription, setPrescription] = useState("");
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const patientId = localStorage.getItem("patientId");
  const patientName = localStorage.getItem("patientName");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //todo
  }

  const viewRecords = () => {
    //todo
  }

  return (
    <div className={styles.container}>
      <section>
        <p
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1>You are prescribing {patientName}</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="prescription">Prescription:</label>
            <input
              type="text"
              id="prescription"
              autoComplete="off"
              onChange={(e) => setPrescription(e.target.value)}
              value={prescription}
              required
            />
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              id="code"
              autoComplete="off"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              required
            />
            <button>Submit</button>
				</form>

        <button class={styles.back_button} onClick={viewRecords}>View Patient Records</button>
      </section>
    </div>
  );
};
export default Submit_Examination;
