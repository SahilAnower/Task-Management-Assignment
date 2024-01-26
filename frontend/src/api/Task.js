import { VITE_API_URL } from "../Globals.js";
import axios from "axios";

export const taskCreateApi = async (payload, token) => {
  try {
    const response = await axios.post(VITE_API_URL + "/api/tasks", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasksApi = async (token, queryParams) => {
  try {
    const response = await axios.get(VITE_API_URL + "/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
