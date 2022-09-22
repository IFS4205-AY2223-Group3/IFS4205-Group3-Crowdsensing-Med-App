import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const { login } = useAuth();

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [userRole, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");

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

    if (response.statusCode === 200) {
      const role = localStorage.getItem("userRole");
      if (role === "patient") {
        navigate("/patient");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("");
      }
    } else if (response.statusCode === 400) {
      setErrMsg("Invalid Username and Password");
    } else if (response.statusCode === 500) {
      setErrMsg("No Server Response");
    } else {
      setErrMsg("Login Failed. Contact Server Admin");
    }
  };

  return (
    <div className={styles.container}>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Welcome to MediBook</h1>
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
  );
};

export default Login;
