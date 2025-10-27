import "./App.css";
import React from "react";
import TableSelection from "./components/TableSelection";
import QRScanner from "./components/QRScanner";
import CustomerInfo from "./components/CustomerInfo";
import Categories from "./components/Categories";
import Menu from "./components/Menu";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./components/Layout/AppLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TableSelection />,
    },
    {
      path: "/qr-scan",
      element: <QRScanner />,
    },
    {
      path: "/customer-info",
      element: <CustomerInfo />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/:categoryName",
          element: <Menu/>,
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
