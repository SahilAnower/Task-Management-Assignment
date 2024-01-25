import {
  createTaskService,
  deleteTaskByIdService,
  findAllTasksService,
  findTaskByIdService,
  updateTaskByIdService,
} from "../services/task.services.js";

export const taskCreate = async (req, res, next) => {
  try {
    req.body.user = req.userId;
    const response = await createTaskService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const taskFindAll = async (req, res, next) => {
  try {
    const response = await findAllTasksService(req.userId, req.query);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const taskFindById = async (req, res, next) => {
  try {
    const response = await findTaskByIdService(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const taskUpdateById = async (req, res, next) => {
  try {
    const response = await updateTaskByIdService(req.params.id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const taskDeleteById = async (req, res, next) => {
  try {
    const response = await deleteTaskByIdService(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
