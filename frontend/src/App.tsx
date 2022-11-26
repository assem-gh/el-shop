import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import React from "react";
import AddProductPage from "./pages/dashboard/AddProductPage";
import ProductsListPage from "./pages/dashboard/ProductsListPage";

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="admin" element={<Dashboard />}>
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="products/list" element={<ProductsListPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
