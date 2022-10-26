import React from "react";
import {
  AuthProvider,
  RequireAuth,
  RequireExam,
  RequireInitAuth,
  RequireResearcher,
} from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginHome from "./Login/Login_Home";
import LoginCreateAuth from "./Login/Login_CreateAuth";
import LoginOTP from "./Login/Login_OTP";
import PatientHome from "./Patient-Dashboard/Patient_Home";
import PatientRecords from "./Patient-Dashboard/Patient_Records";
import PatientSession from "./Patient-Dashboard/Patient_Session";
import PatientSettings from "./Patient-Dashboard/Patient_Settings";
import DoctorHome from "./Doctor-Dashboard/Doctor_Home";
import DoctorAssign from "./Doctor-Dashboard/Doctor_Assign";
import DoctorViewRecords from "./Doctor-Dashboard/Doctor_View_Records";
import DoctorExamination from "./Doctor-Dashboard/Doctor_Examination";
import DoctorSettings from "./Doctor-Dashboard/Doctor_Settings";
import ResearcherHome from "./Researcher-Dashboard/Researcher_Home";
import ResearcherData from "./Researcher-Dashboard/Researcher_Data";
import ResearcherSettings from "./Researcher-Dashboard/Researcher_Settings";
import StaffHome from "./Staff-Dashboard/Staff_Home";
import StaffSettings from "./Staff-Dashboard/Staff_Settings";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginHome />} />
          <Route path="login" element={<LoginHome />} />
          <Route
            path="createauth"
            element={
              <RequireInitAuth>
                <LoginCreateAuth />
              </RequireInitAuth>
            }
          />
          <Route
            path="verifyotp"
            element={
              <RequireInitAuth>
                <LoginOTP />{" "}
              </RequireInitAuth>
            }
          />

          <Route
            path="patient"
            element={
              <RequireAuth role="Patient">
                <PatientHome />
              </RequireAuth>
            }
          />

          <Route
            path="patientsetting"
            element={
              <RequireAuth role="Patient">
                <PatientSettings />
              </RequireAuth>
            }
          />
          <Route
            path="generatesession"
            element={
              <RequireAuth role="Patient">
                <PatientSession />
              </RequireAuth>
            }
          />
          <Route
            path="healthrecords"
            element={
              <RequireAuth role="Patient">
                <PatientRecords />
              </RequireAuth>
            }
          />
          <Route
            path="doctor"
            element={
              <RequireAuth role="Doctor">
                <DoctorHome />
              </RequireAuth>
            }
          />

          <Route
            path="assigndoctor"
            element={
              <RequireAuth role="Doctor">
                <DoctorAssign />
              </RequireAuth>
            }
          />
          <Route
            path="doctorsetting"
            element={
              <RequireAuth role="Doctor">
                <DoctorSettings />
              </RequireAuth>
            }
          />
          <Route
            path="submitexamination"
            element={
              <RequireAuth role="Doctor">
                <RequireExam>
                  <DoctorExamination />
                </RequireExam>
              </RequireAuth>
            }
          />
          <Route
            path="doctorviewrecords"
            element={
              <RequireAuth role="Doctor">
                <RequireExam>
                  <DoctorViewRecords />
                </RequireExam>
              </RequireAuth>
            }
          />

          <Route
            path="researcher"
            element={
              <RequireAuth role="Researcher">
                <ResearcherHome />
              </RequireAuth>
            }
          />
          <Route
            path="researchersetting"
            element={
              <RequireAuth role="Researcher">
                <ResearcherSettings />
              </RequireAuth>
            }
          />
          <Route
            path="generatedata"
            element={
              <RequireAuth role="Researcher">
                {/* <RequireResearcher> */}
                <ResearcherData />
                {/* </RequireResearcher> */}
              </RequireAuth>
            }
          />
          <Route
            path="staff"
            element={
              <RequireAuth role="MedicalStaff">
                <StaffHome />
              </RequireAuth>
            }
          />
          <Route
            path="staffsetting"
            element={
              <RequireAuth role="MedicalStaff">
                <StaffSettings />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
