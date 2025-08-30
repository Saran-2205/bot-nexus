import express from "express";
import {createFeedback, } from "../../controllers/feedback.comtroller.js";


const router = express.Router();

router.post("/",createFeedback);

export default router;