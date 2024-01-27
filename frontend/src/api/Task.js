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

export const getTasksApi = async (token, queryParams = null) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (queryParams) {
      config.params = queryParams;
    }
    const response = await axios.get(VITE_API_URL + "/api/tasks", config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskApi = async (token, payload, _id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      VITE_API_URL + `/api/tasks/${_id}`,
      payload,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskApi = async (token, _id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      VITE_API_URL + `/api/tasks/${_id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
