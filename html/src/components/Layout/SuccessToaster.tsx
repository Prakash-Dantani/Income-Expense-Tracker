import { useToast } from "@chakra-ui/react";
import React from "react";

const SuccessToaster = ({ msg = "Success." }: { msg?: string }) => {
  const toast = useToast();
  console.log("toaster called");
  return toast({
    title: "Account created.",
    description: msg,
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};

export default SuccessToaster;
