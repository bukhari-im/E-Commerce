import axios from "axios";
import axiosInstance from "./axios.js";
import { data } from "react-router";

// productApi dan order Api ini harus sinkron dan terkonfigurasi dengan file admin.route.js

export const productApi = {
    getAll: async() => {
     const {data}  = await axiosInstance.get("/admin/products");
     return data;
    },

    create: async(formData) => {
     const {data}  = await axiosInstance.post("/admin/products",formData);
     return data;  
    },

    update: async({id,formData}) => {
     const {data}  = await axiosInstance.put(`/admin/products/${id}`,formData);
     return data;  
    },

    delete: async(productId) => {
     const {data}  = await axiosInstance.delete(`/admin/products/${productId}`);
     return data;  
    },
};

export const orderApi = {
    getAll: async() => {
       const {data} = await axiosInstance.get("/admin/orders");
       return data;
    },
    updateStatus: async({orderId, status}) => {
       const {data} = await axiosInstance.patch(`/admin/orders/${orderId}/status`,{status});
       return data;
    },
};

export const statsApi = {
    getDashboard: async() => {
        const {data} = await axiosInstance.get("/admin/stats",);
        return data;
    }
};