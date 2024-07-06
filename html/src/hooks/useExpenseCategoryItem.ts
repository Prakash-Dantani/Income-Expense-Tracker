import { useQuery } from "@tanstack/react-query";
import { ExpenseCategoryItem } from "../entities/ExpenseCategoryItem";
import APIClient from "../services/APIClient";
import ms from "ms";
import expenseCategoryItems from "../data/expenseCategoryItems";

const apiClient = new APIClient<ExpenseCategoryItem>(
  "/expense_category_item/index"
);
const useExpenseCategoryItem = () =>
  useQuery({
    queryKey: ["expense_category_item"],
    queryFn: apiClient.getAll,
    staleTime: ms("24H"),
    initialData: expenseCategoryItems,
  });

export default useExpenseCategoryItem;
