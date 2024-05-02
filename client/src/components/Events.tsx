"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Cookies from "js-cookie";

type DialogProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  open?: boolean;
};

const Events = ({ user_id = "string" }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImageName, setEventImageName] = useState("");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const _id = Cookies.get("_id");
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/add-event/` + _id;

    const eventData = {
      name: eventName,
      event_date: eventDate,
      registration_date: registrationDate,
      description: eventDescription,
      img_name: eventImageName,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      toast.success("Event Added Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error occurred during API request:", error);
      toast.error("Failed to add Event. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsEventModalOpen(false);
  };
  return (
    <>
      {isEventModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsEventModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Create Event</h3>
            <form onSubmit={handleEventSubmit}>
              <div className="mb-2">
                <label className="label-text">Event Name:</label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="label-text">Event Date:</label>
                <input
                  className="input input-bordered w-full"
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="label-text">Registration Date:</label>
                <input
                  className="input input-bordered w-full"
                  type="datetime-local"
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="label-text">Description:</label>
                <textarea
                  className="input input-bordered w-full"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="label-text">Image Name:</label>
                <input
                  className="input input-bordered w-full"
                  type="text"
                  value={eventImageName}
                  onChange={(e) => setEventImageName(e.target.value)}
                  required
                />
              </div>
              <div className="modal-action">
              <button className="btn btn-active btn-secondary justify-end form-submit">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex flex-col w-[100vw] p-2 lg:p-5">
        <div className="flex p-2 justify-end">
          <button
            className="btn btn-active btn-primary"
            onClick={() => setIsEventModalOpen(true)}
          >
            Host Event
          </button>
        </div>
      </div>
    </>
  );
};

export default Events;
