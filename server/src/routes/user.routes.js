import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router()

router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

const userRouter = router
export default userRouter;
