import { Router } from 'express';
import * as classificationController from '../controllers/classification.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// clasificar personalidad (no requiere autenticación)
router.post('/classify', classificationController.classifyPersonality);

router.get('/classify/all', authMiddleware, classificationController.getClassifications);
// router.get('/classify/:id', authMiddleware, classificationController.getClassificationById);

const classificationRouter = router;
export default classificationRouter;
