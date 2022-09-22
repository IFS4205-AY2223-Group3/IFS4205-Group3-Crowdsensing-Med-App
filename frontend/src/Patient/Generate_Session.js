import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from "./Patient_Dashboard.module.css";

const Generate_Session = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  return (
    <div>
      <h2>Generating Session {name}</h2>
    </div>
  );
};
export default Generate_Session;
