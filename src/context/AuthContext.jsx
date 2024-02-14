import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [registerInfo, setRegistetrInfo] = useState({});

  return (
    <AuthContext.Provider value={{ registerInfo, setRegistetrInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
