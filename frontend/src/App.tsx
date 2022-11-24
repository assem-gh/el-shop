import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
