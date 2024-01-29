import Event from "../model/Event.js";
import asyncHandler from "express-async-handler";

export const addEvent = asyncHandler(async (req, res) => {
  const user_id = req.params.user_id;

  const { name, event_date, registration_date, description, img_name } =
    req.body;

  if (!name || !event_date || !description || !img_name || !registration_date) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  const event = await Event.create({
    name,
    event_date,
    registration_date,
    description,
    img_url: img_name,
    owner: user_id,
  });

  if (event) {
    res.status(200).json({
      _id: event.id,
      name: event.name,
      event_date: event.event_date,
      registration_date: event.registration_date,
      description: event.description,
      impressions: event.impressions,
      registrations: event.registrations,
      owner: event.owner,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create event");
  }
});

export const editEvent = asyncHandler(async (req, res) => {
  const event_id = req.params.event_id;

  const { name, event_date, registration_date, description, img_name } =
    req.body;

  if (!name || !event_date || !description || !img_name || !registration_date) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  try {
    const user = await Event.updateOne(
      { _id: event_id },
      {
        $set: {
          name,
          event_date,
          registration_date,
          description,
          img_name,
        },
      }
    );
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error Updating Event");
  }
});

export const allEvent = asyncHandler(async (req, res) => {
  const today = new Date();

  const events = await Event.find().populate(
    "owner"
  );

  if (events) {
    if (events.length > 0) {
      res.status(200).json(events);
    } else {
      res.status(200).json({ message: "No events found" });
    }
  } else {
    res.status(500);
    throw new Error("Failed to find events");
  }
});

export const getEvent = asyncHandler(async (req, res) => {
  const event_id = req.params.event_id;
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: event_id },
    { $inc: { impressions: 1 } },
    { new: true }
  ).populate("owner");

  if (updatedEvent) {
    res.status(200).json(updatedEvent);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

export const getMyEvent = asyncHandler(async(req,res)=>{
  const owner = req.params.user_id;
  try{
    const yourEvents = await Event.find({ owner: owner});
    if(yourEvents.length>0){
      res.status(200).json(yourEvents);
    } else {
      res.status(404).json({message: "You have not hosted any event"});
    }
  } catch (e) {
    res.status(500);
    throw new Error('Internal server error');
  }
})

export const deleteEvent = asyncHandler(async (req, res) => {
  const event_id = req.params.event_id;
  try {
    const event = await Event.deleteOne({ _id: event_id });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error Deleting Event");
  }
});