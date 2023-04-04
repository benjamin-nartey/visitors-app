import axiosInstance from "../interceptors/axios";
import { useAuthHeader, createRefresh } from "react-auth-kit";

const refreshApi = createRefresh({
  interval: 300,
  refreshApiCallback: async ({
    // arguments
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/refresh",
        { refreshToken },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: 300,
        newRefreshTokenExpiresIn: 604800,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

export default refreshApi;
