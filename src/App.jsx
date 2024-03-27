import "./assets/styles/App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
