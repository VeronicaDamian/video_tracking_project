import express from 'express';
import { getProjects, createProject, deleteProject, updateProject, getProjectById } from '../controllers/projectsController.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.get('/:id', getProjectById);
router.delete('/:id', deleteProject);

export default router;