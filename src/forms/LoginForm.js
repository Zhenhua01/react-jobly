import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formError, setformError] = useState([]);

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
      navigate('/companies');
    }
    catch (err) {
      console.log(err);
      setformError([err]);
    }
  }

  return (
    <form className="LoginForm mt-4" onSubmit={handleSubmit}>
      <div className="container-fluid col-6 offset-3 form-group">

      <div className="mb-2">
        <label className="form-label" htmlFor="username">
          Username
          </label>
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

      <div className="mb-2">
        <label className="form-label" htmlFor="password">
          Password
          </label>
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

      {formError.length !== 0 &&
        <div className='alert alert-danger'>
          <p>{formError[0]}</p>
        </div>
      }
      <div className="mt-4">
        <button type="submit" className="btn btn-lg btn-info fw-bold">
          Login
        </button>
      </div>
    </div>
    </form>
  );
}

export default LoginForm;
