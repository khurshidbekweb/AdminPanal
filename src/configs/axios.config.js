import axios from "axios";
import { SERVER_BASE_URL } from "../constants/server.constants";


export const custimAxios = axios.create({
    BASE_URL: SERVER_BASE_URL,
    timeout: 10000
})