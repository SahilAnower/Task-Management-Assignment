import { VITE_API_URL } from "../Globals.js";
import axios from "axios";

export const signupApi = async (payload) => {
  try {
    const response = await axios.post(
      VITE_API_URL + "/api/auth/signup",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginApi = async (payload) => {
  try {
    const response = await axios.post(
      VITE_API_URL + "/api/auth/login",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
