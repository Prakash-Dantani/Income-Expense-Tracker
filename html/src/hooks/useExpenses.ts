import { Expenses } from "../entities/Expenses";
import APIClient from "../services/APIClient";

const apiClient = new APIClient<Expenses>("/expense/store");

const useExpenses = async (values) => {
  const result = await apiClient.post(values);
  return result;
};

export default useExpenses;
