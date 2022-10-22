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
import Login_Home from "./Login/Login_Home";
import Login_CreateAuth from "./Login/Login_CreateAuth";
import Login_OTP from "./Login/Login_OTP";
import Patient_Home from "./Patient-Dashboard/Patient_Home";
import Patient_Records from "./Patient-Dashboard/Patient_Records";
import Patient_Session from "./Patient-Dashboard/Patient_Session";
import Patient_Settings from "./Patient-Dashboard/Patient_Settings";
import Doctor_Home from "./Doctor-Dashboard/Doctor_Home";
import Doctor_Assign from "./Doctor-Dashboard/Doctor_Assign";
import Doctor_View_Records from "./Doctor-Dashboard/Doctor_View_Records";
import Doctor_Examination from "./Doctor-Dashboard/Doctor_Examination";
import Doctor_Settings from "./Doctor-Dashboard/Doctor_Settings";
import Researcher_Home from "./Researcher-Dashboard/Researcher_Home";
import Researcher_Data from "./Researcher-Dashboard/Researcher_Data";
import Researcher_Settings from "./Researcher-Dashboard/Researcher_Settings";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login_Home />} />
          <Route path="login" element={<Login_Home />} />
          <Route
            path="createauth"
            element={
              <RequireInitAuth>
                <Login_CreateAuth />
              </RequireInitAuth>
            }
          />
          <Route
            path="verifyotp"
            element={
              <RequireInitAuth>
                <Login_OTP />{" "}
              </RequireInitAuth>
            }
          />

          <Route
            path="patient"
            element={
              <RequireAuth role="Patient">
                <Patient_Home />
              </RequireAuth>
            }
          />

          <Route
            path="patientsetting"
            element={
              <RequireAuth role="Patient">
                <Patient_Settings />
              </RequireAuth>
            }
          />
          <Route
            path="generatesession"
            element={
              <RequireAuth role="Patient">
                <Patient_Session />
              </RequireAuth>
            }
          />
          <Route
            path="healthrecords"
            element={
              <RequireAuth role="Patient">
                <Patient_Records />
              </RequireAuth>
            }
          />
          <Route
            path="doctor"
            element={
              <RequireAuth role="Doctor">
                <Doctor_Home />
              </RequireAuth>
            }
          />

          <Route
            path="assigndoctor"
            element={
              <RequireAuth role="Doctor">
                <Doctor_Assign />
              </RequireAuth>
            }
          />
          <Route
            path="doctorsetting"
            element={
              <RequireAuth role="Doctor">
                <Doctor_Settings />
              </RequireAuth>
            }
          />
          <Route
            path="submitexamination"
            element={
              <RequireAuth role="Doctor">
                <RequireExam>
                  <Doctor_Examination />
                </RequireExam>
              </RequireAuth>
            }
          />
          <Route
            path="doctorviewrecords"
            element={
              <RequireAuth role="Doctor">
                <RequireExam>
                  <Doctor_View_Records />
                </RequireExam>
              </RequireAuth>
            }
          />

          <Route
            path="researcher"
            element={
              <RequireAuth role="Researcher">
                <Researcher_Home />
              </RequireAuth>
            }
          />
          <Route
            path="researchersetting"
            element={
              <RequireAuth role="Researcher">
                <Researcher_Settings />
              </RequireAuth>
            }
          />
          <Route
            path="generatedata"
            element={
              <RequireAuth role="Researcher">
                <RequireResearcher>
                  <Researcher_Data />
                </RequireResearcher>
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
