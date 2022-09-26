import { Navigate } from "react-router-dom";
import axios from "axios";
import { EXAMINE_URL } from "../api/constants";
import { DOCTOR_SUBMIT_URL } from "../api/constants";
import React, { useState, useEffect } from "react";

export function DoctorApi() {
	const setData = ({examId, patientId, patientName}) => {
		localStorage.setItem("examId", examId); //not working, will check again
		localStorage.setItem("patientId", patientId);
		localStorage.setItem("patientName", patientName);
	};

	const send_examId = async({examId}) => {
		try{
			const response = await axios.post(
				EXAMINE_URL,
				JSON.stringify({ examId }),
				{
					headers: {
						"Content-Type": "application/json",
						// "Authorization": " Token 9bbekjsfjksdbkfbdsjfskj"  //note the spaces
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
				statusCode: 200,
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
				statusCode: errorCode,
				// errorMessage: "There was an error, please try again.",
			};
			return responseObject;

			//COMMENT OUT
			// var errorCode;
			// var errorMessage = "There was an error, please try again.";

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
			// 	statusCode: errorCode,
			// 	errorMessage: errorMessage,
			// };
			// return responseObject;

		}
	};

	const send_exam_record = async({ examId, patientId, prescription, code }) => {
		console.log(prescription);

		try {
			const response = await axios.post(
				DOCTOR_SUBMIT_URL,
				JSON.stringify({ examId, patientId, prescription, code }),
				{
					headers: {
						"Content-Type": "application/json",
						// "Authorization": " Token 9bbekjsfjksdbkfbdsjfskj"  //note the spaces
					},
				}
			);

			const responseObject = {
				statusCode: 200,
			};
			return responseObject;

		} catch(err) {
			const errorCode = 200;
			const responseObject = {
				statusCode: errorCode,
				// errorMessage: "There was an error, please try again.",
			};
			return responseObject;
		}
	};

	return {
		send_examId,
		send_exam_record,
	};
}
