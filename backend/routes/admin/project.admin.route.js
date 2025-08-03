import express from "express";

const router = express.Router();
import { getAllProjects, getProjectByParams, createProject, updateProject, deleteProject } from "../../controllers/project.controller.js";

router.post("/add", createProject);

router.get("/", getAllProjects);

router.get("/:param", getProjectByParams);

router.patch("/:param", updateProject);

router.delete("/:param", deleteProject);

export default router;
