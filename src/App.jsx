import "./assets/styles/App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { RequestsContextProvider } from "./context/RequestsContext";
import { DarkModeContextProvider } from "./context/DarkModeContext";

const App = () => {
  return (
    <RequestsContextProvider>
      <DarkModeContextProvider>
        <RouterProvider router={router} />
      </DarkModeContextProvider>
    </RequestsContextProvider>
  );
};

export default App;
