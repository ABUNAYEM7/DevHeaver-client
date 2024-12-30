import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ViewCandidate = () => {
  const { jobId } = useParams();
  const axiosInstance = useAxiosSecure()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["viewCandidate", jobId],
    queryFn: () => {
      return axiosInstance.get(`/view-candidate/jobs/${jobId}`);
    },
  });

  if (isError) {
    return <p className="text-red-500">{error.message}</p>;
  }

  const changeHandler = (e, id) => {
    const updatedData = {
      status: e.target.value,
    };
    axiosInstance
      .patch(`/review-application/${id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (data?.data?.length <= 0) {
    return (
      <p className="my-12 text-center text-3xl text-red-600 font-bold">
        No Applicant in this job
      </p>
    );
  }

  return (
    <div>
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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No:</th>
              <th>Company Name</th>
              <th>Applicant Email</th>
              <th>Position</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data?.map((job, i) => (
              <tr key={i} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{job.companyName}</td>
                <td>{job.email}</td>
                <td>{job.position}</td>
                <td>
                  <select
                    onChange={(e) => changeHandler(e, job._id)}
                    defaultValue={job.status || "Change Status"}
                    className="select select-bordered select-xs w-full max-w-xs"
                  >
                    <option disabled>Change Status</option>
                    <option>On Review</option>
                    <option>Short Listed</option>
                    <option>Hired</option>
                    <option>Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCandidate;
