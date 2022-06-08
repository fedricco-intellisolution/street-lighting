import React, { useState } from "react";

const initialState = {
  isOpen: false
};

const SettingsContext = React.createContext(initialState);

function SettingsProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <SettingsContext.Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
