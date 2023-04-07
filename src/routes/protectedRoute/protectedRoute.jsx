import { Navigate } from "react-router-dom";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};