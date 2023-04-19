import { Route, Routes } from "react-router-dom";
import SignIn from "./routes/sign-in/sign-in.component";
import Home from "./routes/home/home.component";
import NavigationRoute from "./routes/navigation-route/navigation-route";
import Dashboard from "./routes/dashboard/dashboard.component";
import { ProtectedRoute } from "./routes/protectedRoute/protectedRoute";
import PasswordReset from "./routes/passwordReset/passwordReset.component";
import ConfirmPasswordReset from "./routes/confirm-passwordReset/conform-passwordReset";

const App = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="password-reset" element={<PasswordReset />} />
      <Route path="confirm-password-reset" element={<ConfirmPasswordReset />} />
      <Route element={<NavigationRoute />}>
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
