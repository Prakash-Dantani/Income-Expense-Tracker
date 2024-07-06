import { TypeOptions, toast } from "react-toastify";

const ShowAlert = (message: string, type: TypeOptions = "success") => {
  toast(message, {
    type,
    closeOnClick: true,
    position: "top-right",
    autoClose: 3000,
    theme: "light",
  });
};

export { ShowAlert };
