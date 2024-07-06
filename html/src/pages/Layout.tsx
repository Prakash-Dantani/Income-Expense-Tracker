import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { NavigateWithAlertData } from "../components/utills/ShowAlertData";
const Layout = () => {
  const [token, setToken] = useState("");
  console.log("tt" + token);
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      setToken(token);
    }
  }, []);

  NavigateWithAlertData();
  return (
    <>
      <Header />
      {/* {token && <Navbar />} */}
      <Navbar />

      <ToastContainer />

      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};
export default Layout;
