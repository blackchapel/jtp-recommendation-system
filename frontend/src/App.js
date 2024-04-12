import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import Layout from "./components/Layout";
import LayoutAuth from "./components/LayoutAuth";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LayoutHome from "./components/LayoutHome";
import SearchResults from "./pages/SearchResults";
import SearchContext from "./context/SearchContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutHome />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/search/:searchQuery",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <SearchResults /> }],
  },
  {
    path: "/auth",
    element: <LayoutAuth />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/signup", element: <Signup /> },
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#c80815",
    },
    secondary: {
      main: "#c85b08",
    },
  },
});

function App() {
  const [carNames, setCarNames] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedCar, setSelectedCar] = React.useState({});

  return (
    <ThemeProvider theme={theme}>
      <SearchContext.Provider
        value={{
          carNames,
          setCarNames,
          searchValue,
          setSearchValue,
          selectedCar,
          setSelectedCar,
        }}
      >
        <RouterProvider router={router} />;
      </SearchContext.Provider>
    </ThemeProvider>
  );
}

export default App;