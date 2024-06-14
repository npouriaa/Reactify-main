import { createContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
  const lsTheme = JSON.parse(localStorage.getItem("darkMode"));
  const [isDark, setIsDark] = useState(lsTheme);
  const html = document.querySelector("html");

  const darkModeHandler = (setDark) => {
    html.classList.toggle("dark");
    localStorage.setItem("darkMode", setDark);
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (JSON.parse(lsTheme)) {
      html.classList = "dark";
    }
    setIsDark(JSON.parse(lsTheme));
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark, darkModeHandler }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContextProvider, DarkModeContext };
