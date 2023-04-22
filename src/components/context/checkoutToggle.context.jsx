import { useState, createContext } from "react";

export const CheckOutToggleContext = createContext({
  open: false,
  setOpen: () => false,
});

export const CheckOutToggleProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };

  return (
    <CheckOutToggleContext.Provider value={value}>
      {children}
    </CheckOutToggleContext.Provider>
  );
};
