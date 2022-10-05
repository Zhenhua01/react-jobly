import { useState, useEffect } from 'react';
import JoblyApi from '../utils/api';
import SearchForm from '../forms/SearchForm';
import CompanyCard from './CompanyCard';
import Loading from '../utils/Loading';

/**
 * List of Companies
 *
 * Props: None
 * State: companies [{company}, ...]
 *
 * Context: user
 *  {username, firstName, lastName, email, isAdmin, applications:[]}
 *
 * RoutesList -> CompanyList -> {SearchForm, CompanyCard}
 */

function CompanyList() {
  console.log("CompanyListing");

  const [companies, setCompanies] = useState({
    companies: [],
    isLoading: true
  });

  useEffect(function getCompaniesOnLoad() {
    console.log("inside CompanyList useEffect");

    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();

      setCompanies({
        companies: companies,
        isLoading: false
      });
    }

    getCompanies();
  }, []);

  //Accepts formData { name: ... }
  async function search(company) {
    const searchedCompanies = await JoblyApi.getCompanies(company);

    setCompanies({
      companies: searchedCompanies,
      isLoading: false
    });
  }

  if (companies.isLoading) return <Loading />;

  return (
    <div className="CompanyList container-fluid mt-3 mb-3">
      <div className='row justify-content-center'>
        <SearchForm search={search} />
      </div>
      <div>
        <ul>
          {companies.companies.map(company => (
            <li key={company.handle}><CompanyCard company={company} /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CompanyList;