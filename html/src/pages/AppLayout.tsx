import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import NavHeader from "../components/Layout/NavHeader";
import { useEffect } from "react";
import validateJwt from "../services/ValidateJwt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavigateWithAlertData } from "../components/utills/ShowAlertData";

const AppLayout = () => {
  const navigate = useNavigate();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    if (!token) {
      return navigate("/", {
        state: { messsage: "User is Logout.", type: "error" },
      });
    }

    const isValid = validateJwt(token);
    if (!isValid) {
      return navigate("/", {
        state: { messsage: "User is Logout.", type: "error" },
      });
    }
  }, []);

  NavigateWithAlertData();

  return (
    <>
      <Header />
      {/* <NavHeader /> */}
      <ToastContainer />

      <>
        <Grid
          templateAreas={{
            base: `"main sidebar"`,
            lg: `"sidebar main"`,
            sm: `"sidebar main"`,
          }}
          templateColumns={{ base: "1fr", lg: "20vw" }}
          padding={5}
        >
          {/* <Show above="lg"> */}
          <GridItem area="sidebar">
            <Sidebar />
          </GridItem>
          {/* </Show> */}

          <GridItem area="main">
            <Outlet />
          </GridItem>
        </Grid>
      </>
    </>
  );
};
export default AppLayout;
