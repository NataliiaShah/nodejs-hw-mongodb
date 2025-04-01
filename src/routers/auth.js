import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  resetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserController,
  registerUserController,
  logoutUserController,
  refreshUserController,
  resetEmailController,
  resetPasswordController,
 } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController));

router.post(
  '/refresh',
  ctrlWrapper(refreshUserController));

  router.post(
  '/send-reset-email',
  validateBody(resetEmailSchema),
  ctrlWrapper(resetEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);


export default router;
