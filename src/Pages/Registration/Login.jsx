import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import AuthContext from "../../AuthContext/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const { state } = useLocation();
  const redirect = state || "/";
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;
    signInUser(email, pass)
      .then((user) => {
        if (user) {
          const userEmail = {
            email,
          };
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Log In Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
            navigate(redirect);
        }
      })
      .catch((err) => {
        const errMessage = err.message.split("/")[1].split(")")[0];
        Swal.fire({
          title: errMessage || err.code,
          text: "Please Try Again",
          icon: "err",
        });
      });
  };

  const googleHandler = () => {
    signInWithGoogle()
      .then((res) => {
        const user = res.user?.email;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
          navigate(redirect);
      })
      .catch((err) => {
        const errMessage = err.message.split("/")[1].split(")")[0];
        setError(errMessage || err.code);
      });
  };

  return (
    <div className="bg-registrationBg  bg-no-repeat bg-cover bg-center p-4">
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse gap-5">
          <div className="text-center lg:text-left w-full md:w-1/2">
            <h1 className="text-5xl font-bold">
              Login <span className="text-highlight">now!</span>
            </h1>
            <p className="py-6">
              The registration page is a crucial gateway for job seekers and
              employers to access the full range of features offered by our job
              portal. Designed for simplicity and efficiency, the page allows
              users to create an account effortlessly
            </p>
          </div>
          <div className="card w-full md:w-2/5 shrink-0 shadow-2xl">
            <div className="p-2 w-full space-y-2 text-center">
              <h1 className="text-xl font-bold text-center">
                Register with Social Media
              </h1>
              <button
                onClick={googleHandler}
                className="w-11/12 mx-auto btn bg-highlight text-white hover:text-highlight"
              >
                Sign Up Google
              </button>
            </div>
            <div className="divider">OR Go With</div>
            <form onSubmit={submitHandler} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="pass"
                  type={show ? "tex" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <button
                  onClick={() => setShow(!show)}
                  type="button"
                  className="absolute top-12 right-3"
                >
                  {show ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </button>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-white md:text-highlight"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-highlight text-white hover:text-highlight border-none">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
