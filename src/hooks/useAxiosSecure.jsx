import React, { useContext } from 'react';
import axios from "axios";
import { AuthContext } from '../contexts/authContext/AuthContext';
const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})
const useAxiosSecure = () => {
    const {user} = useContext(AuthContext);

    axiosSecure.interceptors.request.use(config=>{
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    },error =>{
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;