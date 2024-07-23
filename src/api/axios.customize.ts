import axiosClient from "axios";


const instance = axiosClient.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    withCredentials: true

    // .. other options
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const access_token = localStorage.getItem('access_token');
    config.headers.Authorization = access_token ? `Bearer ${access_token}` : '';
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error;
});

export default instance;