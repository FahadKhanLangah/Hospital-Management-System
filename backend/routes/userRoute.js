import express from 'express';
import { getAllUsers, getLoginUser, loginUser, logoutUser, registerUser, updateUser } from '../controllers/userController.js';
import upload from '../config/multer.js';
import { isAuthUser } from '../middlewares/isAuthUser.js';

const userRouter = express.Router();

userRouter.route('/login-user').post(loginUser);
userRouter.route('/register-user').post(upload.single('avatar'), registerUser);
userRouter.route('/all-users').get(getAllUsers);
userRouter.route('/logout-user').get(isAuthUser, logoutUser);
userRouter.route('/loginuser-detail').get(isAuthUser, getLoginUser);
userRouter.route('/update-user').patch(isAuthUser, upload.single('avatar'), updateUser);

export default userRouter;