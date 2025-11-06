import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import {
  createUser, editUser, deleteUser, getAllUsers, uploadImage
} from '../controllers/userController.js';

const router = Router();

// EXACT endpoints per assignment
router.post('/create', createUser);
router.put('/edit', editUser);
router.delete('/delete', deleteUser);
router.get('/getAll', getAllUsers);
router.post('/uploadImage', upload.single('image'), uploadImage);

export default router;
