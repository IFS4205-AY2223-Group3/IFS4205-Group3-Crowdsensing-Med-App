import React from "react";
import { AuthProvider, RequireAuth, RequireExam } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./Login/Login";
import Patient_Home from "./Patient-Dashboard/Patient_Home";
import Patient_Records from "./Patient-Dashboard/Patient_Records";
import Patient_Session from "./Patient-Dashboard/Patient_Session";
import Doctor_Home from "./Doctor-Dashboard/Doctor_Home";
import Doctor_Assign from "./Doctor-Dashboard/Doctor_Assign";
import Doctor_View_Records from "./Doctor-Dashboard/Doctor_View_Records";
import Doctor_Examination from "./Doctor-Dashboard/Doctor_Examination";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route
            path="patient"
            element={
              <RequireAuth role="patient">
                <Patient_Home />
              </RequireAuth>
            }
          />
          <Route
            path="generatesession"
            element={
              <RequireAuth role="patient">
                <Patient_Session />
              </RequireAuth>
            }
          />
          <Route
            path="healthrecords"
            element={
              <RequireAuth role="patient">
                <Patient_Records />
              </RequireAuth>
            }
          />
          <Route
            path="doctor"
            element={
              <RequireAuth role="doctor">
                <Doctor_Home />
              </RequireAuth>
            }
          />

          <Route
            path="assigndoctor"
            element={
              <RequireAuth role="doctor">
                <Doctor_Assign />
              </RequireAuth>
            }
          />
          <Route
            path="submitexamination"
            element={
              <RequireAuth role="doctor">
                <RequireExam>
                  <Doctor_Examination />
                </RequireExam>
              </RequireAuth>
            }
          />
          <Route
            path="doctorviewrecords"
            element={
              <RequireAuth role="doctor">
                <RequireExam>
                  <Doctor_View_Records />
                </RequireExam>
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
