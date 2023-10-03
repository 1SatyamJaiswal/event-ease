"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventsPage = () => {
  const eventPath = usePathname();
  const regexPattern = /^\/events\/([a-fA-F0-9]+)$/;
  const matchResult = eventPath.match(regexPattern);
  const eventId = matchResult ? matchResult[1] : null;
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImageName, setEventImageName] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const user_id = Cookies.get("_id");

  interface Owner {
    _id: string;
    name: string;
    age: number;
    city: string;
    email: string;
    password: string;
    __v: number;
  }

  interface Event {
    _id: string;
    name: string;
    event_date: string;
    registration_date: string;
    description: string;
    impressions: number;
    registrations: number;
    img_name: string;
    owner: Owner;
    __v: number;
  }
  const [event, setEvent] = useState<Event>({
    _id: "",
    name: "",
    event_date: "",
    registration_date: "",
    description: "",
    impressions: 0,
    registrations: 0,
    img_name: "",
    owner: {
      _id: "",
      name: "",
      age: 0,
      city: "",
      email: "",
      password: "",
      __v: 0,
    },
    __v: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/event/get/" + eventId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setEvent(data);
        setEventName(data.name);
        setEventDate(data.event_date);
        setRegistrationDate(data.registration_date);
        setEventDescription(data.description);
        setEventImageName(data.img_name);
        if (user_id === data.owner._id) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const requestBody = {
      user_id: user_id,
      event_id: eventId,
    };
    const fetchRegisterData = async () => {
      try {
        const response = await fetch("http://localhost:5000/register/get", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setIsRegistered(data.registered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    fetchRegisterData();
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
  }, [isRegistered,isFormSubmitted]);
  const handleRegister = async () => {
    const requestBody = {
      user_id: user_id,
      event_id: eventId,
    };
    try {
      const response = await fetch("http://localhost:5000/register/add", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      toast.success("Registered for Event Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to register for the event!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDeregister = async () => {
    const requestBody = {
      user_id: user_id,
      event_id: eventId,
    };
    try {
      const response = await fetch("http://localhost:5000/register/remove", {
        method: "PATCH",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      toast.success("Unregistered for Event Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsRegistered(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to unregister for the event!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = "http://localhost:5000/event/edit/" + eventId;

    const eventData = {
      name: eventName,
      event_date: eventDate,
      registration_date: registrationDate,
      description: eventDescription,
      img_name: eventImageName,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      setIsFormSubmitted(true);
      if (!response.ok) {
        throw new Error("API request failed");
      }

      toast.success("Event Updated Successfully!", {
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
      toast.error("Failed to Update Event. Please try again.", {
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
    <div className="hero py-10 bg-base-100">
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
                  value={eventDate.slice(0,16)}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="label-text">Registration Date:</label>
                <input
                  className="input input-bordered w-full"
                  type="datetime-local"
                  value={registrationDate.slice(0,16)}
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
                <button className="btn btn-active btn-secondary justify-end form-submit">
                  Update Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="hero-content flex-col lg:flex-row items-center justify-center">
        <img
          src={`/images/${event.img_name}`}
          className="max-w-lg rounded-lg shadow-2xl"
          alt={event.name}
        />
        <div className="text-center lg:text-left lg:ml-6 mt-6 lg:mt-0">
          <div className="flex items-center">
            <h1 className="text-5xl font-bold">{event.name}</h1>
            {isOwner && (
              <button
                className="btn btn-square btn-sm"
                onClick={() => setIsEventModalOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            )}
          </div>
          <p className="py-6">{event.description}</p>
          <p>Event Date: {new Date(event.event_date).toLocaleDateString()}</p>
          <p>
            Registration Deadline:{" "}
            {new Date(event.registration_date).toLocaleDateString()}
          </p>
          <p>Organizer: {event.owner.name}</p>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Impressions</div>
              <div className="stat-value text-primary">{event.impressions}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Registrations</div>
              <div className="stat-value text-secondary">
                {event.registrations}
              </div>
            </div>
          </div>
          {isRegistered ? (
            <>
              <p className="m-4">Registered</p>
              <button
                className="btn btn-primary m-4"
                onClick={handleDeregister}
              >
                Unregister
              </button>
            </>
          ) : (
            <button className="btn btn-primary m-4" onClick={handleRegister}>
              Register
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventsPage;
