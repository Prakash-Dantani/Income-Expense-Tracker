import useExpenseCategoryItem from "../../hooks/useExpenseCategoryItem";

const ExpenseCategoryItemSelector = () => {
  const { data, error } = useExpenseCategoryItem();
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

export default ExpenseCategoryItemSelector;
