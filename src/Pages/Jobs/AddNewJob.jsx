import React, { useContext } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddNewJob = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = useAxiosSecure()

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialValue = Object.fromEntries(formData.entries());
    const { min, max, currency, ...newJob } = initialValue;
    newJob.salaryRange = { min:parseInt(min), max:parseInt(max), currency };
    newJob.requirements = newJob.requirements.split("\n");
    newJob.responsibilities = newJob.responsibilities.split("\n");

    axiosInstance
      .post(`/newJob`, newJob)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application Uploaded Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
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
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Job</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        {/* Company Name Field */}
        <div className="form-control">
          <label className="label font-semibold">Company Name</label>
          <input
            name="company"
            type="text"
            placeholder="Company Name"
            className="input input-bordered"
            required
          />
        </div>

        {/* Company Logo URL Field */}
        <div className="form-control">
          <label className="label font-semibold">Company Logo URL</label>
          <input
            name="company_logo"
            type="url"
            placeholder="Logo URL"
            className="input input-bordered"
            required
          />
        </div>

        {/* Job Title Field */}
        <div className="form-control">
          <label className="label font-semibold">Job Title</label>
          <input
            name="title"
            type="text"
            placeholder="Job Title"
            className="input input-bordered"
            required
          />
        </div>

        {/* Location Field */}
        <div className="form-control">
          <label className="label font-semibold">Location</label>
          <input
            name="location"
            type="text"
            placeholder="Location"
            className="input input-bordered"
            required
          />
        </div>

        {/* Job Type Dropdown */}
        <div className="form-control">
          <label className="label font-semibold">Job Type</label>
          <select name="jobType" className="select select-bordered" required>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Job Category Field */}
        <div className="form-control">
          <label className="label font-semibold">Category</label>
          <input
            name="category"
            type="text"
            placeholder="Category"
            className="input input-bordered"
            required
          />
        </div>

        {/* Application Deadline Field */}
        <div className="form-control">
          <label className="label font-semibold">Application Deadline</label>
          <input
            name="applicationDeadline"
            type="date"
            className="input input-bordered"
            required
          />
        </div>

        {/* Salary Range Fields */}
        <div className="form-control">
          <label className="label font-semibold">Salary Minimum</label>
          <input
            name="min"
            type="number"
            placeholder="Minimum Salary"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold">Salary Maximum</label>
          <input
            name="max"
            type="number"
            placeholder="Maximum Salary"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold">Currency</label>
          <select name="currency" className="select select-bordered" required>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BDT">BDT</option>
            <option value="INR">INR</option>
          </select>
        </div>

        {/* Description Field */}
        <div className="form-control">
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            placeholder="Job Description"
            className="textarea textarea-bordered"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Requirements Field (Textarea for multi-line input) */}
        <div className="form-control">
          <label className="label font-semibold">Requirements</label>
          <textarea
            name="requirements"
            placeholder="Enter each requirement on a new line"
            className="textarea textarea-bordered"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Responsibilities Field (Textarea for multi-line input) */}
        <div className="form-control">
          <label className="label font-semibold">Responsibilities</label>
          <textarea
            name="responsibilities"
            placeholder="Enter each responsibility on a new line"
            className="textarea textarea-bordered"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Status Dropdown */}
        <div className="form-control">
          <label className="label font-semibold">Status</label>
          <select name="status" className="select select-bordered" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* HR Email Field */}
        <div className="form-control">
          <label className="label font-semibold">HR Email</label>
          <input
            defaultValue={user?.email}
            name="hr_email"
            type="email"
            placeholder="HR Email"
            className="input input-bordered"
            readOnly
            required
          />
        </div>

        {/* HR Name Field */}
        <div className="form-control">
          <label className="label font-semibold">HR Name</label>
          <input
            defaultValue={user?.displayName}
            name="hr_name"
            type="text"
            placeholder="HR Name"
            className="input input-bordered"
            readOnly
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button className="btn bg-primary text-white w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewJob;
