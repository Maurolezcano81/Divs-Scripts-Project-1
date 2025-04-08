import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, dashboardController.getDashboardData);

const dashboardRouter = router;
export default dashboardRouter;