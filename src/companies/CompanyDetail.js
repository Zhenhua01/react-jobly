import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import JoblyApi from '../utils/api';
import Loading from '../utils/Loading';
import JobCardList from '../jobs/JobCardList';
import userContext from '../context/userContext';


/**
 * Company details with list of jobs
 *
 * Props: none
 * State: company { handle, name, description, jobs: [{job}, ...] }
 *
 * Context: user
 *  {username, firstName, lastName, email, isAdmin, applications:[]}
 *
 * RoutesList -> CompanyDetails -> JobCardList -> JobCard
 */

function CompanyDetail() {
  const { user } = useContext(userContext);

  const params = useParams();
  const companyHandle = params.handle;

  const [company, setCompany] = useState({
    company: [],
    isLoading: true
  });

  useEffect(function getCompanyOnLoad() {
    async function getCompany() {

      const company = await JoblyApi.getCompany(companyHandle);

      setCompany({
        company: company,
        isLoading: false
      });
    }

    getCompany()

  }, [user, companyHandle]);

  if (company.isLoading) return <Loading />;

  const { name, description, jobs } = company.company;

  return (
    <div className="CompanyDetail container-fluid col-8 offset-2">
      <h2 className='m-3'>{name}</h2>
      <p className='m-3'>{description}</p>
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default CompanyDetail;