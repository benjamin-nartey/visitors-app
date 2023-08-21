import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  console.log(allowedRoles.includes(user?.role));

  console.log(allowedRoles);

  return allowedRoles.includes(user?.role) ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
