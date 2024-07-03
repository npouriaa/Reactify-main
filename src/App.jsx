import "./assets/styles/App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { RequestsContextProvider } from "./context/RequestsContext";
import { DarkModeContextProvider } from "./context/DarkModeContext";
import { ChatContextProvider } from "./context/ChatContext";

const App = () => {
  return (
    <RequestsContextProvider>
      <ChatContextProvider>
        <DarkModeContextProvider>
          <RouterProvider router={router} />
        </DarkModeContextProvider>
      </ChatContextProvider>
    </RequestsContextProvider>
  );
};

export default App;
