import { useState, useEffect } from 'react';
import JoblyApi from '../utils/api';
import SearchForm from '../forms/SearchForm';
import JobCardList from './JobCardList';
import Loading from '../utils/Loading';


/** JobList component for displaying list of jobs.
 *
 * Props: None
 * State: jobs [{job}, ...]
 *
 * RoutesList -> JobList -> { SearchForm, JobCardList }
 */

function JobList() {
  const [jobs, setjobs] = useState({
    jobs: [],
    isLoading: true
  });

  useEffect(function getjobsOnLoad() {
    // console.log("inside JobListing useEffect");

    async function getjobs() {
      const jobs = await JoblyApi.getJobs();

      setjobs({
        jobs: jobs,
        isLoading: false
      });
    }

    getjobs();
  }, []);

  // Accepts formData { search: "term" }
  async function search(job) {
    const data = { title: job.name };
    const searchedjobs = await JoblyApi.getJobs(data);

    setjobs({
      jobs: searchedjobs,
      isLoading: false
    });
  }

  if (jobs.isLoading) return <Loading />;

  return (
    <div className="JobList container-fluid mt-3 mb-3">
      <div className='row justify-content-center'>
        <SearchForm search={search} />
      </div>
      <div>
        <JobCardList jobs={jobs.jobs} />
      </div>
    </div>
  );
}

export default JobList;