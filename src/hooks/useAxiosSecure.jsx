import React, { useContext, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from '../contexts/authContext/AuthContext';

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(); // 🔥 get Firebase access token properly
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptor); // 🧼 clean up
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
