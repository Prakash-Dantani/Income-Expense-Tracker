import { ExpenseCategory } from "../../entities/ExpenseCategory";
import useExpenseCategory from "../../hooks/useExpenseCategory";

const ExpenseCategorySelector = () => {
  const { data, error } = useExpenseCategory();
  console.log(data);
  if (error) return null;
  if (error || !Array.isArray(data)) return null; // Check if data is an array
  return (
    <>
      {data?.map((category: ExpenseCategory) => (
        <option key={category.name} value={category._id}>
          {category.name}
        </option>
      ))}
    </>
  );
};

export default ExpenseCategorySelector;
