import { useQuery } from "@tanstack/react-query";
import { ExpenseCategory } from "../entities/ExpenseCategory";
import APIClient from "../services/APIClient";
import ms from "ms";
import expenseCategories from "../data/expenseCategories";

const apiClient = new APIClient<ExpenseCategory>("/expense_category/index");

// const useExpenseCategory = async () => {
//   const result = await apiClient.selectAll();
//   return { result };
// };

const useExpenseCategory = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: ms("24H"),
    initialData: expenseCategories,
  });

export default useExpenseCategory;
