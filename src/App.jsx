import { Route, Routes } from "react-router-dom";
import SignIn from "./routes/sign-in/sign-in.component";
import Home from "./routes/home/home.component";
import NavigationRoute from "./routes/navigation-route/navigation-route";
import Dashboard from "./routes/dashboard/dashboard.component";
import { ProtectedRoute } from "./routes/protectedRoute/protectedRoute";


const App = () => {

  return (
    <Routes>
      <Route index element={<SignIn />} />
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
