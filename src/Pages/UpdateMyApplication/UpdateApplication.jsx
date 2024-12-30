import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import AuthContext from "../../AuthContext/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpdateApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosSecure()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["/updateApplication", id],
    queryFn: () => {
      return axiosInstance.get(`/application/${id}`);
    },
  });

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p className="text-red-600">{error.message}</p>;
  }

  const submitHandler = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const companyName = form.companyName.value;
    const position = form.position.value;
    const jobId = id;
    const email = form.email.value;
    const linkDing = form.linkDing.value;
    const github = form.github.value;
    const resume = form.resume.value;

    const updatedData = {
      companyName,
      position,
      jobId,
      email,
      linkDing,
      github,
      resume,
    };
    axiosInstance
      .patch(`/updateApplication/${id}`, updatedData)
      .then((data) => {
        if (
          data?.data?.modifiedCount > 0 ||
          (data?.data?.matchedCount === 1 && data?.data?.modifiedCount === 0)
        ) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/MyApplications");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div>
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
              defaultValue={data?.data?.companyName}
              type="text"
              placeholder="Company Name"
              className="input input-bordered"
              readOnly
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Position</span>
            </label>
            <input
              name="position"
              defaultValue={data?.data?.position}
              type="text"
              placeholder="Position"
              className="input input-bordered"
              readOnly
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
              defaultValue={data.data.linkDing}
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
              defaultValue={data.data.github}
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
              defaultValue={data.data.resume}
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

export default UpdateApplication;
