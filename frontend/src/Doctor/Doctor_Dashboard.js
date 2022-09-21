import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const { logout } = useAuth();
  // const navigate = useNavigate();

  logout();
};

const Doctor_Dashboard = () => {
  return (
    <div>
      Welcome Doctor
      <button onClick={Signout}>Sign out</button>
    </div>
  );
};
export default Doctor_Dashboard;
