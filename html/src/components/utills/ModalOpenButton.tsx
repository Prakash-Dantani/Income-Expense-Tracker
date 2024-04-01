import { Button } from "@chakra-ui/react";

const ModalOpenButton = ({ onClick, label }) => {
  return (
    <Button
      className="modal-button"
      variant={"solid"}
      color={"white"}
      bg={"green.500"}
      _hover={{
        bg: "yellow.500",
      }}
      size={"md"}
      mr={4}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default ModalOpenButton;
