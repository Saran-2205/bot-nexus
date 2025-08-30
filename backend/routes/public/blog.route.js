import express from 'express';
import { getAllBlogs, getBlogByParams } from '../../controllers/blog.controller.js';

const router= express.Router();

router.get('/', getAllBlogs);

router.get('/:param', getBlogByParams);

export default router;
