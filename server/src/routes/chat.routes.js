import { Router } from 'express';
import * as chatController from '../controllers/chat.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, chatController.getAllChats);
router.get('/:id', authMiddleware, chatController.getChatById);
router.delete('/:id', authMiddleware, chatController.deleteChat);

router.post('/create', authMiddleware, chatController.createChat);
router.post('/:id/messages', authMiddleware, chatController.sendMessage);
router.patch('/:id/title', authMiddleware, chatController.updateChatTitle);


const chatRouter = router;
export default chatRouter;
