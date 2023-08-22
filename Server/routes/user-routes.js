import express from 'express';
import {registerUser, loginUser, getUser, editUser} from '../controllers/user-controller.js';

export const userRoutes = express.Router();

userRoutes.route("/").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/info/:user_id").get(getUser);
userRoutes.route("/edit/:user_id").patch(editUser);