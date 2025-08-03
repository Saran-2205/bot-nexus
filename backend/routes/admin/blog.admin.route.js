import express from 'express';
import { getAllBlogs, getBlogByParams, createBlog, updateBlog, deleteBlog } from '../../controllers/blog.controller.js';

const router= express.Router();

router.get('/', getAllBlogs);

router.get('/:param', getBlogByParams);

router.post('/add', createBlog);

router.patch('/:param', updateBlog);

router.delete('/:param', deleteBlog);

export default router;
