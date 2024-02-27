import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/image/logo/logo.png";
import LinkElement from "../elements/LinkElement";
import ColorModeSwitch from "../ColorModeSwitch";

const Header = () => {
  return (
    <>
      <HStack padding={5}>
        <LinkElement to={"/"}>
          <Image src={logo} boxSize="60px" objectFit={"cover"} marginLeft={2} />
        </LinkElement>
        <Text
          width={"100%"}
          style={{ alignContent: "center", fontSize: 30, paddingLeft: 10 }}
        >
          Income Expense Tracker
        </Text>
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default Header;
