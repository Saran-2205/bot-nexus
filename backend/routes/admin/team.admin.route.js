import express from 'express';
import {getAllTeamMembers, getTeamMemberByParams, createTeamMember, updateTeamMember, deleteTeamMember} from '../../controllers/team.controller.js';

const router = express.Router();

router.get('/', getAllTeamMembers);

router.get('/:param', getTeamMemberByParams);

router.post('/create', createTeamMember);

router.patch('/:param', updateTeamMember);

router.delete('/:param', deleteTeamMember);

export default router;
