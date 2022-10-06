import { useState } from "react";
import { useNavigate } from "react-router-dom";


const INITIAL_FORM_DATA = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: ''
};

/** SignupForm for signing up new user.
 *
 * Props:
 * - signup: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> {LoginForm, SignupForm}
 */

function SignupForm({ signup }) {
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
      await signup(formData);
      navigate("/companies");
    }
    catch (err) {
      setformError([...err]);
    }
  }

  return (
    <form className="SignupForm mt-4" onSubmit={handleSubmit}>
      <div className="container-fluid col-6 offset-3 form-group">

        <div className="mb-2">
          <label className="form-label" htmlFor="username">Username</label>
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
          <label className="form-label" htmlFor="password">Password</label>
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

        <div className="mb-2">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            className="form-control"
            onChange={handleChange}
            value={formData.firstName}
            aria-label="firstName"
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            className="form-control"
            onChange={handleChange}
            value={formData.lastName}
            aria-label="lastName"
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            aria-label="email"
            minLength="6"
            required
          />
        </div>

        {formError.length !== 0 &&
          <div className='alert alert-danger'>
            {formError.map((error, idx) => <p key={idx}>{error}</p>)}
          </div>
        }

        <div className="mt-4">
          <button type="submit" className="btn btn-lg btn-info fw-bold">
            Signup
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;