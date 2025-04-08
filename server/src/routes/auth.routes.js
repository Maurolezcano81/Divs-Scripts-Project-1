import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', authMiddleware, authController.getProfile);
router.patch('/update-profile', authMiddleware, authController.updateProfile);

const authRouter = router;
export default authRouter;