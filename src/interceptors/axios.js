// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import dayjs from 'dayjs';
// import { AuthContext } from '../components/context/useAuth.context';

// let authTokens = localStorage.getItem('authTokens')
//   ? JSON.parse(localStorage.getItem('authTokens'))
//   : null;

// const axiosInstance = axios.create({
//   // baseURL: 'http://localhost:9000',
//   baseURL: 'https://receptionapi.cocobod.net',
//   headers: { Authorization: `Bearer ${authTokens?.access_token}` },
// });

// axiosInstance.interceptors.request.use(async (req) => {
//   if (!authTokens) {
//     authTokens = localStorage.getItem('authTokens')
//       ? JSON.parse(localStorage.getItem('authTokens'))
//       : null;
//     req.headers.Authorization = `Bearer ${authTokens?.access_token}`;
//   }

//   const user = jwt_decode(authTokens?.access_token);
//   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//   if (!isExpired) return req;

//   const response = await axios.post(
//     'https://receptionapi.cocobod.net/auth/refresh',
//     // 'http://localhost:9000/auth/refresh',
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${authTokens.refresh_token}`,
//       },
//     }
//   );

//   localStorage.setItem('authTokens', JSON.stringify(response.data));
//   req.headers.Authorization = `Bearer ${response.data.access_token}`;

//   return req;
// });

// export default axiosInstance;

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

// Define API URL in one place for easier configuration
const API_BASE_URL = 'https://receptionapi.cocobod.net';
// const API_BASE_URL = 'http://localhost:9000'; // Uncomment for local development

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (req) => {
    // Get latest tokens from localStorage each time
    let authTokens = localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null;

    // If no tokens exist, proceed with request (will likely fail on protected routes)
    if (!authTokens) {
      return req;
    }

    // Set the authorization header
    req.headers.Authorization = `Bearer ${authTokens.access_token}`;

    try {
      // Check if token is expired
      const user = jwt_decode(authTokens.access_token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      // If not expired, proceed with request
      if (!isExpired) return req;

      // If expired, request new tokens
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authTokens.refresh_token}`,
          },
        }
      );

      // Save new tokens and update header
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      req.headers.Authorization = `Bearer ${response.data.access_token}`;
    } catch (error) {
      // Handle refresh token failure (e.g., refresh token expired)
      console.error('Token refresh failed:', error);
      localStorage.removeItem('authTokens'); // Clear invalid tokens
      // You might want to redirect to login page or dispatch a logout action here
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common error cases
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 responses globally
    if (error.response && error.response.status === 401) {
      // Token might be invalid despite not being expired
      localStorage.removeItem('authTokens');
      // Handle redirect to login or dispatch logout action
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
