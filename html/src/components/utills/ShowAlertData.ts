import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShowAlert } from "./ShowAlert";

const NavigateWithAlertData = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      ShowAlert(location.state.message, location.state.type);
    }
  }, []);
};

export { NavigateWithAlertData };
