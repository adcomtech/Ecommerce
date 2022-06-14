import express from 'express';
import {
  createOrUpdateUser,
  currentUser,
} from '../controllers/authController.js';
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/create-or-update-user').post(authCheck, createOrUpdateUser);
router.route('/current-user').post(authCheck, currentUser);
router.route('/current-admin').post(authCheck, adminCheck, currentUser);

export const authRouter = router;
