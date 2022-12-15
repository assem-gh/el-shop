import Dashboard from "./pages/dashboard/Dashboard";
import React, { useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
} from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import AddProductPage from "./pages/dashboard/Product/AddProductPage";
import ProductsListPage from "./pages/dashboard/Product/ProductListPage";
import CategoryListPage from "./pages/dashboard/Category/CategoryListPage";
import { NotificationsProvider } from "@mantine/notifications";
import FourOhFour from "./pages/FourOhFour/FourOhFour";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const initialized = true;
  if (!initialized) {
    return <LoadingOverlay visible loader="" />;
  }
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
        <NotificationsProvider position="top-right">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="admin" element={<Dashboard />}>
              {<Route path="products/add" element={<AddProductPage />} />}
              <Route path="products/list" element={<ProductsListPage />} />
              <Route path="categories/list" element={<CategoryListPage />} />
            </Route>

            <Route path="*" element={<FourOhFour />} />
          </Routes>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
