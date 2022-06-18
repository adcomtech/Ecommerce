import express from 'express';
import {
  createTopic,
  getAllTopic,
  getTopic,
  deleteTopic,
  updateTopic,
} from '../controllers/topicController.js';

// middlewares
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

// routes
router.route('/topic').post(authCheck, adminCheck, createTopic);
router.route('/topic/:slug').get(getTopic);
router.route('/topics/:count').get(getAllTopic);
router.route('/topic/:slug').delete(authCheck, adminCheck, deleteTopic);
router.put('/topic/:slug', authCheck, adminCheck, updateTopic);

export const topicRouter = router;
