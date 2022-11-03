import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
const service = axios.create({
    baseURL: import.meta.env.VITE_RES_URL,
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
        function (data) {
            return data;
        },
    ],
}); // Request interceptors

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // do something
        const token = window.sessionStorage.getItem('token');
        if (token) {
            // @ts-ignore
            config.headers.token = token;
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    },
); // Response interceptors

service.interceptors.response.use(
    async (response: AxiosResponse) => {
        // do something
        return response;
    },
    (error: any) => {
        // do something
        return Promise.reject(error);
    },
);

export default service;
