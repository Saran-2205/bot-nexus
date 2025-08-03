import express from "express";

const router = express.Router();
import { getAllProjects, getLatestProject, getProjectByParams } from "../../controllers/project.controller.js";

router.get("/", getAllProjects);

router.get("/latest",getLatestProject);

router.get("/:param", getProjectByParams);


export default router;
