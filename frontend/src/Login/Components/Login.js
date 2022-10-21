import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import logo from "../../imports/medibook.png";
import styles from "../Login.module.css";
import PopUp from "../../Components/PopUp";

export default function Login() {
  const { login } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [userRole, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isErrPopUp, setIsErrPopUp] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user: user,
      pwd: pwd,
      userRole: userRole,
    };

    const response = await login(data);

    if (response.status === 200) {
      if (response.data.hasDevice) {
        navigate("/verifyotp");
      } else if (!response.data.hasDevice) {
        navigate("/createauth");
      } else {
        navigate("/login");
      }
    } else if (response.status === 400) {
      setErrMsg(response.data.message);
      setIsErrPopUp(true);
    } else if (response.status === 500) {
      setErrMsg(response.data.message);
      setIsErrPopUp(true);
    } else {
      setErrMsg(response.data.message);
      setIsErrPopUp(true);
    }
  };

  const togglePopUp = () => {
    setIsErrPopUp(!isErrPopUp);
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <section>
          {isErrPopUp ? <PopUp toggle={togglePopUp} msg={errMsg} /> : null}
          <img src={logo} className={styles.logo} alt="logo" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <label htmlFor="role">Role: </label>
            <select
              value={userRole}
              name="roleDropdown"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option disabled selected value="">
                Select Role
              </option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="medicalStaff">Medical Helper</option>
              <option value="researcher">Researcher</option>
            </select>
            <button>Sign In</button>
          </form>
        </section>
      </div>
    </React.Fragment>
  );
}
