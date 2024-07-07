import { Login } from "../entities/Login";
import APIClient from "../services/APIClient";

const apiClient = new APIClient<Login>("/auth/login");

const requestHandle = async (values) => {
  const result = await apiClient.post(values);
  return result;
};

export default requestHandle;
