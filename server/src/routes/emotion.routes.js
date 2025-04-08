import { Router } from 'express';
import * as emotionController from '../controllers/emotion.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, emotionController.getAllEmotions);
router.get('/last7days', authMiddleware, emotionController.getEmotionsLast7Days);
router.post('/', authMiddleware, emotionController.createEmotion);
router.get('/:id', authMiddleware, emotionController.getEmotionById);
router.put('/:id', authMiddleware, emotionController.updateEmotion);
router.delete('/:id', authMiddleware, emotionController.deleteEmotion);

const emotionRouter = router;
export default emotionRouter;