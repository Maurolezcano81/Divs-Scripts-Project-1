import { Router } from 'express';
import * as temperamentController from '../controllers/temperament.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, temperamentController.getAllTemperaments);
router.get('/:id', authMiddleware, temperamentController.getTemperamentById);
router.post('/', authMiddleware, temperamentController.createTemperament);
router.put('/:id', authMiddleware, temperamentController.updateTemperament);
router.delete('/:id', authMiddleware, temperamentController.deleteTemperament);

const temperamentRouter = router;
export default temperamentRouter;
