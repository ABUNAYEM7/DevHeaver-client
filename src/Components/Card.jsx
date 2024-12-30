import { FaLocationDot } from "react-icons/fa6"
import { Link } from "react-router";

const Card = ({ job }) => {

    const {
        _id,
        title,
        location,
        jobType,
        category,
        applicationDeadline,
        salaryRange,
        description,
        company,
        requirements,
        responsibilities,
        status,
        hr_email,
        hr_name,
        company_logo
      } = job;

  return (
    <div className="card bg-base-100 max-w-96 shadow-xl border-2 hover:scale-105 duration-200">
     <div className="flex gap-2 items-center p-4">
     <figure>
        <img
          src={company_logo}
          alt="logo"
        />
      </figure>
      <div>
        <h3 className="text-xl font-semibold text-primary ">
           {company}</h3>
        <p className="text-base font-medium text-secondary flex items-center"> <FaLocationDot/> {location}</p>
      </div>
     </div>
      <div className="card-body p-4 space-y-1">
        <h2 className="card-title">{title}</h2>
        <div className="flex items-center gap-2">
            <h3 className="text-base font-medium">Job-Type : <span className="text-highlight">{jobType}</span></h3>
            <h3 className="text-base font-medium">Deadline : <span className="text-highlight">{applicationDeadline}</span></h3>
        </div>
        <p className="text-base text-secondary">{description}</p>
        <div className="card-actions justify-end">
        <div className="flex gap-2 items-center flex-wrap">
                {
                    requirements?.map((item,i)=>
                    <p 
                    className="p-2 border rounded-xl border-highlight text-xs text-center hover:text-highlight hover:border-primary hover:scale-105 duration-200"
                    key={i}>
                        {item}
                    </p>)
                }
        </div>
        <div>
        </div>
          <div className="flex items-center gap-2">
          <h2 className="text-base font-medium text-primary text-start">salary : {salaryRange.min}$ - {salaryRange.max}$</h2>
          <Link 
          to={`/Details/${_id}`}
          className="btn bg-highlight text-white hover:text-highlight">Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
