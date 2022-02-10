import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import trashIcon from "../images/trash.svg";

function BoughtList() {
  const appContext = useContext(AppContext);
  const setShopList = appContext.setShopList;
  const shopList = appContext.shopList;
  const location = useLocation();

  const handleDelete = async (e) => {
    const res = await axios.delete(
      `https://fitto-api-server.herokuapp.com/items`,
      {
        data: { id: e.target.id },
      }
    );

    setShopList(res.data);
  };

  return (
    <div className="list">
      {shopList &&
        shopList.map((listItem) => {
          return (
            listItem.status === 1 && (
              <div key={listItem.id} className="listItem">
                <div className="listItemQuantity">{listItem.quantity}X</div>
                <div className="listItemContent">{listItem.content}</div>
                {location.pathname === "/" && (
                  <div className="shopIcon">
                    <img
                      src={trashIcon}
                      id={listItem.id}
                      onClick={handleDelete}
                      style={{ width: "20px" }}
                    />
                  </div>
                )}
              </div>
            )
          );
        })}
    </div>
  );
}

export default BoughtList;
