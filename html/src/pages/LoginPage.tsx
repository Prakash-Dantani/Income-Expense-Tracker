"use client";

import { useForm } from "react-hook-form";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import useLoggedInStore from "../hooks/useAuth";
import validateJwt from "../services/ValidateJwt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import requestHandle from "../hooks/useLogin";

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const useLoginStore = useLoggedInStore();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    let { data, token } = await requestHandle(values);

    useLoginStore.login(data, token);
    const valid_jwt = validateJwt(token);
    if (valid_jwt.isLogin) {
      alert(valid_jwt.message);
      return navigate("/app/home");
    }
    alert(valid_jwt.message);
  };

  useEffect(() => {
    setInterval(() => {
      const { isLogin, message } = validateJwt(
        localStorage.getItem("x-auth-token")
      );
      if (!isLogin) {
        alert(message);
        return navigate("/");
      }
    }, 200000);
  }, []);

  return (
    <Flex
      minH={"100%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Email or User Name</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "This is required",
                  //   minLength: {
                  //     value: 4,
                  //     message: "Minimum length should be 4",
                  //   },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              color={"white"}
              bg={"blue.400"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
