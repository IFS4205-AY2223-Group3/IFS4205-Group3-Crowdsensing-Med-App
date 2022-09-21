import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const { logout } = useAuth();
  // const navigate = useNavigate();

  logout();
  // navigate("../b/login");
};
const Patient_Dashboard = () => {
  return (
    <div>
      Welcome Patient
      <button onClick={Signout}>Sign out</button>
    </div>
  );
};
export default Patient_Dashboard;
