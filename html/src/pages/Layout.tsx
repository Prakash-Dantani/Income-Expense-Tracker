import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};
export default Layout;
