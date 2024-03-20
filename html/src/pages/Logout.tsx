import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("user");
  return navigate("/");
};

export default Logout;
