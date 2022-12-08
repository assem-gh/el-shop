import Dashboard from "./pages/dashboard/Dashboard";
import React, { useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import AddProductPage from "./pages/dashboard/Product/AddProductPage";
import ProductsListPage from "./pages/dashboard/Product/ProductListPage";
import AddCategoryPage from "./pages/dashboard/Category/AddCategoryPage";
import CategoryListPage from "./pages/dashboard/Category/CategoryListPage";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="admin" element={<Dashboard />}>
            <Route path="products/add" element={<AddProductPage />} />
            <Route path="products/list" element={<ProductsListPage />} />
            <Route path="categories/add" element={<AddCategoryPage />} />
            <Route path="categories/list" element={<CategoryListPage />} />
          </Route>
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
