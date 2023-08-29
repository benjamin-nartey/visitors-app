import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { AuthContext } from '../components/context/useAuth.context';

let authTokens = localStorage.getItem('authTokens')
  ? JSON.parse(localStorage.getItem('authTokens'))
  : null;

const axiosInstance = axios.create({
  baseURL: 'https://receptionapi.cocobod.net',
  headers: { Authorization: `Bearer ${authTokens?.access_token}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.access_token}`;
  }

  const user = jwt_decode(authTokens?.access_token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  if (!isExpired) return req;

  const response = await axios.post(
    'https://receptionapi.cocobod.net/auth/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${authTokens.refresh_token}`,
      },
    }
  );

  localStorage.setItem('authTokens', JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access_token}`;

  return req;
});

export default axiosInstance;
