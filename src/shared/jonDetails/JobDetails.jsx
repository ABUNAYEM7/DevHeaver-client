import { useQuery } from '@tanstack/react-query'
import { ThreeCircles } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router'
import useAxiosSecure from '../../Hooks/useAxiosSecure'

const JobDetails = () => {
    const axiosInstance = useAxiosSecure()
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['Details', id],
        queryFn: () => axiosInstance.get(`/details/${id}`)
    })

    const job = data?.data


    if (isError) {
        return <p className='text-red-500'>{error.message}</p>
    }

    const applyHandler = (id) => {
        navigate(`/apply/${id}`)
    }

    return (
        <div className="card bg-base-100 max-w-[90%] mx-auto shadow-xl my-6 p-4">
            {isLoading && (
                <div className='my-3 w-full flex items-center justify-center'>
                    <h3 className="my-8 text-highlight font-bold text-center text-4xl">
                        <ThreeCircles
                            visible={true}
                            height="100"
                            width="100"
                            color="#4fa94d"
                            ariaLabel="three-circles-loading"
                        />
                    </h3>
                </div>
            )}
            <figure>
                <img src={job?.company_logo} alt="logo" />
            </figure>
            <div className="p-4 space-y-1">
                <h3 className='text-lg md:text-2xl font-bold text-primary text-center my-3'>Job Information</h3>
                <div className='flex flex-col md:flex-row gap-5 items-center justify-between'>
                    <h2 className="card-title text-sm sm:text-2xl">
                        Position : <span className='text-highlight'>{job?.title}</span>
                    </h2>
                    <button onClick={() => applyHandler(job?._id)} className="btn bg-highlight text-white hover:text-highlight">
                        Apply Now
                    </button>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold">Employment Information</h3>
                    <div className='my-3 p-4 flex flex-col gap-2'>
                        <div className='flex md:flex-row flex-col md:items-center justify-between gap-2 text-start'>
                            <p className='text-base text-secondary font-medium'>
                                Industry : <span className='font-semibold text-highlight'>{job?.company}</span>
                            </p>
                            <p className='text-base text-secondary font-medium'>
                                Category : <span className='font-semibold text-highlight'>{job?.category}</span>
                            </p>
                        </div>
                        <div className='flex md:flex-row flex-col md:items-center justify-between gap-2 text-start'>
                            <p className='text-base text-secondary font-medium'>
                                Status : <span className='font-semibold text-highlight'>{job?.status}</span>
                            </p>
                            <p className='text-base text-secondary font-medium'>
                                Job-Type : <span className='font-semibold text-highlight'>{job?.jobType}</span>
                            </p>
                        </div>
                        <div className='flex md:flex-row flex-col md:items-center justify-between gap-2'>
                            <p className='text-base text-secondary font-medium'>
                                Location : <span className='font-semibold text-highlight'>{job?.location}</span>
                            </p>
                            <p className='text-base text-secondary font-medium'>
                                Deadline : <span className='font-semibold text-highlight'>{job?.applicationDeadline}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold my-3">Skills :</h3>
                    <div className="flex gap-2 items-center flex-wrap">
                        {job?.requirements?.map((item, i) => (
                            <p
                                className="p-2 border rounded-xl border-highlight text-xs text-center hover:text-highlight hover:border-primary hover:scale-105 duration-200"
                                key={i}>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold my-3">Responsibilities :</h3>
                    <ul>
                        {job?.responsibilities?.map((r, i) => (
                            <li className='text-base font-medium text-primary list-disc list-inside' key={i}>
                                {r}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-base font-medium my-3">{job?.description}</p>

                <div>
                    <h3 className="text-2xl font-semibold">Salary :</h3>
                    <div className='flex gap-2 items-center flex-wrap'>
                        <p className='text-base font-medium text-primary'>
                            Minimum : {job?.salaryRange?.min}
                        </p>
                        <p className='text-base font-medium text-primary'>
                            Maximum : {job?.salaryRange?.max}
                        </p>
                        <p className='text-base font-medium text-primary'>
                            Currency : {job?.salaryRange?.currency}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
