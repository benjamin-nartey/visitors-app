import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { useMemo } from "react";
import axiosInstance from "../../interceptors/axios";
import axios from "axios";

export const AuthContext = createContext({
  user: null,
  // login: () => null,
  logout: () => null,
  token: null,
  loading: true,
  setLoading: () => true,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);
  const [tokens, setTokens] = useLocalStorage("tokens", null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (tokens) {
      const response = await axiosInstance.get("user/me");
      if (response.status === 200) {
        setUser(response?.data);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [tokens]);

  // const responseUser = axiosInstance.get("/user/me", {
  //   headers: {
  //     Authorization: `Bearer ${authTokens["access_token"]}`,
  //   },
  // });
  // console.log("response", response);
  // console.log("data", response.data);

  // return responseUser;

  // const login = async (user, token) => {
  //   setUser(user);
  //   setTokens(token);
  //   navigate("/home");
  // };

  // const updateAccessToken = async () => {
  //   console.log("token updated");
  //   axiosInstance.defaults.headers.common[
  //     "Authorization"
  //   ] = `Bearer ${tokens?.refresh_token}`;
  //   await axiosInstance.post("/auth/refresh").then((response) => {
  //     console.log("newRefresh", response);
  //     if (response.status === 200) {
  //       setTokens(response.data);
  //       localStorage.setItem("authTokens", JSON.stringify(response.data));
  //     } else {
  //       logout();
  //     }
  //   });
  //   if(loading){
  //     setLoading(false)
  //   }
  // };

  useEffect(() => {
    if (tokens) {
      fetchUser();
    }
    setLoading(false);
  }, [tokens, loading]);

  // const authTokens = JSON.parse(localStorage.getItem("authTokens"));

  const logout = async () => {
    await axiosInstance
      .post("https://receptionapi.cocobod.net/auth/logout")
      .then(() => {
        setTokens(null);
        setUser(null);
        navigate("/");
        localStorage.removeItem("authTokens");
      });
  };

  const value = useMemo(
    () => ({
      user,
      // login,
      logout,
      tokens,
      setTokens,
      fetchUser,
    }),
    [user]
  );
  return (
    <AuthContext.Provider value={value}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
