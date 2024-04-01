import { useForm } from "react-hook-form";
// import "bootstrap/dist/css/bootstrap.min.css";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useQuery,
} from "@chakra-ui/react";
import ExpenseCategorySelector from "./ExpenseCategorySelector";
import ShowModal from "../utills/ShowModal";
import ModalOpenButton from "../utills/ModalOpenButton";
import useModal from "../../hooks/useModal";
import { useEffect, useState } from "react";

import selectAllExpense from "../../hooks/useExpenses";
import useAddExpenses from "../../hooks/useAddExpense";
const AddExpense = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // const { addExpenses, selectAllExpense } = useAddExpenses();
  const onSubmit = async (formData) => {
    let { data, isLoading } = await useAddExpenses(formData);
    if (isLoading) {
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />;
    }
    console.log(data);
  };

  const isFutureDateInvalid = (value) => {
    const enteredDate = new Date(value);
    const currentDate = new Date();
    return enteredDate > currentDate ? "Future dates are invalid" : true;
  };

  // Get Expenses
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(null);

  const { modalOpen, openModal, closeModal } = useModal(false);

  const { isLoading, error, data: expenses } = selectAllExpense();
  if (isLoading) return <Spinner />;

  if (error || !expenses) throw error;

  return (
    <>
      <Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            float: "right",
          }}
        >
          {/* {error && <p className="text-danger">{error.message}</p>}
          {isLoading && <div className="spinner-border"></div>} */}
          <ModalOpenButton onClick={openModal} label="Add Expense" />

          <ShowModal
            isOpen={modalOpen}
            onClose={closeModal}
            title="Add Expense"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isInvalid={Boolean(errors.expense_category_id)}
                className="col-md-6"
              >
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
                  <ExpenseCategorySelector />
                </Select>
                <FormErrorMessage>
                  {errors.expense_category_id &&
                    errors.expense_category_id.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={Boolean(errors.expense_category_item_id)}
                className="col-md-6"
              >
                <FormLabel htmlFor="expense_category_item_id">
                  Expense Sub Category <span className="text-danger">*</span>
                </FormLabel>
                <Select
                  id="expense_category_item_id"
                  placeholder="Select expense sub category"
                  {...register("expense_category_item_id", {
                    required: "Expense sub category is required",
                  })}
                >
                  <option value="65c2f086eab0018780a9efa7">PPPP</option>
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
                      message:
                        "Please enter only numeric values for Expense Amount",
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

              <FormControl isInvalid={Boolean(errors.remarks)}>
                <FormLabel htmlFor="remarks"></FormLabel>
                <Textarea
                  id="remarks"
                  name="remarks"
                  placeholder="Enter Expense remarks"
                  {...register("remarks")}
                ></Textarea>
                <FormErrorMessage>
                  {errors.remarks && errors.remarks.message?.toString()}
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
          </ShowModal>
        </div>
        <br />
        <br />
        <br />
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Expenses Made and Enterd by You.</TableCaption>
            <Thead>
              <Tr>
                <Th>Expense Category</Th>
                <Th>Expense Sub Category</Th>
                <Th isNumeric>Expense Amount</Th>
                <Th>Date</Th>
                <Th>Reamrks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {expenses?.data &&
                expenses.data.map((expense) => (
                  <Tr key={expense._id}>
                    <Td>{expense.expanse_category.name}</Td>
                    <Td>{expense.expanse_category_item.name}</Td>
                    <Td isNumeric>{expense.amount}</Td>
                    <Td></Td>
                    <Td>{expense.remarks}</Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Expense Category</Th>
                <Th>Expense Sub Category</Th>
                <Th isNumeric>Expense Amount</Th>
                <Th>Date</Th>
                <Th>Reamrks</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AddExpense;
