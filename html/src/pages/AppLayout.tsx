import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import NavHeader from "../components/Layout/NavHeader";
const AppLayout = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Header />
      <NavHeader />
      <>
        <Grid
          templateAreas={{ base: `"main"`, lg: `"sidebar main"` }}
          templateColumns={{ base: "1fr", lg: "20vw" }}
          padding={5}
        >
          <Show above="lg">
            <GridItem area="sidebar">
              <Sidebar />
            </GridItem>

            <GridItem>
              <Outlet />
            </GridItem>
          </Show>
        </Grid>
      </>
    </>
  );
};
export default AppLayout;
