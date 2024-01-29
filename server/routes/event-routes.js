import express from 'express';
import { addEvent, editEvent, allEvent, getEvent, getMyEvent, deleteEvent } from '../controllers/event-controller.js';

export const eventRoutes = express.Router();

eventRoutes.route('/').get(allEvent);
eventRoutes.route('/:user_id').post(addEvent);
eventRoutes.route('/user/:user_id').get(getMyEvent);
eventRoutes.route('/:event_id').patch(editEvent);
eventRoutes.route('/:event_id').get(getEvent);
eventRoutes.route('/:event_id').delete(deleteEvent);