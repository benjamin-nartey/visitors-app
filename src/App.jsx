import { Route, Routes } from "react-router-dom";
import SignIn from "./routes/sign-in/sign-in.component";
import Home from "./routes/home/home.component";
import NavigationRoute from "./routes/navigation-route/navigation-route";
import Dashboard from "./routes/dashboard/dashboard.component";
import PasswordReset from "./routes/passwordReset/passwordReset.component";
import ConfirmPasswordReset from "./routes/confirm-passwordReset/confirm-passwordReset";
import ProtectedRoute from "./routes/protectedRoute/protectedRoute";
import Report from "./routes/reports/report.component";
import UncheckedOuts from "./routes/uncheckedOuts/uncheckedOuts.component";
import Employees from "./routes/admin/employees.component";
import Tags from "./routes/admin/tags.component";
import Unauthorized from "./routes/unauthorized/unauthorized";

const App = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="password-reset" element={<PasswordReset />} />
      <Route path="reset" element={<ConfirmPasswordReset />} />

      <Route path="unauthorized" element={<Unauthorized />} />
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
        <Route
          path="reports"
          element={
            <ProtectedRoute allowedRoles={["RECEPTIONIST", "ADMIN"]}>
              <Report />
            </ProtectedRoute>
          }
        />
        <Route
          path="uncheckedOuts"
          element={
            <ProtectedRoute allowedRoles={["RECEPTIONIST", "ADMIN"]}>
              <UncheckedOuts />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/employees"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/tags"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Tags />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
