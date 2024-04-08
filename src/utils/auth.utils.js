import custimAxios from "../configs/axios.config";

export const authUtils = {
  loginAuthAdmin: async ({ password, username }) => {
    const { data } = await custimAxios.post("/auth/login/admin", {
      password,
      userAgent: window.navigator.userAgent,
      username,
    });
    console.log(data);
    return data;
  },
  smsAuth: async (phone) => {
    const { data } = await custimAxios.post("/auth/login/sms", phone);
    return data;
  },
  refreshAuth: async () => {
    const { data } = await custimAxios.post(
      "/auth/refresh",
      {
        userAgent: window.navigator.userAgent,
      },
      {
        headers: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      }
    );
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    // add new access token
    custimAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.accessToken}`;

    return data;
  },
};
