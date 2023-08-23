"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Cookies from "js-cookie";
import Events from "@/components/Events";
import EventsList from "@/components/EventsList";

type DialogProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  open?: boolean;
};

const Profile = () => {
  type UserData = {
    name: string;
    age: number;
    city: string;
    email: string;
  };
  const [imageUrl, setImageUrl] = useState(`/pfps/1.jpg`);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState(0);
  const [id,setId] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [user, setUser] = useState<UserData>({
    name: "example",
    age: 0,
    city: "Chappri",
    email: "example@example.com",
  });
  useEffect(() => {
    const randomImageNumber = Math.floor(Math.random() * 5) + 1;
    const imageUrl = `/pfps/${randomImageNumber}.jpg`;
    setImageUrl(imageUrl);
    const _id = Cookies.get("_id");
    if (!_id) {
      window.location.href = "/auth";
      return;
    }
    setId(_id);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/info/" + _id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUser(data);
        setName(data.name);
        setAge(data.age);
        setCity(data.city);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRegistrationData = async () => {
      try {
        const response = await fetch("http://localhost:5000/register/getAll/" + _id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setRegisteredEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    fetchRegistrationData();
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted,id]);
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const _id = Cookies.get("_id");
    const apiUrl = "http://localhost:5000/user/edit/" + _id;

    const requestBody = {
      name: name,
      age: age,
      city: city,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      toast.success("Details Updated Successfully!", {
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
      toast.error("Failed to Update. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsModalOpen(false);
    setIsFormSubmitted(true);
  };
  return (
    <div className="flex flex-col items-center bg-base-200">
      <div className="card card-side w-[100vw] max-w-[384px] bg-base-100 my-10 shadow-xl">
        {isLoading ? (
          <span className="loading py-10 text-center loading-bars loading-md"></span>
        ) : (
          <>
            {isModalOpen && (
              <div className="modal modal-open">
                <form
                  method="dialog"
                  className="modal-box"
                  onSubmit={handleUpdateSubmit}
                >
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ✕
                  </button>
                  <h3 className="font-bold text-lg">Edit Profile</h3>
                  <div className="form-control">
                    <label className="label-text">Name:</label>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex">
                    <div className="form-control mr-3">
                      <label className="label-text">Age:</label>
                      <input
                        className="input input-bordered w-full"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value))}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label-text">City:</label>
                      <input
                        className="input input-bordered w-full"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-action">
                    <button className="btn form-submit">Update</button>
                  </div>
                </form>
              </div>
            )}
            <div className="avatar">
              <div className="w-24">
                <Image
                  width={500}
                  className="rounded-l-lg"
                  height={500}
                  src={imageUrl}
                  alt="pfp"
                />
              </div>
            </div>
            <div className="card-body">
              <div>
                <b className="card-title">{user.name}</b>
                <p>
                  {user.age}, {user.city}
                </p>
                <p className="truncate">{user.email}</p>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-square btn-sm"
                  onClick={() => setIsModalOpen(true)}
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
              </div>
            </div>
          </>
        )}
      </div>
      <Events user_id={id}/>
      <h2>Registered Events</h2>
      <EventsList events={registeredEvents} />
      <ToastContainer />
    </div>
  );
};

export default Profile;
