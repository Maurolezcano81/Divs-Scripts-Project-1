import { Router } from 'express';
import * as noteController from '../controllers/note.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/',authMiddleware, noteController.getAllNotes);
router.get('/:id',authMiddleware, noteController.getNoteById);
router.post('/',authMiddleware, noteController.createNote);
router.put('/:id',authMiddleware, noteController.updateNote);
router.delete('/:id',authMiddleware, noteController.deleteNote);

const noteRouter = router;
export default noteRouter;
