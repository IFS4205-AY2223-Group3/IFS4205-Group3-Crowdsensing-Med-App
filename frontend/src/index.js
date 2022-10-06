import React from "react";
import { AuthProvider, RequireAuth } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./Login/Login";
import Patient_Home from "./Patient-Dashboard/Patient_Home";
import Patient_Records from "./Patient-Dashboard/Patient_Records";
import Patient_Session from "./Patient-Dashboard/Patient_Session";
import Doctor_Dashboard from "./Doctor/Doctor_Dashboard";
import Examine from "./Doctor/Examine";
import Submit_Examination from "./Doctor/Submit_Examination";
import Doctor_View_Records from "./Doctor/Doctor_View_Records";
import Doctor_Home from "./Doctor-Dashboard/Doctor_Home";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="doctorhome" element={<Doctor_Home />} />

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
                <Doctor_Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="assigndoctor"
            element={
              <RequireAuth role="doctor">
                <Examine />
              </RequireAuth>
            }
          />
          <Route
            path="submitexamination"
            element={
              <RequireAuth role="doctor">
                <Submit_Examination />
              </RequireAuth>
            }
          />
          <Route
            path="doctorviewrecords"
            element={
              <RequireAuth role="doctor">
                <Doctor_View_Records />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
