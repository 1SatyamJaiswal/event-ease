import express from 'express';
import { addEvent, editEvent } from '../controllers/event-controller.js';

export const eventRoutes = express.Router();

eventRoutes.route('/add-event/:user_id').post(addEvent);
eventRoutes.route('/edit/:event_id').patch(editEvent);