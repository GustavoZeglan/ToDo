import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const AxiosInstance = axios.create({
    baseURL: url,
});

export { AxiosInstance };
