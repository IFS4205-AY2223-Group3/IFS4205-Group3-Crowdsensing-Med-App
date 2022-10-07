import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_URL, LOGOUT_URL } from "../api/constants";
import React, { useState, useEffect } from "react";

const Context = React.createContext();

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
      });

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

      const responseObject = {
        statusCode: 200,
      };
      return responseObject;
    } catch (error) {
      // const accessToken = "access_token"; //comment out
      // const role = "patient";
      // const name = "Oscar";

      // const auth = {
      //   accessToken: accessToken,
      //   userRole: role,
      //   name: name,
      // };
      // var errorCode = 200;
      // setData(auth); //comment out

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
        statusCode: errorCode,
      };
      return errorObject;
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

  if (accessToken && userRole && userRole === role) {
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

  if (examId && patientName && userRole === "doctor") {
    return children;
  } else {
    return <Navigate to="/doctor" replace />;
  }
}
