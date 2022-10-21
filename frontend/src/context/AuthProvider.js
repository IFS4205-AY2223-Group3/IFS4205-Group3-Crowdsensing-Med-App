import { Navigate } from "react-router-dom";
import axios from "axios";
import https from "https";
import { LOGIN_URL, LOGOUT_URL } from "../api/constants";
import React, { useState, useEffect } from "react";

const Context = React.createContext();
const ca_text = '-----BEGIN CERTIFICATE-----'
+ 'MIIDRzCCAi+gAwIBAgIUOrt6SnF4rrFMcVA6tJPPZ7R9CoIwDQYJKoZIhvcNAQEL'
+ 'BQAwMzExMC8GA1UEAwwoaWZzNDIwNS1ncm91cDMtYmFja2VuZC1pLmNvbXAubnVz'
+ 'LmVkdS5zZzAeFw0yMjEwMTAwMzUzMjBaFw0zMjEwMDcwMzUzMjBaMDMxMTAvBgNV'
+ 'BAMMKGlmczQyMDUtZ3JvdXAzLWJhY2tlbmQtaS5jb21wLm51cy5lZHUuc2cwggEi'
+ 'MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDVkn0Co8bW/1gX8zeEGW8zZ84L'
+ 'jZqbC3/6pGV5/pHhLalFpG/wkiCJlhbD1onWN7NFnMFdtiozmXpLmFEjrPjeAwlg'
+ 'tktNjIW0zk1HwbgJLIuDa0weHLzx54DMW0crr0IyB61f2XgCBIztE5RzLemWrf8t'
+ '68U12FbBQLx0w3N3tiv+pbZWywxVHbu+SOmclgj1XHMQbTJjpAt+sDxqOx7Y80IF'
+ 'Xf71TzBq1Gai5h9IZweLNrFRMd/SHj9lkM+8i7OVkdWTI4FiL5m1Rp2V1VlseuBb'
+ 'C06CZllLlZ4M4bFy5kJHTvXnBpbqO0Nqi521pFsB8iLXUaQJdlzlb0tCmMllAgMB'
+ 'AAGjUzBRMB0GA1UdDgQWBBQRiAkjDdISxnkLKZUuHhZsQZTRiTAfBgNVHSMEGDAW'
+ 'gBQRiAkjDdISxnkLKZUuHhZsQZTRiTAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3'
+ 'DQEBCwUAA4IBAQAoodNteMdbAv3APhbRAXD0Rr6n83n9ThmGMdNMxeVpc+P1qgvY'
+ 'JByGDpMlNozaUpQK1zOP6P2eeEWTPun8GaMRkuM/puvuOK1AbxW5I2CY+ckPs0mx'
+ 'DZtV+YBuwmsNFcQgA9J3s7kQZEfDAEJ2akvEblnRFkjWJo1y3+z9BeMgQR5hBsK7'
+ 'BaQCCcPR1vJ+jqPpOtmaPnWLo9yMygwOfOzqL9aHvyhAG4CVJoUc1odTxUCwFyR3'
+ '678SbnkwXdNk9VHO8S9v83mOzsFXZ/GTcGKkmtSDcH/KwVJzJ6xAoZxguT6O69BO'
+ '0DvjTMvt1kxqS7gDZquz++EtoCsBHSJc3TI+'
+ '-----END CERTIFICATE-----';

const httpsAgent = new https.Agent({
  ca: ca_text
});

export function useAuth() {
  const setData = ({ accessToken, userRole, name }) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("userRole", userRole);
    sessionStorage.setItem("name", name);
  };

  const login = async ({ user, pwd, userRole }) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: pwd,
        role: userRole,
      }, {
        httpsAgent
      }
      );
      // Getting response
      const accessToken = response?.data?.token;
      const role = response?.data?.role;
      const name = response?.data?.name;

      const auth = {
        accessToken: accessToken,
        userRole: role,
        name: name,
      };
      setData(auth);

      return response;
    } catch (error) {
      return error.response;
    }
  };

  const logout = async () => {
    const tokenString = " Token " + sessionStorage.getItem("accessToken");

    const logoutResponse = await axios
      .get(LOGOUT_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenString,
        },
      }, {
        httpsAgent
      })
      .then(function (response) {
        sessionStorage.clear();
        return response;
      })
      .catch(function (error) {
        // //local testing
        // var errorCode = 200;
        // sessionStorage.clear();

        var errorCode;
        if (!error?.response) {
          errorCode = 400;
        } else if (error.response?.status === 400) {
          errorCode = 400;
        } else if (error.response?.status === 401) {
          errorCode = 401;
        } else {
          errorCode = 500;
        }

        const errorObject = {
          status: errorCode,
        };
        return errorObject;
      });

    return logoutResponse;
  };

  return {
    login,
    logout,
  };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const userRole = sessionStorage.getItem("userRole");
    const name = sessionStorage.getItem("name");

    if (accessToken && userRole && name) {
      const temp = {
        accessToken: accessToken,
        userRole: userRole,
        name: name,
      };
      setAuth(temp);
    }
  }, []);

  return <Context.Provider value={auth}>{children} </Context.Provider>;
}

/* This Function checks that user is authenticated to access role page*/
export function RequireAuth({ children, role }) {
  const accessToken = sessionStorage.getItem("accessToken");
  const userRole = sessionStorage.getItem("userRole");
  const isVerified = sessionStorage.getItem("isVerified");

  if (accessToken && isVerified && userRole === role) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

/* This Function checks that user is init authenticated to access verify otp and create auth page*/
export function RequireInitAuth({ children }) {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

/* This Function checks that the user is authenticated to access Examination Page */
export function RequireExam({ children }) {
  const examId = sessionStorage.getItem("examId");
  const patientName = sessionStorage.getItem("patientName");
  const userRole = sessionStorage.getItem("userRole");

  if (examId && patientName && userRole === "Doctor") {
    return children;
  } else {
    return <Navigate to="/doctor" replace />;
  }
}
