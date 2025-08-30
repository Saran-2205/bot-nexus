import express from "express";
import {deleteFeedback, getAllFeedbacks } from "../../controllers/feedback.comtroller.js";


const router = express.Router();

router.get("/",getAllFeedbacks);

router.delete("/:param",deleteFeedback)

export default router;