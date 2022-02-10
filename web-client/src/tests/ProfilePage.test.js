import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
  getByText,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import ProfilePage from "../Components/ProfilePage";

afterEach(cleanup);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/profile",
  }),
}));
test("Renders without crashing", () => {
  const container = document.createElement("div");
  ReactDOM.render(<ProfilePage />, container);
});

test("Renders profile page correctly", async () => {
  const { getByTestId, getByText } = render(<ProfilePage></ProfilePage>);
  await waitFor(() => {
    expect(getByText("Name:")).toBeInTheDocument();
  });
});
