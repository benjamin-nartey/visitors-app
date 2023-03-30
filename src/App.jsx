import { Route, Routes } from "react-router-dom";
import SignIn from "./routes/sign-in/sign-in.component";
import Home from "./routes/home/home.component";
import NavigationRoute from "./routes/navigation-route/navigation-route";
import Dashboard from "./routes/dashboard/dashboard.component";

const App = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route element={<NavigationRoute />}>
        <Route path="home" element={<Home />} />
        <Route path = 'dashboard' element ={<Dashboard/>}/>
      </Route>
    </Routes>
  );
};

export default App;
