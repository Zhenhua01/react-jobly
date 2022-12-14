import { useState, useContext } from "react";
import userContext from '../context/userContext';
import { useNavigate } from "react-router-dom";


/** ProfileForm for displaying and updating user profile.
 *
 * Props:
 * - update: function to call in parent.
 *
 * State:
 * - formData
 *
 * Context: user
 *  { username, firstName, lastName, email, isAdmin, applications:[] }
 *
 * RoutesList -> ProfileForm
 */

function ProfileForm({ update }) {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [formError, setFormError] = useState([]);

  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });

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
      await update(formData);
      navigate("/companies");
    }
    catch (err) {
      setFormError([...err]);
    }
  }

  return (
    <form className="ProfileForm mt-4" onSubmit={handleSubmit}>
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
            disabled
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
            Update
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;