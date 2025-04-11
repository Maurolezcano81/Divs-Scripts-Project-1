import { Router } from 'express';
import * as classificationController from '../controllers/classification.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/classify', authMiddleware,classificationController.classifyPersonality);


const classificationRouter = router;
export default classificationRouter;
