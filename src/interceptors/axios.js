import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://receptionapi.cocobod.net",
});

export default axiosInstance;

