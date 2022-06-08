import React from "react";

import { THEME } from "../constants";
import useSettingsState from "../hooks/useSettingsState";

const initialState = {
  theme: THEME.LIGHT,
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useSettingsState("theme", THEME.LIGHT);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
