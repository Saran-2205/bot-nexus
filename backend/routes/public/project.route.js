import express from "express";

const router = express.Router();
import { getAllProjects, getProjectByParams } from "../../controllers/project.controller.js";

router.get("/", getAllProjects);

router.get("/:param", getProjectByParams);


export default router;
