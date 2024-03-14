"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Center,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import NavLinks from "./NavLinks";
import { CloseIcon, HamburgerIcon, UnlockIcon } from "@chakra-ui/icons";
import LinkElement from "../elements/LinkElement";

const Links = ["Dashboard", "Projects", "Team", "Contact Us", "About Us"];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box px={4}>
        {/* <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}> */}
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLinks key={link}>{link}</NavLinks>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <LinkElement to={"login"}>
                  <Button
                    variant={"solid"}
                    color={"white"}
                    bg={"blue.400"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    size={"sm"}
                    mr={4}
                    leftIcon={<UnlockIcon />}
                  >
                    Login
                  </Button>
                </LinkElement>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://media.licdn.com/dms/image/D4D03AQFbWNb7WurpnA/profile-displayphoto-shrink_100_100/0/1704605586826?e=1714608000&v=beta&t=Sa4PPCpmgj7u8ty4tkzXYRqFXgvBdL7FGwWj1jjkaEQ"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://media.licdn.com/dms/image/D4D03AQFbWNb7WurpnA/profile-displayphoto-shrink_100_100/0/1704605586826?e=1714608000&v=beta&t=Sa4PPCpmgj7u8ty4tkzXYRqFXgvBdL7FGwWj1jjkaEQ"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLinks key={link}>{link}</NavLinks>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
