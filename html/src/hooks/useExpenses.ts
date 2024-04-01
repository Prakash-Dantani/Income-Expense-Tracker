import { useQuery } from "@tanstack/react-query";
import { Expenses } from "../entities/Expenses";
import APIClient from "../services/APIClient";
import ms from "ms";

// const UseExpenses = () => {
//   // const addExpenses = async (values) => {
//   //   const apiClient = new APIClient<Expenses>("/expense/store");
//   //   const result = await apiClient.post(values);
//   //   return result;
//   // };

//   // const selectAllExpense = () => {
//   //   const apiClient = new APIClient<Expenses>("/expense/index");
//   //   const result = useQuery({
//   //     queryKey: ["expenses"],
//   //     queryFn: apiClient.getAll,
//   //     staleTime: ms("24H"),
//   //   });
//   //   return result;
//   // };
//   return { addExpenses, selectAllExpense };
// };

const apiClient = new APIClient<Expenses>("/expense/index");
const selectAllExpense = () =>
  useQuery({
    queryKey: ["expenses"],
    queryFn: apiClient.getAll,
    staleTime: ms("24H"),
  });

export default selectAllExpense;
