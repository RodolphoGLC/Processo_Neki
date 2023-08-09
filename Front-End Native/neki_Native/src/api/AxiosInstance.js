import axios from 'axios';

export const AxiosInstance = axios.create({
    baseURL: "http://192.168.0.40:8080/neki"
});