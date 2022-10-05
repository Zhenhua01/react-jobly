import { Link } from 'react-router-dom';
import './CompanyCard.css';

/**
 * Presentational Component for displaying each company
 *
 * Props: company: { handle, name, description }
 *
 * Context: user
 *  {username, firstName, lastName, email, isAdmin, applications:[]}
 *
 * RoutesList -> CompanyList -> {SearchForm, CompanyCard}
 */
function CompanyCard({ company }) {
  const { handle, name, description, logoUrl } = company;

  return (
    <div className='container-fluid col-8 bg-white rounded'>
      <Link className="link" to={`/companies/${handle}`} key={handle}>
        <div className='CompanyCard mb-4'>

          <h5><u>{ name }</u>
            {logoUrl &&
              <img className='logo float-end' src={logoUrl} alt={`${name}-logo`} />}
          </h5>
          <p>{description}</p>

        </div>
      </Link>
    </div>
  );

};

export default CompanyCard;