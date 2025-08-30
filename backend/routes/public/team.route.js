import express from 'express';
import {getAllTeamMembers, getTeamMemberByParams} from '../../controllers/team.controller.js';

const router = express.Router();

router.get('/', getAllTeamMembers);

router.get('/:param', getTeamMemberByParams);

export default router;
