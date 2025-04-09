import { Router } from 'express';
import * as archetypeController from '../controllers/archetype.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, archetypeController.getAllArchetypes);
router.get('/:id', authMiddleware, archetypeController.getArchetypeById);
router.post('/', authMiddleware, archetypeController.createArchetype);
router.put('/:id', authMiddleware, archetypeController.updateArchetype);
router.delete('/:id', authMiddleware, archetypeController.deleteArchetype);

const archetypeRouter = router;
export default archetypeRouter;
