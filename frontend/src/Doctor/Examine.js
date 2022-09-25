import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { DoctorApi } from "./DoctorAPI";
import styles from "./Doctor_Dashboard.module.css";
import logo from "../imports/medibook.png";

const Examine = () => {
	const { send_examId } = DoctorApi();

	const userRef = useRef();
	const errRef = useRef();
  const navigate = useNavigate();

	const [examId, setExamId] = useState("");
	const [errMsg, setErrMsg] = useState("");

	const handleSubmit = async (e) => {
    e.preventDefault();

		const data = {
			examId: examId,
		}

		const response = await send_examId(data); //pass in data needed for POST request

		if (response.statusCode === 200) {
      const patientId = localStorage.getItem("patientId");
      const patientName = localStorage.getItem("patientName");

			navigate("/submitexamination");
    } else {
      setErrMsg(response.errorMessage);
		}
	};

  return (
    <div className={styles.container}>
			<section>
				<p
					ref={errRef}
					className={errMsg ? "errmsg" : "offscreen"}
					aria-live="assertive"
				>
				{errMsg}
				</p>
				<img src={logo} className={styles.logo} alt="logo" />

				<h1>Enter Session ID to examine</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="examId">Session ID:</label>
					<input
						type="text"
						id="examId"
						ref={userRef}
						autoComplete="off"
						onChange={(e) => setExamId(e.target.value)}
						value={examId}
						required
					/>
				</form>
				</section>
    </div>
  );
};
export default Examine;
