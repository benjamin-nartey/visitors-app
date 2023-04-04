import { Route, Routes } from "react-router-dom";
import SignIn from "./routes/sign-in/sign-in.component";
import Home from "./routes/home/home.component";
import NavigationRoute from "./routes/navigation-route/navigation-route";
import Dashboard from "./routes/dashboard/dashboard.component";
import { RequireAuth } from "react-auth-kit";

const App = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route element={<NavigationRoute />}>
        <Route
          path="home"
          element={
            <RequireAuth loginPath="/">
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="dashboard"
          element={
            <RequireAuth loginPath="/">
              <Dashboard />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
