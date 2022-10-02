import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RoutesList from "./RoutesList";
import { UserProvider } from "../utils/testUtils";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <RoutesList />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <RoutesList />
        </UserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
