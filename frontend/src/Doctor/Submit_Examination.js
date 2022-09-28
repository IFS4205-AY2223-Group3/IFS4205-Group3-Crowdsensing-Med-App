import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorApi } from "./DoctorAPI";
import styles from "./Examine.module.css";
import ConfirmationPopUp from "./ConfirmationPopUp";

const Submit_Examination = () => {
  const { send_exam_record } = DoctorApi();

  const examId = localStorage.getItem("examId");
  const patientId = localStorage.getItem("patientId");
  const patientName = localStorage.getItem("patientName");

  const navigate = useNavigate();

  const [prescription, setPrescription] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const cancelSubmit = () => {
    setIsSubmitted(false);
  };

  const confirmSubmit = () => {
    setIsConfirmed(true);
  };

  useEffect(() => {
    async function postData() {
      const data = {
        examId: examId,
        patientId: patientId,
        prescription: prescription,
        code: code,
      };

      const response = await send_exam_record(data);

      if (response.statusCode === 200) {
        navigate("/doctor");
      } else {
        setErrMsg(response.errorMessage);
      }
    }

    if (isSubmitted && isConfirmed) {
      postData();
    }
  }, [isSubmitted, isConfirmed, examId, patientId, prescription, code, send_exam_record, navigate]);

  const handleViewRecords = () => {
    //todo
  };

  return (
    <div className={styles.container}>
      <section>
        <p
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        {(isSubmitted && !isConfirmed) ? <ConfirmationPopUp closePopUp={cancelSubmit} readyToSend={confirmSubmit} prescription={prescription} code={code}/> : null}

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

        <button class={styles.back_button} onClick={handleViewRecords}>View Patient Records</button>
      </section>
    </div>
  );
};
export default Submit_Examination;
