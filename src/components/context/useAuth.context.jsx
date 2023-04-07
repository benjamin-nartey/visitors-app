import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useMemo } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useLocalStorage("user", null);
//     const navigate = useNavigate();

//   // call this function when you want to authenticate the user
//   const login = async (data) => {
//     setUser(data);
//     navigate("/home");
//   };

//   // call this function to sign out logged in user
//   const logout = () => {
//     setUser(null);
//     navigate("/", { replace: true });
//   };

//   const value = useMemo(
//     () => ({
//       user,
//       login,
//       logout,
//     }),
//     [user]
//   );
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

export const AuthContext = createContext({
  user: null,
  login: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("access_token");

  //  call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/home");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
