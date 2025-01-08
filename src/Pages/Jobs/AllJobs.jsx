import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../Components/Card";
import { ThreeCircles } from "react-loader-spinner";
import { debounce } from "lodash";

const AllJobs = () => {
  const [search,setSearch] = useState('')
  const [sort,setSort] = useState(false)
  const [min,setMin] = useState('')
  const [max,setMax] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jobs",search,sort,min,max],
    queryFn: () => {
      return axios.get(`${import.meta.env.VITE_API_URL}/jobs?search=${search}&sort=${sort}&min=${min}&max=${max}`, {
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


  // search-handler-with-debounce
  const searchHandler=debounce((e)=>setSearch(e.target.value),1000)

  const minHandler =debounce((e)=>setMin(e.target.value),800)
  const maxHandler =debounce((e)=>setMax(e.target.value),800)


  return (
    <div>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold text-center">All Jobs Are</h3>
        <p className="text-xl font-medium w-11/12 md:w-2/3 mx-auto text-center">
          Find Your Best Position With secure process Only In DevHeaven{" "}
        </p>
      </div>
      <div className="my-3 w-full p-4 flex flex-col md:flex-row items-center gap-5">
      <input
        type="text"
        Value={search}
        onChange={searchHandler}
        placeholder="Search here By Job Title"
        className="input input-bordered input-info w-full md:w-2/3"
      />
      <button 
      onClick={()=>setSort(!sort)}
      className="btn bg-highlight text-white hover:text-highlight mx-10">{sort ? 'Sorted By Minimum Salary' : 'Sort By Minimum Salary'}</button>
      </div>
      <div className="my-3 w-full p-4 flex flex-col md:flex-row items-center gap-5">
      <input
        type="number"
        Value={min}
        onChange={minHandler}
        placeholder="Search By Min Salary"
        className="input input-bordered input-info w-full md:w-2/3"
      />
      <input
        type="number"
        Value={max}
        onChange={maxHandler}
        placeholder="Search By Max Salary"
        className="input input-bordered input-info w-full md:w-2/3"
      />
      </div>
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
        {data?.data?.map((job) => (
          <Card job={job} key={job._id} />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
