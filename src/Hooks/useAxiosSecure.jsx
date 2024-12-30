import axios from "axios";
import React, { useContext, useEffect } from "react";
import AuthContext from "../AuthContext/AuthContext";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          logOutUser().then(() => {
            navigate("/Login");
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
