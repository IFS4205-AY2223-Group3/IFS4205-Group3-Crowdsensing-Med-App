import axios from "axios";
import { EXAMINE_URL } from "../api/constants";
import { DOCTOR_SUBMIT_URL } from "../api/constants";
import { DOCTOR_VIEW_HEALTH_RECORDS_URL } from "../api/constants";

export function DoctorApi() {
	const send_examId = async({ examId, tokenString }) => {
		const examDetailsResponse = await axios.post(
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
		)
		.then((response) => {
			const patientId = response?.data?.patientId;
			const patientName = response?.data?.patientName;
			const examDetails = {
				examId: examId,
				patientId: patientId,
				patientName: patientName,
			};
			setData(examDetails);

			return response;
		})
		.catch((err) => {
			// //local testing
			// const patientId = "patient_id";
			// const patientName = "Karl";
			// const examDetails = {
			// 	examId: examId,
			// 	patientId: patientId,
			// 	patientName: patientName,
			// };
			// setData(examDetails);
			
			// const responseObject = {
			// 	status: 200,
			// };

			// return responseObject;

			return createResponseObjectFromError(err);
		});

		return examDetailsResponse;
	};

	const send_exam_record = async({ prescription, code, tokenString }) => {
		const successResponse = await axios.post(
			DOCTOR_SUBMIT_URL,
			{
				prescription: prescription,
				code: code,
			},
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": tokenString,
				},
			}
		)
		.then(response => response)
		.catch((err) => {
			// //local testing			
			// const responseObject = {
			// 	status: 200,
			// };

			// return responseObject;

			return createResponseObjectFromError(err);
		});

		return successResponse;
	};

	const get_records = async({ tokenString }) => {
		const recordsResponse = await axios.get(
			DOCTOR_VIEW_HEALTH_RECORDS_URL,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      }
		)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			// //local testing
      // const response = {
			// 	status: 200,
      //   healthRecords: {
      //     name: "Karl",
      //     dateofbirth: "1999-01-08",
      //     height: 155,
      //     weight: 53,
      //     bloodtype: "B+",
      //     allergies: "None",
      //   },
      //   examRecords: [
      //     {
      //       session_id: "123",
      //       doctor: "Dr Jim",
      //       diagnosis: "High Fever",
      //       prescription: "150mg panadol",
      //       sessiontime: "2022-09-22T16:56:36.636524+08:00",
      //     },
      //     {
      //       session_id: "321",
      //       doctor: "Dr Jim",
      //       diagnosis: "Stomachache",
      //       prescription: "150mg paracetamol",
      //       sessiontime: "2022-09-22T16:57:08.848481+08:00",
      //     },
      //   ],
      // };
			// return response;
			
			return createResponseObjectFromError(err);
		});

		return recordsResponse;
	};

	return {
		send_examId,
		send_exam_record,
		get_records,
	};
}

const setData = ({examId, patientId, patientName}) => {
	localStorage.setItem("examId", examId);
	localStorage.setItem("patientId", patientId);
	localStorage.setItem("patientName", patientName);
};

const createResponseObjectFromError = (err) => {
	const errorStatusCodes = [400, 401, 403, 405, 500];
	const responseObject = {
		status: 0,
		message: "",
	};

	if (!err?.response) {
		responseObject.message = "No Server Response";
	} else if (errorStatusCodes.find((statusCode) => {return err.response?.status === statusCode})) {
		responseObject.status = err.response.status;
		responseObject.message = err.response.data.message;
	} else {
		responseObject.message = "Server encountered an error, please try again.";
	}

	return responseObject;
};
