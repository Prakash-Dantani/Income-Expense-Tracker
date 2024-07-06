import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate(); // Move useNavigate inside the custom hook
  const logout = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("user");
    alert("User Successfully Logged Out.");
    // window.location.href =x` "/";
    navigate("/", {
      state: { message: "User Successfully Logged Out.", type: "error" }, // Fixed typo in "message" key
    });
  };

  return logout;
};

export default useLogout;
