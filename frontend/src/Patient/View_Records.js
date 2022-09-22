import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const View_Records = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  return (
    <div>
      <h2>Viewing {name}'s Records</h2>
    </div>
  );
};
export default View_Records;
