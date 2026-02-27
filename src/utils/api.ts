import axios from "axios";
import { CONFIG } from "@utils/config.ts";

export const api = axios.create({
    baseURL: CONFIG.API_URL,
    withCredentials: true
});