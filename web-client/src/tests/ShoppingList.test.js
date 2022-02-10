import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import ShoppingList from "../Components/ShoppingList";
import AddItem from "../Components/AddItem";

afterEach(cleanup);
test("Renders without crashing", () => {
  const container = document.createElement("div");
  ReactDOM.render(<ShoppingList />, container);
});

test("Renders shopping list correctly", () => {
  const { getByTestId } = render(<ShoppingList></ShoppingList>);
  const listEl = getByTestId("shopList");
  expect(listEl.textContent).toBe("List is empty!");
});

test("Renders shopping list correctly", () => {
  const { getByTestId } = render(<ShoppingList></ShoppingList>);

  render(<AddItem></AddItem>);
  const addButton = getByTestId("addItemButton");
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
  fireEvent.click(addButton);
  const listEl = getByTestId("shopList");
  expect(listEl.textContent).toBe("List is empty!");
});
