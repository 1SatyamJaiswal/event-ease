import express from 'express';
import {registerUser, loginUser, getUser} from '../controllers/user-controller.js';

export const userRoutes = express.Router();

userRoutes.route("/").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/info").get(getUser);