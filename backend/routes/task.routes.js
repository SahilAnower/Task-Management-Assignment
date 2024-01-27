import express from "express";
import {
  taskCreate,
  taskFindAll,
  taskFindById,
  taskUpdateById,
  taskDeleteById,
  taskFindPieChart,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", taskCreate);

router.get("/", taskFindAll);

router.get("/pie-chart", taskFindPieChart);

router.get("/:id", taskFindById);

router.put("/:id", taskUpdateById);

router.delete("/:id", taskDeleteById);

export default router;
