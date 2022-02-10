import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import trashIcon from "../images/trash.svg";
import shoppingIcon from "../images/shoppingBag.svg";

function ShoppingList() {
  const appContext = useContext(AppContext);
  const setShopList = appContext.setShopList;
  const shopList = appContext.shopList;

  const handleDelete = async (e) => {
    const res = await axios.delete(
      `https://fitto-api-server.herokuapp.com/items`,
      {
        data: { id: e.target.id },
      }
    );
    setShopList(res.data);
  };

  const handleBought = async (e) => {
    const res = await axios.put(
      `https://fitto-api-server.herokuapp.com/items`,
      {
        id: e.target.id,
      }
    );

    setShopList(res.data);
  };

  return (
    <div className="list" data-testid="shopList">
      {shopList &&
        shopList.map((listItem) => {
          return (
            listItem.status === 0 && (
              <div key={listItem.id} className="listItem">
                <div className="listItemQuantity">{listItem.quantity}X</div>
                <div className="listItemContent ">{listItem.content}</div>
                <div className="shopIcon">
                  <img
                    src={shoppingIcon}
                    id={listItem.id}
                    onClick={handleBought}
                  />
                </div>
                <div className="shopIcon">
                  <img
                    src={trashIcon}
                    id={listItem.id}
                    onClick={handleDelete}
                  />
                </div>
              </div>
            )
          );
        })}
      {shopList.length === 0 && (
        <div>
          <h4>List is empty!</h4>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
