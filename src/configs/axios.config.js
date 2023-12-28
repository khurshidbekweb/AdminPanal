import axios from "axios";
import { SERVER_BASE_URL } from "../constants/server.constants";

const custimAxios = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 10000,
});

custimAxios.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("accessToken")}`;

export default custimAxios;
