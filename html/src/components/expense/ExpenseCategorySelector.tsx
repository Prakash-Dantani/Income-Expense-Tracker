import useExpenseCategory from "../../hooks/useExpenseCategory";

const ExpenseCategorySelector = () => {
  const { data, error } = useExpenseCategory();
  if (error) return null;
  return (
    <>
      {data?.results &&
        data.results.map((category) => (
          <option key={category.name} value={category._id}>
            {category.name}
          </option>
        ))}
    </>
  );
};

export default ExpenseCategorySelector;
