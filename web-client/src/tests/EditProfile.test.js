import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import EditProfile from "../Components/EditProfile";

afterEach(cleanup);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/profile",
  }),
}));
test("Renders without crashing", () => {
  const container = document.createElement("div");
  ReactDOM.render(<EditProfile />, container);
});

test("Renders EditProfile button correctly", () => {
  const { getByTestId } = render(<EditProfile></EditProfile>);
  const buttonEl = getByTestId("updateButton");

  expect(buttonEl.textContent).toBe("Update Profile");
});

test("Render inputs correctly", () => {
  const { getByTestId } = render(<EditProfile></EditProfile>);
  const fNameInput = getByTestId("fNameInput");
  const lNameInput = getByTestId("lNameInput");
  const emailInput = getByTestId("emailInput");
  const addressInput = getByTestId("addressInput");
  const birthdateInput = getByTestId("birthdateInput");

  expect(fNameInput.placeholder).toBe("First Name");
  expect(lNameInput.placeholder).toBe("Last Name");
  expect(emailInput.placeholder).toBe("Email");
  expect(addressInput.placeholder).toBe("Address");
  expect(birthdateInput.placeholder).toBe("Date Of Birth");
});

test("Changing value of input works correctly", () => {
  const { getByTestId } = render(<EditProfile></EditProfile>);
  const fNameInput = getByTestId("fNameInput");

  expect(fNameInput.value).toBe("");

  fireEvent.change(fNameInput, {
    target: {
      value: "John",
    },
  });
  expect(fNameInput.value).toBe("John");
});
