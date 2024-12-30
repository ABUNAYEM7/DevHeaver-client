import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Card from "../../Components/Card";
import { ThreeCircles } from "react-loader-spinner";

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => {
      return axios.get(`http://localhost:3000/jobs?home=true`, {
        withCredentials: true,
      });
    },
  });

  if (isLoading) {
    return (
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
    );
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="my-12 p-4">
      {/* job-container */}
      <div>
        <h3 className="text-3xl font-bold text-highlight text-center">
          Jobs Of The Day
        </h3>
        <p className="text-base font-medium text-secondary text-center">
          Search and connect with the right candidates faster.
        </p>
        <div className="my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
          {data?.data?.map((job) => (
            <Card job={job} key={job._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
