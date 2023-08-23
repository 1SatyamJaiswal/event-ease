"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

const EventsPage = () => {
  const eventPath = usePathname();
  const regexPattern = /^\/events\/([a-fA-F0-9]+)$/;
  const matchResult = eventPath.match(regexPattern);
  const eventId = matchResult ? matchResult[1] : null;
  const [isRegistered, setIsRegistered] = useState(false);
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
  }, [isRegistered]);
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
        setIsRegistered(true);
      } catch (error) {
        console.error(error);
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
        setIsRegistered(false);
      } catch (error) {
        console.error(error);
      }
  }
  return (
    <div className="hero py-10 bg-base-100">
      <div className="hero-content flex-col lg:flex-row items-center justify-center">
        <img
          src={`/images/${event.img_name}`}
          className="max-w-lg rounded-lg shadow-2xl"
          alt={event.name}
        />
        <div className="text-center lg:text-left lg:ml-6 mt-6 lg:mt-0">
          <h1 className="text-5xl font-bold">{event.name}</h1>
          <p className="py-6">{event.description}</p>
          <p>Event Date: {new Date(event.event_date).toLocaleDateString()}</p>
          <p>
            Registration Deadline:{" "}
            {new Date(event.registration_date).toLocaleDateString()}
          </p>
          <p>Owner: {event.owner.name}</p>
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
            <button className="btn btn-primary m-4" onClick={handleDeregister}>
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
    </div>
  );
};

export default EventsPage;
