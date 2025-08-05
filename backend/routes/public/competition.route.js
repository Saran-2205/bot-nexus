import express from 'express';
import { getAllCompetitions, getCompetitionByParams} from '../../controllers/competition.controller.js';

const router = express.Router();

router.get('/', getAllCompetitions);

router.get('/:param', getCompetitionByParams);

export default router;