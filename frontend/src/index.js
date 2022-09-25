import React from "react";
import { AuthProvider, RequireAuth } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./Login/Login";
import Patient_Dashboard from "./Patient/Patient_Dashboard";
import Doctor_Dashboard from "./Doctor/Doctor_Dashboard";
import Generate_Session from "./Patient/Generate_Session";
import View_Records from "./Patient/View_Records";
import Allow_Session from "./Patient/Allow_Session";

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
            path="viewrecords"
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
