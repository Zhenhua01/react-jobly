import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from '../Context/userContext';

const INITIAL_FORM_DATA = {
  username: '',
  password: '',
};

/** Form for logging in new user.
 *
 * Props:
 * - login: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> LoginForm ->
 */

function LoginForm({ login }) {

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      console.log('before navigate');
      return <Navigate to="/companies" />;
    }
    catch (err) {
      console.log(err);
    }
    // return <Navigate to="/companies" />;
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>

      <div className="mb-3">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          className="form-control"
          onChange={handleChange}
          value={formData.username}
          aria-label="username"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control"
          onChange={handleChange}
          value={formData.password}
          aria-label="password"
          required
        />
      </div>

      <div className="mb-3">
        <button className="btn-primary btn LoginForm-addBtn">
          Submit
        </button>
      </div>

    </form>
  );
}

export default LoginForm;
