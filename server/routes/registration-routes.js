import express from 'express';
import { getRegistration, addRegistration, removeRegistration, getAllRegistered } from '../controllers/registration-controller.js';

export const registrationRoutes = express();

registrationRoutes.route('/get').post(getRegistration);
registrationRoutes.route('/add').post(addRegistration);
registrationRoutes.route('/remove').patch(removeRegistration);
registrationRoutes.route('/getAll/:user_id').get(getAllRegistered);