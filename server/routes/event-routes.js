import express from 'express';
import { addEvent, editEvent, allEvent, getEvent, getMyEvent } from '../controllers/event-controller.js';

export const eventRoutes = express.Router();

eventRoutes.route('/getEvents').get(allEvent);
eventRoutes.route('/add-event/:user_id').post(addEvent);
eventRoutes.route('/get-event/:user_id').get(getMyEvent);
eventRoutes.route('/edit/:event_id').patch(editEvent);
eventRoutes.route('/get/:event_id').get(getEvent);