import express from 'express';
import { bookAppointment, cancelAppointment, myAppointments } from '../controllers/appointmentController.js';
import { isAuthUser } from '../middlewares/isAuthUser.js';

const appointmentRouter = express.Router();

appointmentRouter.route('/book-appointment').post(isAuthUser, bookAppointment);
appointmentRouter.route('/cancel-appointment').patch(isAuthUser, cancelAppointment);
appointmentRouter.route('/my-appointments').get(isAuthUser, myAppointments);

export default appointmentRouter;