import express from 'express';
import upload from '../config/multer.js';
import { AddDoctor, getAllAdmin, getAllDoctors, getLoginAdmin, loginAdmin, logoutAdmin, registerAdmin } from '../controllers/adminController.js';
import { isAuthorizedRole, isAuthUser } from '../middlewares/isAuthUser.js';
import { allAppointments } from '../controllers/appointmentController.js';

const adminRouter = express.Router();

adminRouter.route('/login-admin').post(loginAdmin);
adminRouter.route('/register-admin').post(upload.single('avatar'), registerAdmin);
adminRouter.route('/add-doctor').post(AddDoctor);
adminRouter.route('/all-doctor').get(getAllDoctors);
adminRouter.route('/logout-admin').get(logoutAdmin);
adminRouter.route('/login-admin').get(isAuthUser, getLoginAdmin);
adminRouter.route('/all-admin').get(getAllAdmin);
adminRouter.route('/all-appointments').get(isAuthUser, allAppointments);

export default adminRouter;