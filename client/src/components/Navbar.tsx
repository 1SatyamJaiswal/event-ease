"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const handleLogout = () => {
    Cookies.remove("_id");
    setIsUserLoggedIn(false);
  };
  useEffect(() => {
    const user_id = Cookies.get("_id");
    setIsUserLoggedIn(!!user_id);
  }, []);
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
              <Link href="#">Homepage</Link>
            </li>
            <li>
              <Link href="#">Portfolio</Link>
            </li>
            <li>
              <Link href="#">About</Link>
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
            <div className="indicator">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </Link>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
