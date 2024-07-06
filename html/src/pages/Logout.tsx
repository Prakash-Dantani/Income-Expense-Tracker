import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("user");
  return navigate("/", {
    state: { messsage: "User is Logout.", type: "error" },
  });
};

export default Logout;
