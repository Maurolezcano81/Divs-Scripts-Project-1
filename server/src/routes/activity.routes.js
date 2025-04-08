import { Router } from 'express';
import * as activityController from '../controllers/activity.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/',authMiddleware, activityController.getAllActivities);
router.get('/:id',authMiddleware, activityController.getActivityById);
router.post('/',authMiddleware, activityController.createActivity);
router.put('/:id',authMiddleware, activityController.updateActivity);
router.delete('/:id',authMiddleware, activityController.deleteActivity);

const activityRouter = router;
export default activityRouter;
