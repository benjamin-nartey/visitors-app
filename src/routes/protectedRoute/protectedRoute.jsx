import { Navigate } from "react-router-dom";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);
  console.log(allowedRoles.includes(user.role));

  console.log(allowedRoles);

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
