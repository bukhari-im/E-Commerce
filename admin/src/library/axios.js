import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    withCredentials: true, // dengan menambahkan field ini browser akan mengirim cookies secara otomatis ke server
    
});

export default axiosInstance;