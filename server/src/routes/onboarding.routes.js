import { Router } from 'express';
import * as onboardingController from '../controllers/onboarding.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, onboardingController.createOnboarding);

const onboardingRouter = router;
export default onboardingRouter;
