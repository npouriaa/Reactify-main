import "./assets/styles/App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { RequestsContextProvider } from "./context/RequestsContext";

const App = () => {
  return (
    <RequestsContextProvider>
      <RouterProvider router={router} />
    </RequestsContextProvider>
  );
};

export default App;
