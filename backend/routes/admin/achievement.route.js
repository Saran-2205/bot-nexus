import express from "express";
import { createAchievement, deleteAchievement, getAchievementById, getAchievements, updateAchievementById } from "../../controllers/achievement.controller.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", getAchievementById);
router.patch("/:id", updateAchievementById);
router.post("/", createAchievement);
router.delete("/:id", deleteAchievement);

export default router;