import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import JoblyApi from './utils/api';
import NavBar from './navbar-routes/NavBar';
import RoutesList from './navbar-routes/RoutesList';
import userContext from './context/userContext';
import jwt from 'jwt-decode';
import Loading from './utils/Loading';


const initialLoad = {
  isLoading: true,
  data: null
};

/** Jobly Application.
 *
 * Prop: None
 *
 * State:
 *  - user: object data from API on authenticated user
 *  - token: authentication JWT from API
 *
 * App -> JoblyApp -> { NavBar, RoutesList }
*/

function JoblyApp() {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialLoad);
  // console.log("inside JoblyApp");

  // Checks for logged in user and sets local storage if there's a token
  useEffect(function getUserDataAndLocalStorage() {
    // console.log("inside JoblyApp useEffect");
    function setLocalStorage() {
      localStorage.setItem('token', token);
    }

    async function getUserData() {
      const user = jwt(token);
      JoblyApi.token = token;
      const userData = await JoblyApi.getUserInfo(user.username);

      setUser({
        isLoading: false,
        data: userData
      });
    }

    if (token) {
      setLocalStorage();
      getUserData();
    } else {
      setUser({
        isLoading: false,
        data: null
      });
    }

  }, [token]);

  /** Handles signing up a new user, logs them in, and saves token. */
  async function signup(formData) {
    const token = await JoblyApi.signup(formData);
    setToken(token);
    setUser(initialLoad);
  }

  /** Handles loggin in a user and saves token. */
  async function login(formData) {
    const token = await JoblyApi.login(formData);
    setToken(token);
    setUser(initialLoad);
  }

  /** Handles updating user information. */
  async function update(formData) {
    delete formData.username;
    await JoblyApi.update(user.data.username, formData);
    const userData = await JoblyApi.getUserInfo(user.data.username);
    setUser({
      isLoading: false,
      data: userData
    });
  }

  /** Handles logging out user, removes user info and token. */
  function logout() {
    localStorage.clear();
    setToken(null);
    setUser({
      isLoading: false,
      data: null
    });
  }

  /** Handles user applying to a job. */
  async function apply(id) {
    const updatedUser = await JoblyApi.applyToJob(user.data.username, id);
    setUser({
      isLoading: false,
      data: updatedUser
    });
  }
  console.log("user", user)
  // Wait for useEffect to check for logged in user to set user/token
  if (user.isLoading) return <Loading />;

  return (
    <userContext.Provider value={{ user: user.data, apply }}>
      <div className="JoblyApp">
        <BrowserRouter>
          <NavBar logout={logout} />
          <RoutesList
            signup={signup}
            login={login}
            update={update}
          />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default JoblyApp;

