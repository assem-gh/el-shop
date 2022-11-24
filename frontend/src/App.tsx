import {MantineProvider} from "@mantine/core";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <MantineProvider theme={{colorScheme: 'light'}} withGlobalStyles withNormalizeCSS>
            <Routes>
                <Route path="/" element={<div>Dashboard</div>}/>
            </Routes>
        </MantineProvider>
    )
}

export default App
