import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import appointmentRouter from './routes/appointmentRoute.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(cookieParser()); // Cookie Parser is Always used before any route
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/appointment', appointmentRouter);

export default app;