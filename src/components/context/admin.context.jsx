import { AuthContext } from "./useAuth.context";
import { useContext, useEffect, useState } from "react";

export const AdminContext = {
  isAdmin: false,
  setIsAdmin: () => false,
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);

  const value = { isAdmin };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
