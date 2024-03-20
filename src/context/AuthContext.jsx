import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [registerInfo, setRegistetrInfo] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user)
      setCurrentUser(user);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ registerInfo, setRegistetrInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
