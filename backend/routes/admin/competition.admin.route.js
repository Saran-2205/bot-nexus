import express from 'express';
import { getAllCompetitions, getCompetitionByParams, createCompetition, updateCompetition, deleteCompetition } from '../../controllers/competition.controller.js';

const router = express.Router();

router.get('/', getAllCompetitions);

router.get('/:param', getCompetitionByParams);

router.post('/add', createCompetition);

router.patch('/:param', updateCompetition);

router.delete('/:param', deleteCompetition);

export default router;