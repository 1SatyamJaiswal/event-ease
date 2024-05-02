import Event from "../model/Event.js";
import asyncHandler from "express-async-handler";
import redisClient from "../config/redis.js";

export const addEvent = asyncHandler(async (req, res) => {
  const user_id = req.params.user_id;
  console.log("/event/"+user_id);
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
  console.log("/event/"+event_id);
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
  console.log("/event/");

  try {
    let eventsData = await redisClient.get("events");

    if (eventsData !== null) {
      res.status(200).json(JSON.parse(eventsData));
    } else {
      const events = await Event.find().populate("owner");

      if (events.length > 0) {
        res.status(200).json(events);
      } else {
        res.status(200).json({ message: "No events found" });
      }
      redisClient.setEx("events", 120, JSON.stringify(events));
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    const events = await redisClient.get("events/owner/"+owner);

    if(events !== null){
      res.status(200).json(JSON.parse(events));
    } else {
      const yourEvents = await Event.find({ owner: owner }).populate("owner");
      if(yourEvents.length>0){
        res.status(200).json(yourEvents);
      } else {
        res.status(404).json({message: "You have not hosted any event"});
      }
      redisClient.setEx("events/owner/"+owner, 120, JSON.stringify(yourEvents));
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

export const lockEvent = asyncHandler(async (req, res) => {
  const event_id = req.params.event_id;
  try {
    const event = await Event.updateOne(
      { _id: event_id },
      {
        $set: {
          lock: true,
        },
      }
    );
    res.status(200).json({ message: "Event locked successfully" });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error Locking Event");
  }
});

export const unlockEvent = asyncHandler(async (req, res) => {
  const event_id = req.params.event_id;
  try {
    const event = await Event.updateOne(
      { _id: event_id },
      {
        $set: {
          lock: false,
        },
      }
    );
    res.status(200).json({ message: "Event unlocked successfully" });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("Error Unlocking Event");
  }
});  