import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return allowedRoles.some((role) => role.includes(user?.role)) ? (
    children
  ) : user.name ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
