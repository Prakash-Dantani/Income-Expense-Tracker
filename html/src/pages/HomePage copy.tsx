import { Grid, GridItem, Show } from "@chakra-ui/react";
import Sidebar from "../components/Layout/Sidebar";
import ContentPage from "./UserHomePage";
// import { useEffect, useState } from "react";

// interface UserProps {
//   id: number;
//   name: String;
// }
const HomePage = () => {
  // const [user, setUsers] = useState<UserProps[]>();
  // useEffect(() => {
  //   getUser();
  // }, []);
  // const getUser = async () => {
  //   try {
  //     const res = await fetch("https://jsonplaceholder.typicode.com/users");
  //     const user: UserProps[] = await res.json();
  //     setUsers(user);
  //   } catch (e) {}
  // };
  // console.log("user-->", user);
  return (
    <>
      <Grid
        templateAreas={{ base: `"main"`, lg: `"sidebar main"` }}
        templateColumns={{ base: "1fr", lg: "200px" }}
      >
        <Show above="lg">
          <GridItem area="sidebar">
            <Sidebar />
          </GridItem>
        </Show>

        <GridItem area="main">
          <ContentPage />
          {/* {user?.map((u) => UserCard(u))} */}
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;

// const UserCard = ({ id, name }: UserProps) => {
//   return (
//     <div>
//       <h1>ID : {id}</h1>
//       <h1>Name : {name}</h1>
//     </div>
//   );
// };
