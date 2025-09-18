import axios, { AxiosResponse } from "axios";
import {API_URL} from "@/lib/apiEndpoints";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Authorization": "application/json",
    }
})

export default axiosInstance;