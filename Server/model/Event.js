import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  event_date: {
    type: Date,
    required: true,
  },
  registration_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  impressions: {
    type: Number,
    default: 0,
  },
  registrations: {
    type: Number,
    default: 0,
  },
  img_url: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model('Event',eventSchema);