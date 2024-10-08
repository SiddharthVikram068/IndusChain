import express from 'express';
import {addEngineerToPlant, addManagerToPlant, getPlantDetails, createPlant} from '../plant/plant.js';
import {roleMiddleware, authMiddleware} from '../../middleware/authMiddleware.js';


const router = express.Router();

// Only owners can create plants
router.post('/create', authMiddleware, roleMiddleware(['OWNER']), createPlant);

// Only plant owners can add managers or engineers
router.post('/add-manager', authMiddleware, roleMiddleware(['OWNER']), addManagerToPlant);
router.post('/add-engineer', authMiddleware, roleMiddleware(['OWNER']), addEngineerToPlant);

// Managers and Engineers can view plant details, but not edit them
router.get('/details/:plantId', authMiddleware, roleMiddleware(['MANAGER', 'ENGINEER']), getPlantDetails);

export default router;
