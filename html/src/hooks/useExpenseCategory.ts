import { useQuery } from "@tanstack/react-query";
import { ExpenseCategory } from "../entities/ExpenseCategory";
import APIClient from "../services/APIClient";
import ms from "ms";
import expenseCategories from "../data/expenseCategories";

const apiClient = new APIClient<ExpenseCategory>("/expense_category/index");
const useExpenseCategory = () =>
  useQuery({
    queryKey: ["expense_category"],
    queryFn: apiClient.getAll,
    staleTime: ms("1m"),
    initialData: expenseCategories,
  });

export default useExpenseCategory;
