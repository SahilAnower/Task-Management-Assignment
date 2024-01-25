import TaskModel from "../models/Task.js";

export const createTask = async (payload) => {
  try {
    const res = await TaskModel.create(payload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findAllTasks = async (searchPayload, filterPayload = null) => {
  try {
    const res = await TaskModel.find(searchPayload, filterPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findTask = async (searchPayload, filterPayload = null) => {
  try {
    const res = await TaskModel.findOne(searchPayload, filterPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (searchPayload, filterPayload) => {
  try {
    const res = await TaskModel.findByIdAndUpdate(
      searchPayload,
      filterPayload,
      {
        new: true,
      }
    );
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (searchPayload) => {
  try {
    const res = await TaskModel.findByIdAndDelete(searchPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
