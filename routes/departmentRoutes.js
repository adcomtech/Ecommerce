import express from 'express';

// controller
import {
  createDepartment,
  deleteDepartment,
  getAllDepartment,
  getDepartment,
  updateDpartment,
} from '../controllers/departmentController.js';

// middlewares
import { adminCheck, authCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

// routes
router.route('/department').post(authCheck, adminCheck, createDepartment);
router.route('/departments').get(getAllDepartment);
router
  .route('/department/:slug')
  .get(getDepartment)
  .put(authCheck, adminCheck, updateDpartment)
  .delete(authCheck, adminCheck, deleteDepartment);

export const departmentRouter = router;
