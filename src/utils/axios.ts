import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const service = axios.create({
    baseURL: process.env.VITE_RES_URL,
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
