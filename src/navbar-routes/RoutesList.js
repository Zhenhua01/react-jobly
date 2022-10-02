import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from '../homepage/HomePage';
import CompanyList from '../companies/CompanyList';
import JobList from '../jobs/JobList';
import CompanyDetail from '../companies/CompanyDetail';
import SignupForm from '../forms/SignupForm';
import LoginForm from '../forms/LoginForm';
import ProfileForm from '../forms/ProfileForm';
import { useContext } from "react";
import userContext from '../context/userContext';

/** Routes for Jobly
 *
 * Context: user
 *  {username, firstName, lastName, email, isAdmin, applications:[]}
*/

function RoutesList({ signup, login, update }) {
  const { user } = useContext(userContext);

  return (
    <div className="RoutesList">

      <Routes>
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<HomePage />} />

        {user &&
          <>
            <Route path='/companies' element={<CompanyList />} />
            <Route path='/jobs' element={<JobList />} />
            <Route path='/companies/:handle' element={<CompanyDetail />} />
            <Route path='/profile' element={<ProfileForm update={update} />} />
          </>
        }

        <Route path='/signup' element={<SignupForm signup={signup} />} />
        <Route path='/login' element={<LoginForm login={login} />} />
      </Routes>

    </div>
  );
}

export default RoutesList;