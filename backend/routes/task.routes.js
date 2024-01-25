import express from "express";
import {
  taskCreate,
  taskFindAll,
  taskFindById,
  taskUpdateById,
  taskDeleteById,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", taskCreate);

router.get("/", taskFindAll);

router.get("/:id", taskFindById);

router.put("/:id", taskUpdateById);

router.delete("/:id", taskDeleteById);

export default router;
