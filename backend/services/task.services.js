import {
  createTask,
  deleteTask,
  findAllTasks,
  findAllTasksPieChart,
  findTask,
  updateTask,
} from "../data/task.db.js";
import { CustomError } from "../models/CustomError.js";

export const createTaskService = async (payload) => {
  try {
    if (!payload.title || !payload.dueDate || !payload.user) {
      throw new CustomError(
        "title, dueDate and userId are mandatory fields",
        400
      );
    }
    const createdTask = await createTask(payload);
    return createdTask;
  } catch (error) {
    throw error;
  }
};

export const findAllTasksService = async (userId, filterPayload) => {
  try {
    if (!userId) {
      throw new CustomError("userId is mandatory field", 400);
    }
    const allTasks = await findAllTasks(
      {
        user: userId,
      },
      filterPayload
    );
    return allTasks;
  } catch (error) {
    throw error;
  }
};

export const findTaskByIdService = async (taskId) => {
  try {
    if (!taskId) {
      throw new CustomError("taskId is mandatory field", 400);
    }
    const task = await findTask({
      _id: taskId,
    });
    if (!task) {
      throw new CustomError("Task not found with id: " + taskId, 404);
    }
    return task;
  } catch (error) {
    throw error;
  }
};

export const updateTaskByIdService = async (taskId, updatePayload) => {
  try {
    if (!taskId) {
      throw new CustomError("taskId is mandatory field", 400);
    }
    const task = await findTask({
      _id: taskId,
    });
    if (!task) {
      throw new CustomError("Task not found with id: " + taskId, 404);
    }
    const updatedTask = await updateTask(
      {
        _id: taskId,
      },
      updatePayload
    );
    return updatedTask;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskByIdService = async (taskId) => {
  try {
    if (!taskId) {
      throw new CustomError("taskId is mandatory field", 400);
    }
    const task = await findTask({
      _id: taskId,
    });
    if (!task) {
      throw new CustomError("Task not found with id: " + taskId, 404);
    }
    const deletedTask = await deleteTask({
      _id: taskId,
    });
    return {
      success: true,
      message: "Task deleted successfully with id: " + taskId,
    };
  } catch (error) {
    throw error;
  }
};

export const findTasksPieChartService = async (userId) => {
  try {
    if (!userId) {
      throw new CustomError("userId is mandatory field", 400);
    }
    const allTasks = await findAllTasksPieChart(userId);
    return allTasks;
  } catch (error) {
    throw error;
  }
};
