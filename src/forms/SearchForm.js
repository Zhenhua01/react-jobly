import { useState } from "react";

/** Form for searching companies.
 *
 * Props:
 * - search: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> {CompanyList, JobList} -> {SearchForm}
 */

function SearchForm({ search }) {
  const [formData, setFormData] = useState({ name: "" });

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData);
    setFormData({ name: "" });
  }

  return (
    <form className="SearchForm mt-2 mb-4" onSubmit={handleSubmit}>
      <div className="container-fluid col-6 offset-3">

        <div className="input-group">
          <input
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter a search term ..."
            onChange={handleChange}
            value={formData.name}
            aria-label="name"
          />
          <button type="submit" className="btn btn-md btn-primary">
            Search
          </button>
        </div>

      </div>
    </form>
  );
}

export default SearchForm;
