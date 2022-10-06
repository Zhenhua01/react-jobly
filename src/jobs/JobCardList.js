import JobCard from './JobCard';


/** Creates JobCards from list of jobs.
 *
 * Prop: jobs [{job}, ...]
 *
 * JobList -> JobCardList -> JobCard
 */

function JobCardList({ jobs }) {

  return (
    <ul>
      {jobs.map(job => {
        return <li key={job.id}>
          <JobCard job={job} />
        </li>;
      })}
    </ul>
  );
}

export default JobCardList;