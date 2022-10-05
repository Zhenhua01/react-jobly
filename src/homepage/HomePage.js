import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from '../context/userContext';

/**Presentational Component:
 * HomePage for Jobly App
 *
 * Context: user
 *  {username, firstName, lastName, email, isAdmin, applications:[]}
 *
 * RoutesList -> HomePage
 */
function HomePage() {
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  function loginClick() {
    navigate("/login");
  }

  function signupClick() {
    navigate("/signup");
  }

  return (
    <div className="HomePage">
      <div className="container-fluid text-center">
        <h1 class="mt-3 mb-3">Jobly</h1>

        {user &&
          <>
            <h4>Welcome back {user.firstName}</h4>
          </>
        }

        {!user &&
          <>
            <h4 class="mb-4">All the jobs in one, convenient place.</h4>
            <button type="button"
              onClick={loginClick}
              className="btn btn-lg btn-info fw-bold me-3">
              Login
            </button>
            <button type="button"
              onClick={signupClick}
              className="btn btn-lg btn-info fw-bold">
              Signup
            </button>
          </>
        }
      </div>
    </div>
  );
}

export default HomePage;