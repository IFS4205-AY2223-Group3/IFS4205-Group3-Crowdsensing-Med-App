import React from "react";
import "./index.css";
import { AuthProvider, RequireAuth } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Patient_Dashboard from "./Patient/Patient_Dashboard";
import Doctor_Dashboard from "./Doctor/Doctor_Dashboard";
import { createRoot } from "react-dom/client";

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
