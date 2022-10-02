import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { MemoryRouter } from "react-router";

const company1 = {
  handle: "rithm",
  name: "Rithm School",
  description: "Become an exceptional developer in 16 weeks.",
  logo_url: "https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
};

const company2 = {
  handle: "algo",
  name: "Algo School",
  description: "Become a mediocre developer in 160 weeks."
};

it("matches snapshot with logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard company={company1} />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard company={company2}/>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
