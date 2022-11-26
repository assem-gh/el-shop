import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import { useState } from "react";
import AddProductPage from "./pages/dashboard/AddProductPage";
import ProductsListPage from "./pages/dashboard/ProductsListPage";

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
          </Route>
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
