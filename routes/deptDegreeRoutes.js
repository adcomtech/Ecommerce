import express from 'express';

// controller
import {
  createDeptDegree,
  deleteDeptDegree,
  getAllDeptDegree,
  getDeptDegree,
  updateDeptDegree,
} from '../controllers/deptDegreeController.js';

// middlewares
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

// routes
router.route('/degree').post(authCheck, adminCheck, createDeptDegree);
router.route('/degrees').get(getAllDeptDegree);
router
  .route('/degree/:slug')
  .get(getDeptDegree)
  .put(authCheck, adminCheck, updateDeptDegree)
  .delete(authCheck, adminCheck, deleteDeptDegree);

export const deptDegreeRouter = router;
