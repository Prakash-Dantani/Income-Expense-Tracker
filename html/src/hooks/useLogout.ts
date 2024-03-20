const logout = () => {
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("user");
  alert("User Successfully Logged Out.");
  window.location.href = "/";
};

export default logout;
