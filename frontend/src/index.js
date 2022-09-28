import React from "react";
import { AuthProvider, RequireAuth } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./Home/Homepage";
import CustomBootstrapStyle from "./Home/CustomBootstrapStyle";
import Login from "./Login/Login";
import Patient_Dashboard from "./Patient/Patient_Dashboard";
import Doctor_Dashboard from "./Doctor/Doctor_Dashboard";
import Examine from "./Doctor/Examine";
import Submit_Examination from "./Doctor/Submit_Examination";
import Doctor_View_Records from "./Doctor/Doctor_View_Records";
import Generate_Session from "./Patient/Generate_Session";
import View_Records from "./Patient/View_Records";
import Allow_Session from "./Patient/Allow_Session";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CustomBootstrapStyle />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route
            path="patient"
            element={
              <RequireAuth role="patient">
                <Patient_Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="generatesession"
            element={
              <RequireAuth role="patient">
                <Generate_Session />
              </RequireAuth>
            }
          />
          <Route
            path="patientviewrecords"
            element={
              <RequireAuth role="patient">
                <View_Records />
              </RequireAuth>
            }
          />
          <Route
            path="allowsession"
            element={
              <RequireAuth role="patient">
                <Allow_Session />
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
