import express from 'express';
import { bookAppointment, cancelAppointment } from '../controllers/appointmentController.js';
import { isAuthUser } from '../middlewares/isAuthUser.js';

const appointmentRouter = express.Router();

appointmentRouter.route('/book-appointment').post(isAuthUser, bookAppointment);
appointmentRouter.route('/cancel-appointment').patch(isAuthUser, cancelAppointment);

export default appointmentRouter;