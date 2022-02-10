import React, { useContext, useEffect, useState } from "react";
import ShoppingList from "./ShoppingList";
import AddItem from "./AddItem";
import BoughtList from "./BoughtList";

function MainPage() {
  return (
    <div className="mainPage">
      <div>
        <h1 className="mainTitle">Shopping List</h1>
        <ShoppingList />
        <AddItem />
      </div>
      <div>
        <h1 className="mainTitle">Bought Items</h1>
        <BoughtList />
      </div>
    </div>
  );
}

export default MainPage;
