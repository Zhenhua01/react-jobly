import axios from "axios";

// Use port 3001 when connecting to local backend server
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// Use heroku deployed backend when local server not available
const BASE_URL =
    process.env.REACT_APP_BASE_URL || "https://jobly-zhl-exp.herokuapp.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 */

 class JoblyApi {

  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies or companies matching search term. */

  static async getCompanies(data = {}) {
    let res = await this.request(`companies`, data);
    return res.companies;
  }

  /** Get all jobs or jobs matching search term. */

  static async getJobs(data = {}) {
    let res = await this.request(`jobs`, data);
    return res.jobs;
  }

  /** Registers a new user. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Logins user. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Update user information. */

  static async update(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /**Get user information. */

  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**Add job to user applications. */

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
    let res = await this.request(`users/${username}`);
    return res.user;
  }
}


export default JoblyApi;