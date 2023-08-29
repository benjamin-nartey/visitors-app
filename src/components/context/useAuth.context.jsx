import { useLocalStorage } from "../../utils/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { useMemo } from "react";
import axiosInstance from "../../interceptors/axios";

export const AuthContext = createContext({
  user: null,
  logout: () => null,
  token: null,
  loading: false,
  setLoading: () => true,
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);
  const [tokens, setTokens] = useLocalStorage("tokens", null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("user/me");
      if (response.status === 200) {
        setUser(response?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      await axiosInstance
        .post("https://receptionapi.cocobod.net/auth/logout")
        .then(() => {
          setTokens(null);
          setUser(null);
          navigate("/");
          localStorage.removeItem("authTokens");
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      tokens,
      setTokens,
      fetchUser,
      setUser,
      loading,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
