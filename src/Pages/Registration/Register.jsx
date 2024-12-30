import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../../AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { registerUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const { state } = useLocation();
  const redirect = state || "/";
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const pass = form.pass.value;

    if (pass.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (!/[a-z]/.test(pass)) {
      return setError("Password must contain at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(pass)) {
      return setError("Password must contain at least one uppercase letter.");
    }
    if (!/\d/.test(pass)) {
      return setError("Password must contain at least one number.");
    }

    registerUser(email, pass)
      .then((user) => {
        if (user) {
          const updatedData = {
            displayName: name,
            photoURL: photo,
          };
          updateUserProfile(updatedData).then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Log In Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            form.reset();
            navigate(redirect);
          });
        }
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

  const googleHandler = () => {
    signInWithGoogle()
      .then((res) => {
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
        const errMessage = err.message?.split("/")[1].split(")")[0];
        setError(errMessage || err.code);
      });
  };

  return (
    <div className="bg-registrationBg  bg-no-repeat bg-cover bg-center p-4">
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse gap-5">
          <div className="text-center lg:text-left w-full md:w-1/2">
            <h1 className="text-5xl font-bold">
              Register <span className="text-highlight">now!</span>
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
                  <span className="label-text">User Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="User Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL </span>
                </label>
                <input
                  name="photo"
                  type="text"
                  placeholder="Phot URL"
                  className="input input-bordered"
                  required
                />
              </div>
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
                {error && (
                  <label className="label">
                    <p className="text-base font-medium text-secondary">
                      {error}
                    </p>
                  </label>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-primary text-white hover:text-primary border-none">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
