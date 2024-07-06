const CheckFutureDate = (value) => {
  const enteredDate = new Date(value);
  const currentDate = new Date();
  return enteredDate > currentDate ? "Future dates are invalid" : true;
};

export default CheckFutureDate;
