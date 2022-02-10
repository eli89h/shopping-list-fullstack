import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import AddItem from "../Components/AddItem";

afterEach(cleanup);
test("Renders without crashing", () => {
  const container = document.createElement("div");
  ReactDOM.render(<AddItem />, container);
});

test("Renders AddItem button correctly", () => {
  const { getByTestId } = render(<AddItem></AddItem>);
  const buttonEl = getByTestId("addItemButton");

  expect(buttonEl.textContent).toBe("Add item");
});

test("Render inputs correctly", () => {
  const { getByTestId } = render(<AddItem></AddItem>);
  const amountInput = getByTestId("amountInput");
  const itemInput = getByTestId("itemInput");

  expect(amountInput.placeholder).toBe("Amount");
  expect(itemInput.placeholder).toBe("Item");
});

test("Changing value of amount input works correctly", () => {
  const { getByTestId } = render(<AddItem></AddItem>);
  const amountInput = getByTestId("amountInput");

  expect(amountInput.value).toBe("");

  fireEvent.change(amountInput, {
    target: {
      value: "5",
    },
  });
  expect(amountInput.value).toBe("5");
});

test("Changing value of item input works correctly", () => {
  const { getByTestId } = render(<AddItem></AddItem>);
  const itemInput = getByTestId("itemInput");

  expect(itemInput.value).toBe("");

  fireEvent.change(itemInput, {
    target: {
      value: "Water Bottle",
    },
  });
  expect(itemInput.value).toBe("Water Bottle");
});

test("Button is disabled correctly at the start", () => {
  const { getByTestId } = render(<AddItem></AddItem>);
  const buttonEl = getByTestId("addItemButton");
  expect(buttonEl.disabled).toBe(true);
});

test("Button is enabled correctly when inputs are not empty", () => {
  const { getByTestId } = render(<AddItem></AddItem>);
  const buttonEl = getByTestId("addItemButton");
  expect(buttonEl.disabled).toBe(true);
  const amountInput = getByTestId("amountInput");
  const itemInput = getByTestId("itemInput");
  fireEvent.change(amountInput, {
    target: {
      value: "5",
    },
  });
  fireEvent.change(itemInput, {
    target: {
      value: "Water Bottle",
    },
  });
  expect(buttonEl.disabled).toBe(false);
});
