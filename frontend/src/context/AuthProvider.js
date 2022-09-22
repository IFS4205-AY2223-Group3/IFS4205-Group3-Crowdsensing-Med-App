import { Navigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_URL } from "../api/constants";
import React, { useState, useEffect } from "react";

const Context = React.createContext();

export function useAuth() {
  const setData = ({ accessToken, userRole, name, userId }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("name", name);
    localStorage.setItem("userId", userId);
  };

  const login = async ({ user, pwd, userRole }) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd, userRole }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // Getting response
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.userRole;
      const name = response?.data?.name;
      const userId = response?.data?.userId;

      const auth = {
        accessToken: accessToken,
        userRole: role,
        name: name,
        userId: userId,
      };
      setData(auth);

      const responseObject = {
        statusCode: 200,
      };
      return responseObject;
    } catch (error) {
      const accessToken = "access_token";
      const role = "doctor";
      const name = "John";
      const userId = "user_id";

      const auth = {
        accessToken: accessToken,
        userRole: role,
        name: name,
        userId: userId,
      };
      var errorCode = 200;
      setData(auth);

      // COMMENT OUT
      //   var errorCode;

      //   if (!error?.response) {
      //     errorCode = 400;
      //   } else if (error.response?.status === 400) {
      //     errorCode = 400;
      //   } else if (error.response?.status === 401) {
      //     errorCode = 401;
      //   } else {
      //     errorCode = 500;
      //   }

      const errorObject = {
        statusCode: errorCode,
      };
      return errorObject;
    }
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
  };

  return {
    login,
    logout,
  };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");

    if (accessToken && userRole && name && userId) {
      const temp = {
        accessToken: accessToken,
        userRole: userRole,
        name: name,
        userId: userId,
      };
      setAuth(temp);
    }
  }, []);

  return <Context.Provider value={auth}>{children} </Context.Provider>;
}

export function RequireAuth({ children, role }) {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  if (accessToken && userRole && userRole === role) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
