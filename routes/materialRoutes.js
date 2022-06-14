import express from 'express';

// controller
import {
  createMaterial,
  deleteMaterial,
  getAllMaterial,
  getMaterial,
  updateMaterial,
} from '../controllers/materialController.js';

// middlewares
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

// routes
router.route('/material-type').post(authCheck, adminCheck, createMaterial);
router.route('/material-types').get(getAllMaterial);
router
  .route('/material-type/:slug')
  .get(getMaterial)
  .put(authCheck, adminCheck, updateMaterial)
  .delete(authCheck, adminCheck, deleteMaterial);

export const materialRouter = router;
