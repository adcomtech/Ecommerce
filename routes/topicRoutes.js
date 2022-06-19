import express from 'express';
import {
  createTopic,
  getAllTopic,
  getTopic,
  deleteTopic,
  updateTopic,
  list,
  topicsCount,
  listByFields,
} from '../controllers/topicController.js';

// middlewares
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

// routes
router.route('/topic').post(authCheck, adminCheck, createTopic);
router.get('/topics/total', topicsCount);

router.route('/topic/:slug').get(getTopic);
router.route('/topics/:count').get(getAllTopic);
router.route('/topic/:slug').delete(authCheck, adminCheck, deleteTopic);
router.put('/topic/:slug', authCheck, adminCheck, updateTopic);

router.post('/topics-by-field', listByFields);
router.post('/topics', list);

export const topicRouter = router;
