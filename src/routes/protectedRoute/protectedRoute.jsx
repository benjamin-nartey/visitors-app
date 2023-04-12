import { Navigate } from "react-router-dom";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
