import axios from "axios";
import { SERVER_BASE_URL } from "../constants/server.constants";
import { authUtils } from "../utils/auth.utils";

const custimAxios = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 10000,
});

custimAxios.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("accessToken")}`;

custimAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status == 406) {
      authUtils.refreshAuth();
      window.location.reload();
    }
  }
);

export default custimAxios;
