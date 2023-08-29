import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { AuthContext } from '../components/context/useAuth.context';
// import axiosInstance from "./axios";
import { useContext } from 'react';

const useAxios = () => {
  const { tokens, setTokens, setUser } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:6000',
    headers: { Authorization: `Bearer ${tokens?.access_token}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access_token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(
      'http://localhost:6000/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${authTokens.refresh_token}`,
        },
      }
    );

    localStorage.setItem('authTokens', JSON.stringify(response.data));

    setTokens(response.data);
    req.headers.Authorization = `Bearer ${response.data.access_token}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;
