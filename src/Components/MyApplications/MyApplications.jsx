import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyApplications = () => {
  const axiosInstance = useAxiosSecure()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const email = user?.email;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myApplications", email],
    queryFn: () => {
      return axiosInstance.get(`/myApplications?email=${email}`);
    },
  });

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p className="text-red-600">{error.message}</p>;
  }

  const deleteHandler = (id) => {
    axiosInstance
      .delete(`/delete-application/${id}`)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application Delete Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          queryClient.setQueryData(["myApplications", email], (olData) => {
            return {
              ...olData,
              data: olData.data.filter((element) => element._id !== id),
            };
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Failed To Delete",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  if (data?.data?.length <= 0) {
    return (
      <p className="text-3xl text-red-600 font-bold my-12 text-center">
        No Application History
      </p>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No:</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Position</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data?.map((job, i) => (
              <tr key={i} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{job.email}</td>
                <td>{job.companyName}</td>
                <td>{job.position}</td>
                <td>
                  <button
                    onClick={() => navigate(`/UpdateApplication/${job._id}`)}
                    className="btn bg-highlight text-white hover:text-primary"
                  >
                    Update
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

export default MyApplications;
