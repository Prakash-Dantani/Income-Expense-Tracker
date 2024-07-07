import { Expenses } from "../entities/Expenses";
import APIClient from "../services/APIClient";

const apiClient = new APIClient<Expenses>("/expense/store");
const useAddExpenses = async (values) => await apiClient.post(values);

export default useAddExpenses;
