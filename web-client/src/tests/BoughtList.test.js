import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import BoughtList from "../Components/BoughtList";

afterEach(cleanup);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/",
  }),
}));
test("Renders without crashing", () => {
  const container = document.createElement("div");
  ReactDOM.render(<BoughtList />, container);
});
