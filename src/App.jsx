import { Route, Routes } from "react-router-dom";
import SignIn from "./routes/sign-in/sign-in.component";
import Home from "./routes/home/home.component";
import NavigationRoute from "./routes/navigation-route/navigation-route";
import Dashboard from "./routes/dashboard/dashboard.component";
import PasswordReset from "./routes/passwordReset/passwordReset.component";
import ConfirmPasswordReset from "./routes/confirm-passwordReset/confirm-passwordReset";
import ProtectedRoute from "./routes/protectedRoute/protectedRoute";

const App = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="password-reset" element={<PasswordReset />} />
      <Route path="reset" element={<ConfirmPasswordReset />} />
      <Route element={<NavigationRoute />}>
        <Route
          path="home"
          element={
            <ProtectedRoute allowedRoles={["RECEPTIONIST", " ADMIN"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={["RECEPTIONIST", "ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
