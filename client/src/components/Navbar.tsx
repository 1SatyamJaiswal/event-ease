"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username,setUserName] = useState('');
  const handleLogout = () => {
    Cookies.remove("_id");
    setIsUserLoggedIn(false);
  };
  useEffect(() => {
    const user_id = Cookies.get("_id");
    setIsUserLoggedIn(!!user_id);
    if(isUserLoggedIn){
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/user/info/" + user_id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setUserName(data.name);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [isUserLoggedIn]);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Homepage</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            {isUserLoggedIn && (<li>
              <button onClick={handleLogout}>Logout</button>
            </li>)}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          eventEase
        </Link>
      </div>
      <div className="navbar-end">
        {isUserLoggedIn ? (
          <Link className="btn btn-ghost btn-circle" href="/profile">
            {username}
          </Link>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
