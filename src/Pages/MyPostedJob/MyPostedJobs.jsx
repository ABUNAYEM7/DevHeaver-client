import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { ThreeCircles } from "react-loader-spinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosSecure()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["MyPostedJobs", email],
    queryFn: () => {
      return axiosInstance.get(`/jobs?email=${email}`);
    },
  });

  const deleteHandler = (id) => {
    axiosInstance
      .delete(`/myPostedJob/${id}`)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application Delete Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          queryClient.setQueriesData(["MyPostedJobs", email], (oldData) => {
            return {
              ...oldData,
              data: oldData.data.filter((data) => data._id !== id),
            };
          });
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
      });
  };

  if (isError) {
    return <p className="text-red-500">{error.message}</p>;
  }

  if (data?.data?.length === 0) {
    return (
      <p className="my-12 text-center text-3xl font-bold text-red-600">
        No Post Available{" "}
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
              <th>Category</th>
              <th>Position</th>
              <th>Application Count</th>
              <th>Update</th>
              <th>View Candidate</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data?.map((job, i) => (
              <tr key={i} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{job.company}</td>
                <td>{job.category}</td>
                <td>{job.applyCount}</td>
                <td>{job.title}</td>
                <td>
                  <button
                    onClick={() => navigate(`/UpdateMyPost/${job._id}`)}
                    className="btn bg-highlight text-white hover:text-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/ViewCandidate/jobs/${job._id}`)}
                    className="btn bg-highlight text-white hover:text-primary"
                  >
                    View Candidate
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteHandler(job._id)}
                    className="btn bg-primary text-white hover:text-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;
