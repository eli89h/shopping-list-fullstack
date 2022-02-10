import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../context/AppContext";
import axios from "axios";

function AddItem() {
  const appContext = useContext(AppContext);
  const setShopList = appContext.setShopList;
  const shopList = appContext.shopList;

  const [isFormIncomplete, setIsFormIncomplete] = useState(true);
  const [content, setContent] = useState();
  const [quantity, setQuantity] = useState();
  const [formData, setFormData] = useState({
    id: "",
    quantity: "",
    content: "",
    status: "",
  });

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleNewList = async () => {
    const res = await axios.post(
      `https://fitto-api-server.herokuapp.com/items`,
      formData
    );
    setShopList(res.data);
  };

  useEffect(() => {
    if (content && quantity) {
      setIsFormIncomplete(false);
      setFormData({
        id: uuidv4(),
        quantity: quantity,
        content: content,
        status: 0,
      });
    } else {
      setIsFormIncomplete(true);
    }
  }, [content, quantity]);

  const handleSubmit = () => {
    if (formData.content && formData.quantity) {
      handleNewList();
      setContent("");
      setQuantity("");
    }
  };

  return (
    <div className="addItemForm">
      <input
        data-testid="amountInput"
        type="number"
        className="quantityInput"
        onChange={handleChangeQuantity}
        value={quantity}
        placeholder="Amount"
      />
      <input
        data-testid="itemInput"
        type="text"
        className="contentInput"
        onChange={handleChangeContent}
        value={content}
        maxLength="19"
        placeholder="Item"
      />
      <div className="addItemButton">
        <button
          data-testid="addItemButton"
          disabled={isFormIncomplete}
          className="btn btn-primary"
          id="submitButton"
          onClick={handleSubmit}
        >
          Add item
        </button>
      </div>
    </div>
  );
}

export default AddItem;
