import express from 'express';
import { login,logout, getMe, register } from '../../controllers/auth.controller.js';
import { protectRoute } from '../../middleware/protectRoute.js';

const router= express.Router();

router.get("/me", protectRoute, getMe);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);


export default router;