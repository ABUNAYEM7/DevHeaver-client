import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext} from "react";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../AuthContext/AuthContext";
import Swal from "sweetalert2";
import { ThreeCircles } from "react-loader-spinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const JobApply = () => {
  const axiosInstance = useAxiosSecure()
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jobApply", id],
    queryFn: () => {
      return axiosInstance.get(`/Details/${id}`);
    },
  });

  if (isError) {
    return <p className="text-red-600">{error.message}</p>;
  }

  const submitHandler = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const jobId = id;
    const companyName = form.companyName.value;
    const position = form.position.value;
    const email = form.email.value;
    const linkDing = form.linkDing.value;
    const github = form.github.value;
    const resume = form.resume.value;

    const appliCationData = {
      companyName,
      position,
      jobId,
      email,
      linkDing,
      github,
      resume,
    };

    axiosInstance
      .post(`/applyJobs`, appliCationData)
      .then((data) => {
        if (data.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          navigate("/MyApplications");
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.message || err.code,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="my-6 p-4 bg-bannerBg min-h-[550px] bg-cover bg-center">
      {isLoading && (
        <div className="my-3 w-full flex items-center justify-center">
          <h3 className="my-8 text-highlight font-bold text-center text-4xl">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </h3>
        </div>
      )}
      <div className="my-3 p-2">
        <h3 className="text-2xl font-bold text-primary text-center">
          Apply Your Dream Job
        </h3>
        <p className="text-base font-medium  w-[80%] text-center mx-auto">
          Get Hired Withing a moment and Achieved Your Dream
        </p>
      </div>
      <div>
        <form
          onSubmit={(e) => submitHandler(e, data?.data?._id)}
          className="card-body  className='my-6 p-4 grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center'"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input
              name="companyName"
              defaultValue={data?.data?.company}
              type="text"
              placeholder="Company Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Position</span>
            </label>
            <input
              name="position"
              defaultValue={data?.data?.title}
              type="text"
              placeholder="Position"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <input
              name="email"
              defaultValue={user?.email}
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">LinkDing Link</span>
            </label>
            <input
              name="linkDing"
              type="url"
              placeholder="URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Github Link</span>
            </label>
            <input
              name="github"
              type="url"
              placeholder="URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Resume Link</span>
            </label>
            <input
              name="resume"
              type="url"
              placeholder="URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6 col-span-1 md:col-span-2">
            <button className="btn bg-primary text-white hover:text-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
