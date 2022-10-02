import React from "react";
import userContext from "../context/userContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  photo_url: null,
  applications: [],
};

const UserProvider = ({
  children,
  user = demoUser,
  hasAppliedToJob = () => false,
}) => (
  <userContext.Provider value={{ user, hasAppliedToJob }}>
    {children}
  </userContext.Provider>
);

export { UserProvider };
