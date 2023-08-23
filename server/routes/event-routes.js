import express from 'express';
import { addEvent, editEvent, allEvent } from '../controllers/event-controller.js';

export const eventRoutes = express.Router();

eventRoutes.route('/getEvents').get(allEvent);
eventRoutes.route('/add-event/:user_id').post(addEvent);
eventRoutes.route('/edit/:event_id').patch(editEvent);