import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorApi } from "./DoctorAPI";
import styles from "./Examine.module.css";
import PopUp from "../PopUp";

const Examine = () => {
	const { send_examId } = DoctorApi();

	const token = localStorage.getItem("accessToken");
	const tokenString = " Token " + token;

  const navigate = useNavigate();

	const [examId, setExamId] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [isErrPopUp, setIsErrPopUp] = useState(false);

	const handleSubmit = async (e) => {
    e.preventDefault();

		const data = {
			examId: examId,
			tokenString: tokenString,
		};

		const response = await send_examId(data);

		if (response.status === 200) {
			navigate("/submitexamination");
    } else {
      setErrMsg(response.message);
			setIsErrPopUp(true);
		}
	};

	const togglePopUp = () => {
		setIsErrPopUp(!isErrPopUp);
	};

	const Back = async () => {
    navigate("/doctor");
  };

  return (		
    <div className={styles.container}>
			{isErrPopUp ? <PopUp toggle={togglePopUp} msg={errMsg}/> : null}

			<section>
				<h1>Enter Session ID to examine</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="examId">Session ID:</label>
					<input
						type="text"
						id="examId"
						autoComplete="off"
						onChange={(e) => setExamId(e.target.value)}
						value={examId}
						required
					/>
					<button>Enter</button>
				</form>

				<button class={styles.back_button} onClick={Back}>Back</button>
				</section>
    </div>
  );
};
export default Examine;
