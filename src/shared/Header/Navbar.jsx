import React, { useContext, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../../AuthContext/AuthContext";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const logOutHandler = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "LogOut successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        const errMessage = err.message.split("/")[1].split(")")[0];
        Swal.fire({
          title: errMessage,
          text: "Please Try Again",
          icon: "error",
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink  to={"/AllJobs"}>
          All Jobs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/AddNewJob"}>Add New Vacancy</NavLink>
          </li>
          <li>
            <NavLink to={"/MyApplications"}>My Applications</NavLink>
          </li>
          <li>
            <NavLink to={"/MyPostedJobs"}>My Post</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
          >
            {links}
          </ul>
        </div>
        <div>
          <Link to={"/"}>
            <img
              className="w-14 h-14 rounded-full ring-2 ring-blue-400 p-2"
              src={"/logo.jpg"}
              alt="logo"
            />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
      </div>
      <div className="navbar-end space-x-1 m:space-x-4">
        {user ? (
          <div>
            {/* photo-url-condition */}
            {user.photoURL ? (
              <div className="dropdown">
                <div tabIndex={0} role="button">
                  <img
                    className="w-14 h-14 rounded-full p-2 ring-2 ring-highlight"
                    src={user?.photoURL}
                    alt="user-photo"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content right-10 top-14 menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                >
                  <li>
                    <p className="text-xs font-medium">{user?.displayName}</p>
                  </li>
                  <li>
                    <button
                      onClick={logOutHandler}
                      className="btn bg-primary text-white hover:text-primary"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <h3 className="p-4">
                <FaUser size={20} />
              </h3>
            )}
          </div>
        ) : (
          <div>
            <NavLink
              className={"btn bg-primary text-white hover:text-primary"}
              to={"/Login"}
            >
              Login
            </NavLink>
            <NavLink
              className={"btn bg-primary text-white hover:text-primary"}
              to={"/Register"}
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
