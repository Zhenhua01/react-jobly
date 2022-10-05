import './JobCard.css';
import { useContext } from "react";
import userContext from '../context/userContext';
/**
 * Presentational Component for Job
 *
 * Prop: job {id, ...}
 *
 * JobCardList -> Job Card
 */
function JobCard({ job }) {
  const { user, apply } = useContext(userContext);
  const { id, title, salary, equity, companyName } = job;

  const hasApplied = user.applications.includes(id);


  return (
    <div className="JobCard container-fluid col-8 mb-3 bg-white rounded">
      <h5><u>{title}</u></h5>
      <p>
        {companyName}
        <br></br>
        Salary: {salary}
        <br></br>
        Equity: {equity}
      </p>

      <button
        onClick={() => { apply(id); }}
        disabled={hasApplied}
        className='btn btn-primary'>{hasApplied ? "Applied" : "Apply"}
      </button>

    </div>
  );
}
export default JobCard;