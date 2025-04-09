import express from "express";
import { getProjects, createProject, deleteProject, updateProject, getProjectById } from "../controllers/projectsController.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);
router.get("/:id", getProjectById);

export default router;