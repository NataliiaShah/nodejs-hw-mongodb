import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import { upload } from '../middlewares/upload.js';
import { uploadPhotoController } from '../controllers/photo.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.post('/upload-photo', upload.single('photo'), uploadPhotoController);

export default router;












