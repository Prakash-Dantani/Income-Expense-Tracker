import { jwtDecode } from "jwt-decode";

const validateJwt = (token) => {
  try {
    let decodedToken = jwtDecode(token);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 > currentDate.getTime())
      return { isLogin: true, message: "User is Loggdin." };

    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("user");
    return { isLogin: false, message: "User is Loggdout." };
  } catch (err) {
    return { isLogin: false, message: "User is Loggdout." };
  }
};

export default validateJwt;
