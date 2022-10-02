import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { UserProvider } from "../utils/testUtils";


it("matches snapshot", function () {
  let job = { title: "CEO", salary: 1000000, equity: 10 };
  const { asFragment } = render(
      <UserProvider>
        <JobCard job={job} />
      </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
