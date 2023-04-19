import { useState, createContext } from "react";

export const ToggleShowPremiseContext = createContext({
  showPremise: false,
  setShowPremise: () => false,
});

export const ToggleShowPremiseProvider = ({ children }) => {
  const [showPremise, setShowPremise] = useState(false);

  const value = { showPremise, setShowPremise };
  return (
    <ToggleShowPremiseContext.Provider value={value}>
      {children}
    </ToggleShowPremiseContext.Provider>
  );
};
