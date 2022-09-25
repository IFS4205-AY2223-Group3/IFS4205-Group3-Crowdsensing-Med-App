import { Navigate } from "react-router-dom";
import axios from "axios";
import { EXAMINE_URL } from "../api/constants";
import React, { useState, useEffect } from "react";

export function DoctorApi() {
	const setData = ({patientId, patientName}) => {
		localStorage.setItem("patientId", patientId);
		localStorage.setItem("patientName", patientName);
	};

	const send_examId = async({inputExamId}) => {
		try{
			const response = await axios.post(
				EXAMINE_URL,
				JSON.stringify({ inputExamId }),
				{
					headers: { "Content-Type": "application/json" },
				}
			);

			const patientId = response?.data?.patientId;
			const patientName = response?.data?.patientName;
			const patientDetails = {
				patientId: patientId,
				patientName: patientName,
			};
			setData(patientDetails);

			const responseObject = {
				statusCode: 200,
			};
			return responseObject;

		} catch(err) {
			const patientId = "12345";
			const patientName = "Karl";
			const patientDetails = {
				patientId: patientId,
				patientName: patientName,
			};
			setData(patientDetails);

			const errorCode = 200;
			const responseObject = {
				statusCode: errorCode,
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

	return {
		send_examId,
	};
}
