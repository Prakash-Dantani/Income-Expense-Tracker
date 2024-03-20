import { useForm } from "react-hook-form";
import useExpenses from "../../hooks/useExpenses";
// import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

const AddExpense = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    let { data } = await useExpenses(formData);
    console.log(data);
  };

  const isFutureDateInvalid = (value) => {
    const enteredDate = new Date(value);
    const currentDate = new Date();
    return enteredDate > currentDate ? "Future dates are invalid" : true;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.expense_category_id)}>
          <FormLabel htmlFor="expense_category_id">
            Expense Category <span className="text-danger">*</span>
          </FormLabel>
          <Select
            name="expense_category_id"
            id="expense_category_id"
            placeholder="Select Expense Category"
            size={"md"}
            {...register("expense_category_id", {
              required: "Expense category is required",
            })}
          >
            <option value="ddd">ffff</option>
          </Select>
          <FormErrorMessage>
            {errors.expense_category_id &&
              errors.expense_category_id.message?.toString()}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.expense_category_item_id)}>
          <FormLabel htmlFor="expense_category_item_id">
            Expense Category <span className="text-danger">*</span>
          </FormLabel>
          <Select
            id="expense_category_item_id"
            placeholder="Select expense sub category"
            {...register("expense_category_item_id", {
              required: "Expense sub category is required",
            })}
          >
            <option value="">PPPP</option>
          </Select>
          <FormErrorMessage>
            {errors.expense_category_item_id &&
              errors.expense_category_item_id.message?.toString()}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.amount)}>
          <FormLabel htmlFor="amount">
            Expense Amount <span className="text-danger">*</span>
          </FormLabel>
          <Input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter Expense Amount"
            {...register("amount", {
              required: "Expense Amount is required",
              min: {
                value: 1,
                message: "Expense Amount must be greater than 0 (Zero).",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter only numeric values for Expense Amount",
              },
            })}
          />
          <FormErrorMessage>
            {errors.amount && errors.amount.message?.toString()}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.date)}>
          <FormLabel htmlFor="date">
            Date <span className="text-danger">*</span>
          </FormLabel>
          <Input
            type="date"
            id="date"
            name="date"
            placeholder="Select Expense Date"
            {...register("date", {
              required: "Expense date is required.",
              validate: {
                futureDate: isFutureDateInvalid,
                dateFormat: (value) =>
                  !isNaN(Date.parse(value)) || "Invalid date format",
              },
            })}
          />
          <FormErrorMessage>
            {errors.date && errors.date.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          color={"white"}
          bg={"blue.400"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Add Expense
        </Button>
      </form>
    </>
  );
};

export default AddExpense;
