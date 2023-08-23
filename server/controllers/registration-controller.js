import Registration from "../model/Registration.js";
import Event from "../model/Event.js";
import asyncHandler from "express-async-handler";

export const getRegistration = asyncHandler(async (req, res) => {
  const { user_id, event_id } = req.body;

  const registrationExists = await Registration.findOne({
    participant: user_id,
    event: event_id,
  });

  if (registrationExists) {
    res.status(200).send({ registered: true });
  } else {
    res.status(200).send({ registered: false });
  }
});

export const addRegistration = asyncHandler(async (req, res) => {
  const { user_id, event_id } = req.body;

  try {
    const registration = await Registration.create({
      event: event_id,
      participant: user_id,
    });
    if (registration) {
      const updatedEvent = await Event.findOne({ _id: event_id }).populate(
        "owner"
      );
      if (updatedEvent) {
        updatedEvent.registrations += 1;
        await updatedEvent.save();
        res.status(200).json({
          event_id: event_id,
          user_id: user_id,
        });
      }
    } else {
      res.status(404).json({ message: "Failed to register" });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
});

export const removeRegistration = asyncHandler(async (req, res) => {
  const { user_id, event_id } = req.body;

  try {
    const deletedRegistration = await Registration.findOneAndDelete({
      event: event_id,
      participant: user_id,
    });

    if (deletedRegistration) {
      const updatedEvent = await Event.findOne(
        { _id: event_id }
      ).populate("owner");

      if (updatedEvent) {
        updatedEvent.registrations -= 1;
        await updatedEvent.save();
        res.status(200).json({
          event_id: event_id,
          user_id: user_id,
        });
      }
    } else {
      res.status(404).json({ message: "Registration not found" });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
});
