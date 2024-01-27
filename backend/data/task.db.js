import mongoose from "mongoose";
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
    let res;
    // console.log(filterPayload);
    if (filterPayload && Object.keys(filterPayload).length > 0) {
      const pipeline = [];
      if (searchPayload && Object.keys(searchPayload).length > 0) {
        pipeline.push({
          $match: {
            user: new mongoose.Types.ObjectId(searchPayload?.user),
          },
        });
      }
      if (filterPayload.isCompleted) {
        pipeline.push({
          $match: {
            isCompleted: filterPayload.isCompleted.toString() === "true",
          },
        });
      }
      if (filterPayload.createdAt) {
        pipeline.push({
          $sort: {
            createdAt: +filterPayload.createdAt,
          },
        });
      }
      if (filterPayload.dueDate) {
        const targetDate = new Date(filterPayload.dueDate); // format: "2024-01-25"
        targetDate.setUTCHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setUTCDate(targetDate.getUTCDate() + 1);
        pipeline.push({
          $match: {
            dueDate: {
              $gte: targetDate,
              $lt: nextDay,
            },
          },
        });
      }
      if (filterPayload.priority) {
        pipeline.push({
          $sort: {
            priority: +filterPayload.priority,
          },
        });
      }
      if (filterPayload.dueDateSort) {
        pipeline.push({
          $sort: {
            dueDate: +filterPayload.dueDateSort,
          },
        });
      }
      if (filterPayload.completedSort) {
        pipeline.push({
          $sort: {
            isCompleted: +filterPayload.completedSort,
          },
        });
      }
      if (filterPayload.count) {
        pipeline.push({
          $count: "count",
        });
      }
      res = await TaskModel.aggregate(pipeline);
    } else {
      res = await TaskModel.find(searchPayload, filterPayload);
    }
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

export const findAllTasksPieChart = async (userId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const res = await TaskModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          completedTasksToday: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$isCompleted", true] },
                    { $gte: ["$createdAt", today] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          pendingTasksToday: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$isCompleted", false] },
                    { $gte: ["$createdAt", today] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          completedTasksAllTime: {
            $sum: {
              $cond: [{ $eq: ["$isCompleted", true] }, 1, 0],
            },
          },
          pendingTasksAllTime: {
            $sum: {
              $cond: [{ $eq: ["$isCompleted", false] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return res?.[0];
  } catch (error) {
    throw error;
  }
};
