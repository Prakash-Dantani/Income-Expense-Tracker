import { create } from "zustand";
import { UserData } from "../entities/Login";

const $LOCAL_LOGGEDIN_KEY = "x-auth-token";

const getInitialLoggedIn = () => {
  const loggedIn = localStorage.getItem($LOCAL_LOGGEDIN_KEY) || false;
  return loggedIn;
};

const useLoggedInStore = create((set) => ({
  loggedIn: getInitialLoggedIn(),
  user: {},
  login: (userData: UserData, token: string) =>
    set(() => {
      localStorage.setItem($LOCAL_LOGGEDIN_KEY, token);
      localStorage.setItem("user", JSON.stringify(userData));
      return {
        loggedIn: true,
        user: userData,
      };
    }),
  logout: () =>
    set(() => {
      localStorage.removeItem($LOCAL_LOGGEDIN_KEY);
      localStorage.removeItem("user");
      return {
        loggedIn: false,
        user: {},
      };
    }),
}));

export default useLoggedInStore;
