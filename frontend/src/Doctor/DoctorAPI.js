import axios from "axios";
import { EXAMINE_URL } from "../api/constants";
import { DOCTOR_SUBMIT_URL } from "../api/constants";

export function DoctorApi() {
	const setData = ({examId, patientId, patientName}) => {
		localStorage.setItem("examId", examId);
		localStorage.setItem("patientId", patientId);
		localStorage.setItem("patientName", patientName);
	};

	const send_examId = async({ examId, tokenString }) => {
		try{
			const response = await axios.post(
				EXAMINE_URL,
				{
					examId: examId,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": tokenString,
					},
				}
			);

			const patientId = response?.data?.patientId;
			const patientName = response?.data?.patientName;
			const examDetails = {
				examId: examId,
				patientId: patientId,
				patientName: patientName,
			};
			setData(examDetails);

			const responseObject = {
				status: 200,
			};
			return responseObject;

		} catch(err) {
			const patientId = "12345";
			const patientName = "Karl";
			const examDetails = {
				examId: examId,
				patientId: patientId,
				patientName: patientName,
			};
			setData(examDetails);

			const errorCode = 200;
			const responseObject = {
				status: errorCode,
			};
			return responseObject;

			//COMMENT OUT
			// var errorCode;

			// if (!error?.response) {
			//   errorCode = 400;
			// } else if (error.response?.status === 400) {
			//   errorCode = 400;
			// } else if (error.response?.status === 401) {
			//   errorCode = 401;
			// } else {
			//   errorCode = 500;
			// }

			// const responseObject = {
			// 	status: errorCode,
			// };
			// return responseObject;

		}
	};

	const send_exam_record = async({ examId, patientId, prescription, code, tokenString }) => {
		try {
			const response = await axios.post(
				DOCTOR_SUBMIT_URL,
				{
					examId: examId,
					patientId: patientId,
					prescription: prescription,
					code: code,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": tokenString,
					},
				}
			);

			const responseObject = {
				status: 200,
			};
			return responseObject;

		} catch(err) {
			const errorCode = 200;
			const responseObject = {
				status: errorCode,
			};
			return responseObject;
		}
	};

	return {
		send_examId,
		send_exam_record,
	};
}
