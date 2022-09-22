import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from "./Doctor_Dashboard.module.css";

const Doctor_Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const Signout = async () => {
    const { logout } = useAuth();
    logout();
    navigate("/login");
  };

  const Examine = async () => {};

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Welcome {name}!</h2>
      <div class={styles.buttons_container}>
        <div class="examine">
          <button className={styles.button} onClick={Examine}>
            Examine
          </button>
        </div>
        <div class="signout">
          <button className={styles.button} onClick={Signout}>
            Sign out
          </button>
        </div>{" "}
      </div>
    </div>
  );
};
export default Doctor_Dashboard;
