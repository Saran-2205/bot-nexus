import express from "express";
import { getAchievements } from "../../controllers/achievement.controller.js";

const router = express.Router();

router.get("/", getAchievements);

export default router;
