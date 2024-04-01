import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import ContentPage from "../pages/UserHomePage";
import AppLayout from "../pages/AppLayout";
import AddExpense from "../components/expense/AddExpense";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <ContentPage /> },
      { path: "addExpense", element: <AddExpense /> },
    ],
  },
]);

export default router;
