import "./App.css";
import React from "react";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./components/Layout/AppLayout";
import Categories from "./components/Categories";
import Menu from "./components/Menu";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
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
